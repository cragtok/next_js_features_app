"use client";

import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useEffect, useState } from "react";

const ABTestClientComponent = () => {
    const [abTestGroup, setAbTestGroup] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const cookies = document.cookie.split("; ");
        const abTestCookie = cookies.find((cookie) =>
            cookie.startsWith("ab-test-group=")
        );
        if (abTestCookie) {
            setAbTestGroup(abTestCookie.split("=")[1]);
        } else {
            setAbTestGroup(null);
        }
        setIsLoading(false);
    }, []);

    const generateGroupOutput = (group: string) => (
        <div
            className={`font-semibold ${group === "A" ? "text-green-400" : "text-blue-400"}`}
        >
            You are in group {group}
        </div>
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!abTestGroup) {
        return (
            <div className="mt-4 p-4 border rounded-md bg-neutral-100">
                <div className="font-semibold text-status-danger-500">
                    Error fetching cookie, please refresh page.
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 p-4 border rounded-md bg-neutral-100">
            {abTestGroup && generateGroupOutput(abTestGroup)}
        </div>
    );
};

export default ABTestClientComponent;
