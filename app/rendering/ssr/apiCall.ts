import { serverEnv } from "@/lib/env/serverEnv";

interface Quote {
    quote: string;
    author: string;
}

async function fetchQuote() {
    let quoteData: Quote | null = null;

    try {
        const response = await fetch(serverEnv.QUOTES_API_URL, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to fetch quote");
            return quoteData;
        }

        const data = await response.json();
        if (data && data.text && data.author) {
            quoteData = {
                quote: data.text,
                author: data.author,
            };
        }
    } catch (error) {
        console.error(error);
    }
    return quoteData;
}

export { type Quote, fetchQuote };
