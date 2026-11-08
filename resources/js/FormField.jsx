export default function FormField({ id, label, type = 'text', error, ...inputProps }) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>

            <div className="input-group has-validation">
                <input
                    id={id}
                    name={id}
                    type={type}
                    className={`form-control${error ? ' is-invalid' : ''}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...inputProps}
                />

                {error && (
                    <div id={`${id}-error`} className="invalid-feedback">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
