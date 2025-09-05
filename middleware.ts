import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();

    if (pathname.startsWith("/middleware/ab-testing")) {
        let abTestGroup = request.cookies.get("ab-test-group")?.value;

        if (!abTestGroup) {
            abTestGroup = Math.random() < 0.5 ? "A" : "B";
            response.cookies.set("ab-test-group", abTestGroup, {
                path: "/",
                maxAge: 5,
            }); // Set for 5 seconds
        }
        return response;
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

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-request-ip", ip);
        requestHeaders.set("x-server-time", serverTime);
        requestHeaders.set("x-user-agent", userAgent);
        if (country) {
            requestHeaders.set(
                "x-geo-location",
                `${city}, ${region}, ${country} (Timezone: ${timezone})`
            );
        } else {
            requestHeaders.set(
                "x-geo-location",
                "Geo-Location headers not detected for path. This usually happens in local development."
            );
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return response;
}

export const config = {
    matcher: ["/middleware/ab-testing", "/middleware/log"],
};
