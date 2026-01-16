import { Film } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/">
            <h1 className="flex items-center gap-2 text-2xl">
                <Film className="text-blue-500 size-8" />
                Movie Summary
            </h1>
        </Link>
    );
}
