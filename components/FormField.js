import "./form.css";

// Label + control + hint + error. `as` picks the element (input, textarea,
// select); `error` shows the existing validation message under the control.
// eslint-disable-next-line no-unused-vars
export default function FormField({ id, label, required, as: Component = "input", error, hint, children, ...rest }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </label>
      <Component
        id={id}
        name={id}
        className="field-control"
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        {children}
      </Component>
      {hint && <p className="field-hint">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
