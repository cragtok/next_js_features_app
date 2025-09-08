import { serverEnv } from "@/lib/env/serverEnv";
import { getLogger } from "@/lib/logging/logger";

interface Quote {
    quote: string;
    author: string;
}

async function fetchQuote(requestId?: string): Promise<Quote> {
    const logger = getLogger(requestId);

    logger.info("fetchQuote", "Fetching quote...");
    try {
        const response = await fetch(serverEnv.QUOTES_API_URL, {
            cache: "no-store",
        });

        if (!response.ok) {
            logger.error("fetchQuote", "Reponse not success.", {
                status: response.status,
                text: response.statusText,
            });
            const errorDetail = response.text();
            throw new Error(
                `Failed to fetch quote: ${response.status} ${response.statusText} ${errorDetail}`
            );
        }

        const data = await response.json();

        if (!data || !data.text || !data.author) {
            throw new Error("Invalid quote data format.");
        }

        const quoteData = {
            quote: data.text,
            author: data.author,
        };

        logger.info("fetchQuote", "Fetched quote.");
        logger.debug("fetchQuote", "Quote data:", {
            data: quoteData,
        });

        return quoteData;
    } catch (error: unknown) {
        console.error(error);
        logger.error("fetchQuote", "Error fetching quote.", {
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        throw new Error("Could not retrieve quote. Please try again later.");
    }
}

export { type Quote, fetchQuote };
