import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Image from "next/image";
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
            <body
                className={`${notoSans.variable} mx-10 antialiased bg-neutral-100`}
            >
                <div className="mx-auto my-0 flex justify-center mt-15">
                    <Image
                        src="/vercel.svg"
                        className="bg-brand-700 rounded-[8] border-3 border-brand-700"
                        alt="logo"
                        width={80}
                        height={80}
                    />
                </div>
                {children}
            </body>
        </html>
    );
}
