import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components/(header)/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full min-h-screen">
            <body className="text-white bg-gray-950 min-h-screen h-full">
                <Header />
                <main className="w-full h-full py-3">{children}</main>
                <ToastContainer />
            </body>
        </html>
    );
}
