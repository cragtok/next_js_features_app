import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-20" data-test="loading-spinner">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
    );
};

export default LoadingSpinner;
