import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Link_Title({ link, title }: { link: string; title: string }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">{title}</h2>
            <Link
                href={link}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors"
            >
                Ver todos <ChevronRight className="w-5 h-5" />
            </Link>
        </div>
    );
}
