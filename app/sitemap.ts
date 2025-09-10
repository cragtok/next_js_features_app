import type { MetadataRoute } from "next";
import { routeObjects } from "@/lib/routesList";
import { serverEnv } from "@/lib/env/serverEnv";

const DOMAIN_URL = serverEnv.DOMAIN_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const href in routeObjects) {
        const route = routeObjects[href];
        if (route.href) {
            sitemapEntries.push({
                url: `${DOMAIN_URL}${route.href}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: route.priority,
            });
        }
    }

    return sitemapEntries;
}
