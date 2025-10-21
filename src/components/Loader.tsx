import { clsx } from "clsx";

interface LoaderProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function Loader({ size = "md", className }: LoaderProps) {
    return (
        <div className={clsx("flex items-center justify-center", className)}>
            <div
                className={clsx(
                    "animate-spin rounded-full border-b-2 border-black",
                    {
                        "h-4 w-4": size === "sm",
                        "h-8 w-8": size === "md",
                        "h-12 w-12": size === "lg",
                    }
                )}
            ></div>
        </div>
    );
}
