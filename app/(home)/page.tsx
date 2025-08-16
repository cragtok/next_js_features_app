import { PageWrapper } from "@/components/general/PageWrapper";
import SiteLinks from "./SiteLinks";

export default function Page() {
    return (
        <PageWrapper pageTitle="Next.js Features App">
            <p className="text-brand-500 max-w-md text-justify">
                This project demonstrates various features of Next.js. All
                features are fully working. Just click on a link to see a
                feature in action.
            </p>

            <div className="w-full max-w-screen-md md:mx-auto mt-10">
                <SiteLinks />
            </div>
        </PageWrapper>
    );
}
