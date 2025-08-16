"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

interface State {
    success?: boolean;
    message?: string;
}

export default function useToastNotification(state: State | null) {
    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);
}