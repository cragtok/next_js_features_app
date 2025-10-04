import { useEffect, useRef, useState } from "react";

const useSmallScreenWidthObserver = (flexBreakpointWidth: number) => {
    const [isSmall, setIsSmall] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                if (width < flexBreakpointWidth) {
                    setIsSmall(true);
                } else {
                    setIsSmall(false);
                }
            }
        });

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [flexBreakpointWidth]);

    return { isSmall, ref };
};

export default useSmallScreenWidthObserver;
