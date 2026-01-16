import { Header } from "./components/(header)/Header";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="text-white bg-gray-950 min-h-screen min-w-screen">
                <Header />
                {children}
            </body>
        </html>
    );
}
