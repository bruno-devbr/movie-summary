import "./globals.css";

export default function RootLayout({ children }) {
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
            <body>{children}</body>
        </html>
    );
}
