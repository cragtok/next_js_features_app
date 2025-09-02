"use client";

import { RefObject } from "react";

interface Props {
    email: string;
    password: string;
    createdAt: string | undefined;
    lastItemRef: RefObject<HTMLDivElement | null> | null;
}

const UserInfo = ({ email, password, lastItemRef, createdAt }: Props) => {
    return (
        <div className="text-brand-500" ref={lastItemRef}>
            <p>
                <span className="font-semibold">Email: </span>
                {email}
            </p>
            <p>
                <span className="font-semibold">Password: </span>
                {password}
            </p>
            {createdAt && (
                <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(createdAt).toUTCString()}
                </p>
            )}
        </div>
    );
};

export default UserInfo;
