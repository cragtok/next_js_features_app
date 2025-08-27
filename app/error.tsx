"use client";

import { useEffect } from "react";
import PageWrapper from "@/components/general/PageWrapper";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/general/SectionWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Caught global error:", error);
    }, [error]);

    return (
        <PageWrapper>
            <h1 className="text-status-danger-500 font-extrabold text-4xl">
                Error!
            </h1>
            <SectionWrapper classNameOverride="gap-10 max-w-md">
                <ParagraphWrapper classNameOverride="text-brand-500 font-bold text-center">
                    We&apos;re sorry, but an unexpected error occurred! Please
                    try again.
                </ParagraphWrapper>

                <Button
                    className="bg-brand-500 hover:bg-brand-700 font-semibold"
                    onClick={reset}
                >
                    Try Again
                </Button>
            </SectionWrapper>

            {process.env.NODE_ENV === "development" && (
                <div className="bg-status-danger-50 text-status-danger-700 p-4 rounded-md mb-6 w-full max-w-md text-left overflow-x-auto font-mono text-sm">
                    <h3 className="font-bold mb-2">
                        Error Details (Development Only):
                    </h3>
                    <p>
                        <strong>Message:</strong> {error.message}
                    </p>
                    <p>
                        <strong>Stack:</strong>
                    </p>
                    <pre className="whitespace-pre-wrap break-all">
                        {error.stack}
                    </pre>
                </div>
            )}
        </PageWrapper>
    );
}

export default GlobalError;
