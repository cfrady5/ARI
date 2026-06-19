import type { ReactNode } from "react";

type BaseProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
};

type InputFieldProps = BaseProps & {
  type?: "text" | "email" | "tel";
  name: string;
  placeholder?: string;
  autoComplete?: string;
};

/** Labeled text input. Labels are real <label> elements, never placeholders. */
export function FormField({
  id,
  label,
  required,
  hint,
  type = "text",
  name,
  placeholder,
  autoComplete,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-ari-green"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="field-input"
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ari-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextAreaFieldProps = BaseProps & {
  name: string;
  rows?: number;
  placeholder?: string;
};

export function TextAreaField({
  id,
  label,
  required,
  name,
  rows = 5,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-ari-green"> *</span> : null}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="field-input resize-y"
      />
    </div>
  );
}

type SelectFieldProps = BaseProps & {
  name: string;
  options: string[];
  children?: ReactNode;
};

export function SelectField({
  id,
  label,
  required,
  name,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-ari-green"> *</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="field-input"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormField;
