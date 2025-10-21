import { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    padding?: "sm" | "md" | "lg";
}

export default function Card({
    children,
    className,
    hover = false,
    padding = "md",
    ...props
}: CardProps) {
    return (
        <div
            className={clsx(
                "bg-white rounded-2xl border border-gray-200",
                "transition-all duration-200",
                {
                    "hover:shadow-lg hover:border-gray-300 cursor-pointer":
                        hover,
                    "p-4": padding === "sm",
                    "p-6": padding === "md",
                    "p-8": padding === "lg",
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
