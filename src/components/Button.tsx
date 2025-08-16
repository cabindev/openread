import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "~/libs";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: "normal" | "outline";
    children: ReactNode;
}

export default function Button({
    children,
    className,
    variants = "normal",
    ...rest
}: ButtonProps) {
    const variantsObj = {
        normal: "bg-primary-500 hover:bg-primary-600 text-white",
        outline: "border border-primary-500 bg-transparent text-primary-600 hover:bg-primary-50",
    };

    return (
        <button
            className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                variantsObj[variants],
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
