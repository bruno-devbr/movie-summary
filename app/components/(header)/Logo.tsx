import { Film } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Film className="text-blue-500 w-8 h-8" />
            <span className="text-xl">Movie Summary</span>
        </Link>
    );
}
