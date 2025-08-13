import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
            <body className={`${notoSans.variable} mx-10 antialiased bg-neutral-100`}>
                <div className="flex flex-col pt-10 gap-8 items-center text-center">
                    <div>
                        <Image
                            src="/vercel.svg"
                            className="bg-brand-700 rounded-[8] border-3 border-brand-700"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                    </div>
                    <h1 className="text-brand-700 font-extrabold text-4xl">
                        Next.js Features App
                    </h1>
                    <p className="text-brand-500 max-w-md">
                        This project demonstrates various features of Next.js.
                        All features are fully working. Just click on a link to
                        see a feature in action.
                    </p>
                </div>
                {children}
            </body>
        </html>
    );
}
