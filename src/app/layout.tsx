import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/(header)/header";

export const metadata: Metadata = {
    title: "Movie Summary",
    description: "Explore filmes, séries e personalidades.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="pt-BR" className="h-dvh">
            <body className="h-dvh w-full bg-gray-950">
                <Header />
                <main className="w-full">{children}</main>
            </body>
        </html>
    );
}
