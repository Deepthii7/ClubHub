import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
            ${error ? "border-red-400" : "border-slate-300"} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
