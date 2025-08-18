import { Card, CardContent } from "@/components/ui/card";

interface Quote {
    quote: string;
    author: string;
}

const API_URL = process.env.QUOTES_API_URL || "";

export default async function QuoteCard() {
    let quoteData: Quote | null = null;

    try {
        const response = await fetch(API_URL, {
            cache: "no-store",
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.text && data.author) {
                quoteData = {
                    quote: data.text,
                    author: data.author,
                };
            }
        }
    } catch (error) {
        console.error("Failed to fetch quote:", error);
    }

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
                    <blockquote className="text-status-danger-500">
                        Failed to load quote. Please try refreshing the page.
                    </blockquote>
                )}
            </CardContent>
        </Card>
    );
}
