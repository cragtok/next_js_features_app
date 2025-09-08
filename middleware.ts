import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLogger } from "./lib/logging/logger";
import { v4 as uuidv4 } from "uuid";

function formatCurrentTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();
    const logger = getLogger("middleware.ts");

    let userRequestId = request.cookies.get("x-user-session-id")?.value;
    if (!userRequestId) {
        userRequestId = uuidv4();
    }
    logger.info(
        `[${formatCurrentTime()}]: New ${request.method} request id ${userRequestId} for path ${request.nextUrl.pathname}`
    );
    response.headers.set("x-user-session-id", userRequestId);

    if (pathname.startsWith("/middleware/ab-testing")) {
        let abTestGroup = request.cookies.get("ab-test-group")?.value;

        if (!abTestGroup) {
            abTestGroup = Math.random() < 0.5 ? "A" : "B";
            response.cookies.set("ab-test-group", abTestGroup, {
                path: "/",
                maxAge: 5,
            }); // Set for 5 seconds
        }
    }

    if (pathname.startsWith("/middleware/log")) {
        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "N/A";

        const serverTime = new Date().toISOString();

        const userAgent = request.headers.get("user-agent") || "N/A";
        const country = request.headers.get("x-geo-country");
        const region = request.headers.get("x-geo-region");
        const city = request.headers.get("x-geo-city");
        const timezone = request.headers.get("x-geo-tz");

        // Update headers on the response object
        response.headers.set("x-request-ip", ip);
        response.headers.set("x-server-time", serverTime);
        response.headers.set("x-user-agent", userAgent);
        if (country) {
            response.headers.set(
                "x-geo-location",
                `${city}, ${region}, ${country} (Timezone: ${timezone})`
            );
        } else {
            response.headers.set(
                "x-geo-location",
                "Geo-Location headers not detected for path. This usually happens in local development."
            );
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
