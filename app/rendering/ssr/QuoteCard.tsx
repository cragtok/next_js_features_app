import { Card, CardContent } from "@/components/ui/card";

import { Quote, fetchQuote } from "./apiCall";

const QuoteCard = async () => {
    const quoteData: Quote | null = await fetchQuote();

    return (
        <Card className="max-w-prose bg-neutral-100 rounded-md pt-5 pb-3">
            <CardContent>
                {quoteData ? (
                    <figure className="max-[410px]:text-center text-justify text-accent-500">
                        <blockquote className="italic">
                            &quot;{quoteData.quote}&quot;
                        </blockquote>
                        <figcaption className="italic font-semibold">
                            — {quoteData.author}
                        </figcaption>
                    </figure>
                ) : (
                    <blockquote className="text-status-danger-500 font-semibold">
                        Failed to load quote. Please try refreshing the page.
                    </blockquote>
                )}
            </CardContent>
        </Card>
    );
};

export default QuoteCard;
