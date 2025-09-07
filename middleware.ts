import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import logger from "./lib/logging/logger";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();

    if (pathname.startsWith("/middleware/ab-testing")) {
        logger.info("middleware | ab-testing", "AB-test middleware.");
        let abTestGroup = request.cookies.get("ab-test-group")?.value;

        if (!abTestGroup) {
            abTestGroup = Math.random() < 0.5 ? "A" : "B";
            logger.info(
                "middleware | ab-testing",
                "Setting ab-test-group cookie..."
            );
            response.cookies.set("ab-test-group", abTestGroup, {
                path: "/",
                maxAge: 5,
            }); // Set for 5 seconds
            logger.info("middleware | ab-testing", "ab-test-group cookie set.");
        }
        return response;
    }

    if (pathname.startsWith("/middleware/log")) {
        logger.info("middleware | log", "Logging middleware.");
        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "N/A";

        const serverTime = new Date().toISOString();

        logger.info("middleware | log", "Collecting request headers...");
        const userAgent = request.headers.get("user-agent") || "N/A";
        const country = request.headers.get("x-geo-country");
        const region = request.headers.get("x-geo-region");
        const city = request.headers.get("x-geo-city");
        const timezone = request.headers.get("x-geo-tz");
        logger.info("middleware | log", "Request headers collected.");

        logger.info("middleware | log", "Setting response headers...");
        const responseHeaders = new Headers(request.headers);
        responseHeaders.set("x-request-ip", ip);
        responseHeaders.set("x-server-time", serverTime);
        responseHeaders.set("x-user-agent", userAgent);
        if (country) {
            responseHeaders.set(
                "x-geo-location",
                `${city}, ${region}, ${country} (Timezone: ${timezone})`
            );
        } else {
            responseHeaders.set(
                "x-geo-location",
                "Geo-Location headers not detected for path. This usually happens in local development."
            );
        }
        logger.info("middleware | log", "Response headers set.");

        return NextResponse.next({
            request: {
                headers: responseHeaders,
            },
        });
    }

    return response;
}

export const config = {
    matcher: ["/middleware/ab-testing", "/middleware/log"],
};
