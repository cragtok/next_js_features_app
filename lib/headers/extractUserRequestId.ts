import { headers } from "next/headers";

export async function extractUserRequestId(): Promise<string | undefined> {
    const headersList = await headers();
    return headersList.get("x-user-session-id") || undefined;
}
