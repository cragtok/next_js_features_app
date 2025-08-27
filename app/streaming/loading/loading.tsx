import PageWrapper from "@/components/general/PageWrapper";

export default function Loading() {
    return (
        <PageWrapper pageTitle="Loading...">
            <div className="w-full max-w-lg space-y-3 pt-10">
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-brand-50 rounded animate-pulse w-full"></div>
            </div>
        </PageWrapper>
    );
}
