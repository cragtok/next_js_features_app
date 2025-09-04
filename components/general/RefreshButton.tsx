"use client";

import ButtonWrapper from "@/components/general/ButtonWrapper";
import { useState } from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
}

const RefreshButton = ({ children, ...rest }: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleClick = () => {
        setIsRefreshing(true);
        window.location.reload();
    };

    return (
        <ButtonWrapper disabled={isRefreshing} onClick={handleClick} {...rest}>
            {isRefreshing ? "Refreshing..." : children}
        </ButtonWrapper>
    );
};

export default RefreshButton;
