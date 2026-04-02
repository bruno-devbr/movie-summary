export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br" className="">
            <head>
                <title>Movie Summary</title>
                <link
                    rel="shortcut icon"
                    href="/film.svg"
                    type="image/svg+xml"
                />
            </head>
            <body className="">{children}</body>
        </html>
    );
}
