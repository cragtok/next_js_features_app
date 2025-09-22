"use client";

import ButtonWrapper from "@/components/general/ButtonWrapper";
import CardWrapper from "@/components/general/CardWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="flex flex-col gap-5">
            <CardWrapper>
                <TextAccentWrapper>Count: {count}</TextAccentWrapper>
            </CardWrapper>
            <ButtonWrapper onClick={() => setCount(count + 1)}>
                Increment Count
            </ButtonWrapper>
        </div>
    );
};

export default Counter;
