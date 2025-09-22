"use client";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
    useReportWebVitals((metric) => {
        switch (metric.name) {
            case "FCP":
                console.log("FCP:", metric);
                break;
            case "TTFB":
                console.log("TTFB:", metric);
                break;
            case "LCP":
                console.log("LCP:", metric);
                break;
            case "CLS":
                console.log("CLS:", metric);
                break;
            case "FID":
                console.log("FID:", metric);
                break;
            default:
                console.log(metric.name, ":", metric);
                break;
        }
    });
    return <></>;
}
