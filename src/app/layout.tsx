
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
    >
      <head>
        <title>Movie Summary</title>
        <link rel="shortcut icon" href="/film.svg" type="image/x-icon" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
