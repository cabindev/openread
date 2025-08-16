"use client";

import Button from "./Button";
import { ReactNode } from "react";
import { cn } from "~/libs";

interface SubmitProps {
    children: ReactNode;
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
}

export default function Submit({ 
    children, 
    className, 
    isLoading = false,
    loadingText = "กำลังดำเนินการ..." 
}: SubmitProps) {
    return (
        <Button
            type="submit"
            disabled={isLoading}
            className={cn("w-full disabled:cursor-progress", className)}
        >
            {isLoading ? loadingText : children}
        </Button>
    );
}