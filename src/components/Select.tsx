import { cn } from "~/libs";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function select({ className, children, ...rest }: SelectProps) {
    return (
        <select
            className={cn(
                "w-full appearance-none rounded-md border px-4 py-2 outline-none",
                className,
            )}
            {...rest}
        >
            {children}
        </select>
    );
}
