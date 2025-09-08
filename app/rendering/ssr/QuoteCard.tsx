import { CardContent } from "@/components/ui/card";

import { Quote, fetchQuote } from "./apiCall";
import CardWrapper from "@/components/general/CardWrapper";
import RefreshButton from "@/components/general/RefreshButton";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";

const QuoteCard = async () => {
    const requestId = await extractUserRequestId();

    let quoteData: Quote | null = null;
    let errorMessage: string | null = null;

    try {
        quoteData = await fetchQuote(requestId);
    } catch (error) {
        console.error(error);
        errorMessage = (error as Error).message || "Failed to load quote.";
    }

    return (
        <>
            <CardWrapper classNameOverride="text-justify">
                <CardContent>
                    {quoteData ? (
                        <figure className="text-accent-500 flex flex-col gap-3">
                            <blockquote className="italic">
                                &quot;{quoteData.quote}&quot;
                            </blockquote>
                            <figcaption className="italic font-semibold self-end">
                                — {quoteData.author}
                            </figcaption>
                        </figure>
                    ) : (
                        <blockquote className="text-status-danger-500 font-semibold text-center">
                            {errorMessage}
                        </blockquote>
                    )}
                </CardContent>
            </CardWrapper>

            <RefreshButton>Refresh Page</RefreshButton>
        </>
    );
};

export default QuoteCard;
