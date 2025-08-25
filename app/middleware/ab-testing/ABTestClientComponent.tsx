"use client";

import LoadingSpinner from "@/app/streaming/suspense/LoadingSpinner";
import { useEffect, useState } from "react";

export default function ABTestClientComponent() {
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
        }
        setIsLoading(false);
    }, []);

    const AGroupText = (
        <div className="font-semibold text-green-400">You are in group A</div>
    );
    const BGroupText = (
        <div className="font-semibold text-blue-400">You are in group B</div>
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!abTestGroup) {
        <div className="mt-4 p-4 border rounded-md bg-neutral-100"></div>;
    }

    return (
        <div className="mt-4 p-4 border rounded-md bg-neutral-100">
            {abTestGroup ? (
                abTestGroup === "A" ? (
                    AGroupText
                ) : (
                    BGroupText
                )
            ) : (
                <div className="font-semibold text-status-danger-500">
                    Error fetching cookie, please refresh page.
                </div>
            )}
        </div>
    );
}
