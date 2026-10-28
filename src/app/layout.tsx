import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/(header)/header";
import { UserProvider } from "@/providers/UserProvider";

export const metadata: Metadata = {
    title: "Movie Summary",
    description: "Explore filmes, séries e personalidades.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="pt-BR" className="h-dvh">
            <UserProvider>
                <body className="h-dvh w-full bg-gray-950 text-white">
                    <Header />
                    <main className="w-full">{children}</main>
                </body>
            </UserProvider>
        </html>
    );
}
