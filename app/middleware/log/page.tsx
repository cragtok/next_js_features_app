import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import { headers } from "next/headers";
import SectionWrapper from "@/components/general/SectionWrapper";
import RequestInfoCard from "./RequestInfoCard";

async function Page() {
    const headersList = await headers();
    const ip = headersList.get("x-request-ip") || "N/A";
    const serverTimeRaw = headersList.get("x-server-time") || "N/A";
    const serverTime =
        serverTimeRaw !== "N/A"
            ? new Date(serverTimeRaw).toLocaleString()
            : "N/A";
    const userAgent = headersList.get("x-user-agent") || "N/A";
    const geoLocation = headersList.get("x-geo-location") || "N/A";

    return (
        <PageWrapper pageTitle="Middleware Request Info Logging">
            <SectionWrapper>
                <ParagraphWrapper>
                    This page demonstrates request information logging using
                    Next.js Middleware. The middleware intercepts incoming
                    requests to this route and extracts information such as the
                    client&apos;s IP address, the server&apos;s current time,
                    and the user agent string. This information is then passed
                    to this page via custom request headers and displayed below.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Request Information">
                <div className="flex flex-col max-w-prose">
                    <RequestInfoCard title="IP Address" info={ip} />
                    <RequestInfoCard title="Server Time" info={serverTime} />
                    <RequestInfoCard title="Geo Location" info={geoLocation} />
                    <RequestInfoCard title="User Agent" info={userAgent} />
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
