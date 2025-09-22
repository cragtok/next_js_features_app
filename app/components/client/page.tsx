"use client";

import PageWrapper from "@/components/general/PageWrapper";
import { useState } from "react";

const Page = () => {
    const [count, setCount] = useState(0);

    return (
        <PageWrapper pageTitle="Client Components">
            <h1>This is a Client Component Page</h1>
            <p>Content rendered on the client.</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </PageWrapper>
    );
};

export default Page;
