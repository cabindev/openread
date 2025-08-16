import { ReactNode } from "react";

interface HeadingProps {
    children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
    return (
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-secondary-800">
            {children}
        </h2>
    );
}
