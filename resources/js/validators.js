const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/;

// Mengembalikan object error, contoh: { email: 'Format email tidak valid.' }
// Object kosong berarti semua field sudah valid.
export function validateRegister(values) {
    const errors = {};

    const name = values.name.trim();
    const email = values.email.trim();
    const username = values.username.trim();

    if (!name) {
        errors.name = 'Nama lengkap wajib diisi.';
    } else if (name.length < 3) {
        errors.name = 'Nama lengkap minimal 3 karakter.';
    }

    if (!email) {
        errors.email = 'Email wajib diisi.';
    } else if (!EMAIL_PATTERN.test(email)) {
        errors.email = 'Format email tidak valid.';
    }

    if (!username) {
        errors.username = 'Username wajib diisi.';
    } else if (username.length < 4 || username.length > 20) {
        errors.username = 'Username harus 4-20 karakter.';
    } else if (!USERNAME_PATTERN.test(username)) {
        errors.username = 'Username hanya boleh huruf, angka, dan underscore.';
    }

    if (!values.password) {
        errors.password = 'Password wajib diisi.';
    } else if (values.password.length < 8) {
        errors.password = 'Password minimal 8 karakter.';
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = 'Konfirmasi password wajib diisi.';
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Konfirmasi password tidak sama.';
    }

    return errors;
}
