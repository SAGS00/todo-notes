import { TextareaHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, fullWidth = false, className, ...props }, ref) => {
        return (
            <div
                className={clsx("flex flex-col gap-1.5", fullWidth && "w-full")}
            >
                {label && (
                    <label
                        htmlFor={props.id}
                        className="text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={clsx(
                        "px-4 py-2.5 rounded-xl border-2 border-gray-200",
                        "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
                        "transition-all duration-200",
                        "placeholder:text-gray-400",
                        "disabled:bg-gray-50 disabled:cursor-not-allowed",
                        "resize-none",
                        error && "border-red-500 focus:ring-red-500",
                        fullWidth && "w-full",
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;
