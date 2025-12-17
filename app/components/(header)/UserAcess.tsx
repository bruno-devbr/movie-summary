import { userDropDow } from "@/app/utils/dropDowns";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DropDown } from "./DropDowns";

export function UserBtn() {
    const [showDropDown, setShowDropDown] = useState(false);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                btnRef.current &&
                !btnRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={btnRef} className="relative">
            <button
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setShowDropDown(true)}
            >
                <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                    alt="usuario_demo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                    unoptimized
                />
                <span className="hidden lg:inline">bruno-devbr</span>
            </button>
            {showDropDown && (
                <DropDown
                    prop={userDropDow}
                    setShowDropDown={setShowDropDown}
                />
            )}
        </div>
    );
}

export function UserError() {
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400">
            <AlertTriangle className="w-4 h-4" />

            <span className="hidden lg:inline text-sm">
                Erro ao carregar usuário
            </span>

            <button
                className="ml-2 hover:text-red-300 transition-colors"
                title="Tentar novamente"
            >
                <RotateCcw className="w-4 h-4 cursor-pointer" />
            </button>
        </div>
    );
}
