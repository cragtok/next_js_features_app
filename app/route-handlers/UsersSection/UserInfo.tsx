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
                <span data-testid="user-email">{email}</span>
            </p>
            <p>
                <span className="font-semibold">Password: </span>
                <span data-testid="user-password">{password}</span>
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
