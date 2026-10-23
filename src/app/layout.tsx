import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Movie Summary",
    description: "Explore filmes, séries e personalidades.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}
