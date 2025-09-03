import { CardContent } from "@/components/ui/card";

import { Quote, fetchQuote } from "./apiCall";
import CardWrapper from "@/components/general/CardWrapper";

const QuoteCard = async () => {
    const quoteData: Quote | null = await fetchQuote();

    return (
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
                        Failed to load quote. Please try refreshing the page.
                    </blockquote>
                )}
            </CardContent>
        </CardWrapper>
    );
};

export default QuoteCard;
