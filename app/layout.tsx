import type { Metadata } from "next";
import Header from "@/components/general/Header/Header";
import { Toaster } from "sonner";
import localFont from "next/font/local";

import "./globals.css";
import { WebVitals } from "@/components/general/WebVitals";

export const metadata: Metadata = {
    title: {
        template: "%s | Next.js Features App",
        default: "Next.js Features App",
    },
    description: "An app demonstrating basic Next.js features",
};

const myFont = localFont({
    src: [
        {
            path: "../public/fonts/NotoSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/NotoSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/NotoSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    fallback: ["system-ui", "arial"],
});

async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${myFont} mx-10 antialiased bg-neutral-100`}>
                <WebVitals />
                <Header />
                {children}
                <Toaster closeButton={true} />
            </body>
        </html>
    );
}

export default RootLayout;
