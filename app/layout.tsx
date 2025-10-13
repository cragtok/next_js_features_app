import type { Metadata } from "next";
import Header from "@/components/general/Header/Header";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { appEnv } from "@/lib/env/appEnv";
import { WebVitals } from "@/components/general/WebVitals";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(appEnv.DOMAIN_URL),
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
            <body className={`${myFont} mx-8 antialiased bg-neutral-100`}>
                <WebVitals />
                <Header />
                {children}
                <Toaster closeButton={true} />
                <SpeedInsights />
            </body>
        </html>
    );
}

export default RootLayout;
