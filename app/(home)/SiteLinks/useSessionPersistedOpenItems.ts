"use client";

import { useEffect, useState } from "react";

const useSessionPersistedOpenItems = (localStorageKey: string) => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedState = sessionStorage.getItem(localStorageKey);
            if (savedState) {
                setOpenItems(JSON.parse(savedState));
            }
        }
        setIsLoading(false);
    }, [localStorageKey]);

    useEffect(() => {
        if (typeof window !== "undefined" && !isLoading) {
            sessionStorage.setItem(localStorageKey, JSON.stringify(openItems));
        }
    }, [openItems, isLoading, localStorageKey]);

    return { openItems, setOpenItems, isLoading };
};

export default useSessionPersistedOpenItems;
