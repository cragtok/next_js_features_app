import { serverEnv } from "@/lib/env/serverEnv";
import logger from "@/lib/logging/logger";

interface Quote {
    quote: string;
    author: string;
}

async function fetchQuote() {
    let quoteData: Quote | null = null;

    logger.info("fetchQuote", "Fetching quote...");
    try {
        const response = await fetch(serverEnv.QUOTES_API_URL, {
            cache: "no-store",
        });

        if (!response.ok) {
            logger.error("fetchQuote", "Failed to fetch quote", {
                status: response.status,
            });
            return null;
        }

        const data = await response.json();
        if (data && data.text && data.author) {
            quoteData = {
                quote: data.text,
                author: data.author,
            };
        }

        logger.info("fetchQuote", "Fetched quote.");
        logger.debug("fetchQuote", "Fetched quote.", {
            data: quoteData,
        });

        return quoteData;
    } catch (error) {
        console.error(error);
        logger.error("fetchQuote", "Failed to fetch quote.", {
            error: error as Error,
        });
    }
    return null;
}

export { type Quote, fetchQuote };
