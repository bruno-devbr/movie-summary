import { Film } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="inline-flex gap-2 items-center">
            <Film className="size-8 text-blue-500" />
            <h1 className="text-xl text-white">Movie Summary</h1>
        </Link>
    );
}
