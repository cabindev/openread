import { LabelHTMLAttributes } from "react";
import { cn } from "~/libs";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ children, className, ...rest }: LabelProps) {
    return (
        <label className={cn("text-sm text-gray-700", className)} {...rest}>
            {children}
        </label>
    );
}
