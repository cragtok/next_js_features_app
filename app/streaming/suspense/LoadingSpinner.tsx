import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
    );
}
