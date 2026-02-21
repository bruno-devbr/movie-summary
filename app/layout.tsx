import { Header } from "./components/(header)/Header";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <head>
                <title>Movie Summary</title>
                <link
                    rel="shortcut icon"
                    href="favicon.svg"
                    type="image/x-icon"
                />
            </head>
            <body className="min-h-screen bg-gray-950 text-white">
                <Header />
                <main className="py-3">{children}</main>
            </body>
        </html>
    );
}
