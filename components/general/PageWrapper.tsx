import React from "react";

interface Props {
    children: React.ReactNode;
    pageTitle?: string;
}

const PageWrapper = ({ children, pageTitle }: Props) => {
    return (
        <div className="flex flex-col pt-10 gap-10 items-center pb-10">
            {pageTitle && (
                <h1 className="text-brand-700 font-extrabold text-4xl text-center">
                    {pageTitle}
                </h1>
            )}
            {children}
        </div>
    );
};

export default PageWrapper;
