import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function TextField({
  id,
  label,
  error,
  required,
  className,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={className} htmlFor={id}>
      <span>{label}{required ? ' *' : ''}</span>
      <input id={id} required={required} {...props} />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  required,
  className,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={className} htmlFor={id}>
      <span>{label}{required ? ' *' : ''}</span>
      <textarea id={id} required={required} {...props} />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export function SelectField({
  id,
  label,
  error,
  required,
  className,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <label className={className} htmlFor={id}>
      <span>{label}{required ? ' *' : ''}</span>
      <select id={id} required={required} {...props}>{children}</select>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
