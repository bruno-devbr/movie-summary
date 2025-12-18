import { Header } from "../components/(header)/Header";
import "../globals.css";
import { ToastProvider } from "../utils/ToastProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Movie Summary</title>
            </head>
            <body className="min-h-screen bg-gray-950 text-white">
                <main>
                    <Header />
                    {children}
                    <ToastProvider />
                </main>
            </body>
        </html>
    );
}
