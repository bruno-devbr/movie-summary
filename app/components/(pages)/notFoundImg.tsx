import { EyeOff } from "lucide-react";

export function NotFoundImg() {
    return (
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-105 flex flex-col justify-center items-center gap-2">
            <EyeOff className="w-10 h-10" />
            <span className="text-lg">Imagem Indisponivel</span>
        </div>
    );
}
