import React from "react";

interface Props {
    children: React.ReactNode;
    pageTitle?: string;
}

export function PageWrapper({ children, pageTitle }: Props) {
    return (
        <div className="flex flex-col pt-10 gap-10 items-center text-center max-sm:text-sm pb-10">
            {pageTitle && (
                <h1 className="text-brand-700 font-extrabold text-4xl">
                    {pageTitle}
                </h1>
            )}
            {children}
        </div>
    );
}
