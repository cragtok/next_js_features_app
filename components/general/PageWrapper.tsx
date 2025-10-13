import React from "react";

interface Props extends React.ComponentPropsWithRef<"div"> {
    children: React.ReactNode;
    pageTitle?: string;
}

const PageWrapper = ({ children, pageTitle, ...rest }: Props) => {
    return (
        <div
            className="flex flex-col pt-10 gap-10 items-center pb-10"
            {...rest}
        >
            {pageTitle && (
                <h1 className="text-brand-700 font-black text-4xl text-center">
                    {pageTitle}
                </h1>
            )}
            {children}
        </div>
    );
};

export default PageWrapper;
