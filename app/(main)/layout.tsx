import { Header } from "../components/(header)/Header";
import "../globals.css";
import { ToastProvider } from "../utils/ToastProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <main>
                <Header />
                {children}
                <ToastProvider />
            </main>
        </div>
    );
}
