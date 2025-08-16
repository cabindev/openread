import { useEffect } from "react";
import toast from "react-hot-toast";

interface State {
    success?: boolean;
    message?: string;
}

const useToastNotification = (state: State) => {
    useEffect(() => {
        if (!state?.success && state?.message) {
            toast.error(state.message);
        }
    }, [state]);
};

export default useToastNotification;
