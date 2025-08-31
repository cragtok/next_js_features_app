"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import PageWrapper from "@/components/general/PageWrapper";
import SiteLinks from "./SiteLinks/SiteLinks";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import LinkWrapper from "@/components/general/LinkWrapper";

const SCROLL_POSITION_KEY = "home-page-scroll-position";

const debounce = (func: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), delay);
    };
};

function Page() {
    const isRestoringScroll = useRef(false);

    // Save scroll position on scroll event (debounced)
    useEffect(() => {
        const handleScroll = debounce(() => {
            if (typeof window !== "undefined" && !isRestoringScroll.current) {
                sessionStorage.setItem(
                    SCROLL_POSITION_KEY,
                    window.scrollY.toString()
                );
            }
        }, 100);

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    // Restore scroll position after content has rendered
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const savedScrollY = sessionStorage.getItem(SCROLL_POSITION_KEY);
            if (savedScrollY) {
                isRestoringScroll.current = true;
                setTimeout(() => {
                    window.scrollTo(0, parseInt(savedScrollY, 10));
                    sessionStorage.removeItem(SCROLL_POSITION_KEY);
                    isRestoringScroll.current = false;
                }, 100);
            }
        }
    }, []);

    return (
        <PageWrapper pageTitle="Next.js Features App">
            <ParagraphWrapper classNameOverride="max-w-md">
                This project demonstrates the core features of Next.js. It was
                made by me to learn and practice my Next.js skills. All features
                are separated into different categories, and can be visited down
                below.
            </ParagraphWrapper>

            <ParagraphWrapper classNameOverride="max-w-md">
                To see the code or run the app on your machine, check out the
                Github repo:{" "}
                <LinkWrapper href="https://www.github.com">
                    github.com
                </LinkWrapper>
            </ParagraphWrapper>

            <div className="w-full max-w-screen-md md:mx-auto mt-10">
                <SiteLinks />
            </div>
        </PageWrapper>
    );
}

export default Page;
