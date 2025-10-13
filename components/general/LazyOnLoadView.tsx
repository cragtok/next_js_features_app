"use client";

import React, { useRef, useState, useEffect } from "react";

interface Props {
    children: React.ReactNode;
    /**
     * Optional: Margin around the root. Can have values similar to the CSS margin property,
     * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
     * Defaults to "0px".
     */
    rootMargin?: string;
    /**
     * Optional: Either a single number or an array of numbers which indicate at what percentage
     * of the target's visibility the observer's callback should be executed.
     * Defaults to 0 (meaning as soon as even one pixel is visible).
     */
    threshold?: number | number[];
}

const LazyOnLoadView: React.FC<Props> = ({
    children,
    rootMargin = "0px",
    threshold = 0,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin, threshold }
        );

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [rootMargin, threshold]);

    return (
        <div
            ref={containerRef}
            style={{ minHeight: isVisible ? "auto" : "100px" }}
        >
            {isVisible ? children : null}
        </div>
    );
};

export default LazyOnLoadView;
