"use client";

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-purple-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`h-10 w-full rounded-md border px-3 py-2 text-base focus:ring-1 outline-none text-purple-900 placeholder-purple-400 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
            : "border-purple-200 focus:border-purple-500 focus:ring-purple-100"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
