import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function TitleSection({ text, link }: { text: string; link: string }) {
    return (
        <div className="container mx-auto px-4 mb-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl">{text}</h2>

                <Link
                    className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
                    onClick={() => window.scroll(0, 0)}
                    href={link}
                >
                    Ver Todos <ChevronRight />
                </Link>
            </div>
        </div>
    );
}
