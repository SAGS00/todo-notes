import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    "inline-flex items-center justify-center font-medium transition-all duration-200",
                    "rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        // Variants
                        "bg-black text-white hover:bg-gray-800 focus:ring-gray-900":
                            variant === "primary",
                        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400":
                            variant === "secondary",
                        "border-2 border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-400":
                            variant === "outline",
                        "bg-transparent hover:bg-gray-100 focus:ring-gray-400":
                            variant === "ghost",
                        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500":
                            variant === "danger",

                        // Sizes
                        "text-sm px-3 py-1.5": size === "sm",
                        "text-base px-4 py-2.5": size === "md",
                        "text-lg px-6 py-3": size === "lg",
                    },
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
