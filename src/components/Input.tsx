import { cn } from "~/libs";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...rest }: InputProps) {
    return (
        <input
            className={cn(
                "w-full rounded-lg border border-secondary-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
                className,
            )}
            {...rest}
        />
    );
}
