import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            Carregando...
        </div>
    );
}
