<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    // Create transaction
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors(),
            ], 422);
        }

        return DB::transaction(function () use ($request) {
            $book = Book::where('id', $request->book_id)
                ->lockForUpdate()
                ->first();

            if ($book->stock < $request->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stok barang tidak cukup',
                ], 400);
            }

            $totalAmount = $book->price * $request->quantity;

            $book->stock -= $request->quantity;
            $book->save();

            $transaction = Transaction::create([
                'order_number' => 'ORD' . Str::upper(Str::random(8)),
                'customer_id' => $request->user()->id,
                'book_id' => $book->id,
                'quantity' => $request->quantity,
                'total_amount' => $totalAmount,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Transaction created successfully',
                'data' => $transaction,
            ]);
        });
    }

    // Read all transactions
    public function index()
    {
        $transactions = Transaction::with(['user', 'book'])->get();

        return response()->json([
            'success' => true,
            'message' => 'List of transactions',
            'data' => $transactions,
        ]);
    }

    // Show transaction detail
    public function show(Request $request, $id)
    {
        $transaction = Transaction::with(['user', 'book'])
            ->where('id', $id)
            ->where('customer_id', $request->user()->id)
            ->first();

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaction not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Transaction detail',
            'data' => $transaction,
        ]);
    }

    // Update transaction
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors(),
            ], 422);
        }

        return DB::transaction(function () use ($request, $id) {
            $transaction = Transaction::where('id', $id)
                ->where('customer_id', $request->user()->id)
                ->lockForUpdate()
                ->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found',
                ], 404);
            }

            $oldBook = Book::where('id', $transaction->book_id)
                ->lockForUpdate()
                ->first();

            $newBook = Book::where('id', $request->book_id)
                ->lockForUpdate()
                ->first();

            $oldQuantity = $transaction->quantity;

            if ($oldBook->id == $newBook->id) {
                $availableStock = $newBook->stock + $oldQuantity;

                if ($availableStock < $request->quantity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Stok barang tidak cukup',
                    ], 400);
                }

                $newBook->stock = $availableStock - $request->quantity;
                $newBook->save();
            } else {
                if ($newBook->stock < $request->quantity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Stok barang tidak cukup',
                    ], 400);
                }

                $oldBook->stock += $oldQuantity;
                $oldBook->save();

                $newBook->stock -= $request->quantity;
                $newBook->save();
            }

            $transaction->update([
                'book_id' => $newBook->id,
                'quantity' => $request->quantity,
                'total_amount' => $newBook->price * $request->quantity,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Transaction updated successfully',
                'data' => $transaction->load(['user', 'book']),
            ]);
        });
    }

    // Delete transaction
    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            $transaction = Transaction::lockForUpdate()->find($id);

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found',
                ], 404);
            }

            $book = Book::where('id', $transaction->book_id)
                ->lockForUpdate()
                ->first();

            if ($book) {
                $book->stock += $transaction->quantity;
                $book->save();
            }

            $transaction->delete();

            return response()->json([
                'success' => true,
                'message' => 'Transaction deleted successfully',
            ]);
        });
    }
}
