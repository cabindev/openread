import { ReactNode } from "react";
import { cn } from "~/libs";

interface WrapperProps {
    children: ReactNode;
    className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
    return (
       
            <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8", className)}>
                {children}
            </div>
      
    );
}
