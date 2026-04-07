import { forwardRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightLabel?: ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = "text", error, rightLabel, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    // Switch type if showing password
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-bold text-[#6D716A] uppercase tracking-[0.1em]">{label}</label>
          {rightLabel && (
            <div className="text-[10px] font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer">
              {rightLabel}
            </div>
          )}
        </div>

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-[#FCFAF6] border ${error ? 'border-red-500' : 'border-[#E8E2D4]'} focus:border-primary text-[#1C2321] rounded-sm px-4 py-3 placeholder:text-gray-400 outline-none transition-all ${isPassword ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
