import { Header } from "../components/(header)/Header";
import "../globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full min-h-screen">
            <body className="text-white bg-gray-950 min-h-screen h-full">
                <Header />
                <main className="w-full h-full">{children}</main>
            </body>
        </html>
    );
}
