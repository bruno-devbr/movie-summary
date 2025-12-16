import { Header } from "./components/(header)/Header";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-950 text-white">
                <Header />
                {children}
            </body>
        </html>
    );
}
