import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Next.js Features App",
    description: "An app demonstrating basic Next.js features",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${notoSans.variable} antialiased`}>
                <header className="bg-blue-500 text-white p-4">
                    <nav>
                        <p className="m-0">Next.js Features App</p>
                    </nav>
                </header>
                {children}
            </body>
        </html>
    );
}
