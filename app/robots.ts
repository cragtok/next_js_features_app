import type { MetadataRoute } from "next";
import { appEnv } from "@/lib/env/appEnv";

const DOMAIN_URL = appEnv.DOMAIN_URL;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${DOMAIN_URL}/sitemap.xml`,
    };
}
