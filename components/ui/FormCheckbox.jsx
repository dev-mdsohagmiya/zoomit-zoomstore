"use client";

export default function FormCheckbox({
  id,
  label,
  register,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-start space-x-2">
        <input
          id={id}
          type="checkbox"
          {...register}
          className={`h-4 w-4 rounded border focus:ring-1 mt-0.5 ${
            error
              ? "border-red-300 text-red-600 focus:ring-red-500"
              : "border-purple-300 text-purple-600 focus:ring-purple-500"
          } ${className}`}
          {...props}
        />
        <label htmlFor={id} className="text-sm text-purple-700 leading-relaxed">
          {label}
        </label>
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
