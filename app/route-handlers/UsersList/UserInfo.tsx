"use client";

import { RefObject } from "react";

interface Props {
    email: string;
    password: string;
    lastItemRef: RefObject<HTMLDivElement | null> | null;
}

const UserInfo = ({ email, password, lastItemRef }: Props) => {
    return (
        <div className="mt-2 text-justify wrap-anywhere" ref={lastItemRef}>
            <p>
                <span className="font-semibold">Email: </span>
                {email}
            </p>
            <p>
                <span className="font-semibold">Password: </span>
                {password}
            </p>
        </div>
    );
};

export default UserInfo;
