import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <head>
                <title>Movie Summary</title>
            </head>
            <body>
                <div className="min-h-screen bg-gray-950 text-white">
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
