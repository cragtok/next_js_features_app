import LoadingSpinner from "@/components/general/LoadingSpinner";
import PageWrapper from "@/components/general/PageWrapper";

function Loading() {
    return (
        <PageWrapper pageTitle="Loading...">
            <LoadingSpinner />
        </PageWrapper>
    );
}

export default Loading;
