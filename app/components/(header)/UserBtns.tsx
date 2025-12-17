"use client";

import { startTmdbAuth } from "@/app/utils/api/startTmdbAuth";
import { userDropDow } from "@/app/utils/dropDowns";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { SubLink } from "@/app/utils/types/dropDownTypes";
import { AlertTriangle, Loader2, LogOut, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function ConectBtn() {
    const { setToast } = useGlobalStore();
    const [loading, setLoading] = useState(false);

    return (
        <button
            disabled={loading}
            onClick={() => startTmdbAuth({ setLoading, setToast })}
            className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                bg-blue-600
                ${
                    loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-blue-700 cursor-pointer"
                }
            `}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Conectando
                </>
            ) : (
                "Conectar com TMDB"
            )}
        </button>
    );
}

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

function DropDown({
    prop,
    setShowDropDown,
}: {
    prop: SubLink[];
    setShowDropDown: (value: boolean) => void;
}) {
    return (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            {prop.map((data) => {
                const Icon = data.icon;

                return (
                    <Link
                        key={data.link}
                        href={data.link}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors"
                    >
                        <Icon className="w-4 h-4" />
                        {data.title}
                    </Link>
                );
            })}
            <button
                onClick={() => setShowDropDown(false)}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 transition-colors text-red-400 cursor-pointer"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
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
