import type { MetadataRoute } from "next";
import { serverEnv } from "@/lib/env/serverEnv";

const DOMAIN_URL = serverEnv.DOMAIN_URL;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${DOMAIN_URL}/sitemap.xml`,
    };
}
