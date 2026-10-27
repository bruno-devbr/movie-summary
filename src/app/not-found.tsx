import { CloudOff } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center">
            <CloudOff className="size-8" />
            <p className="text-xl">Esta página não foi encontrada</p>
        </div>
    );
}
