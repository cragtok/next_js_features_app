import { PageWrapper } from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import { headers } from "next/headers";
import { SectionWrapper } from "@/components/general/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LogPage() {
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
                <div className="flex flex-col gap-3 max-w-lg">
                    <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
                        <CardHeader>
                            <CardTitle className="text-accent-500 font-semibold">
                                IP Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-brand-500">{ip}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
                        <CardHeader>
                            <CardTitle className="text-accent-500 font-semibold">
                                Server Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-brand-500">{serverTime}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
                        <CardHeader>
                            <CardTitle className="text-accent-500 font-semibold">
                                Geo Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-brand-500">{geoLocation}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-100 rounded-md pt-5 pb-3 text-center">
                        <CardHeader>
                            <CardTitle className="text-accent-500 font-semibold">
                                User Agent
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-brand-500">{userAgent}</p>
                        </CardContent>
                    </Card>
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
}
