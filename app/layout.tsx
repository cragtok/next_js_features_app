import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Header from "@/components/general/Header/Header";
import { Toaster } from "sonner";

import "./globals.css";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
    fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
    title: "Next.js Features App",
    description: "An app demonstrating basic Next.js features",
};

async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${notoSans.variable} mx-10 antialiased bg-neutral-100`}
            >
                <Header />
                {children}
                <Toaster closeButton={true} />
            </body>
        </html>
    );
}

export default RootLayout;
