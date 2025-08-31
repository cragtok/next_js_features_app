import { API_URL } from "./constants";

interface Quote {
    quote: string;
    author: string;
}

async function fetchQuote() {
    if (!API_URL) {
        throw new Error("Missing Quote API URL");
    }

    let quoteData: Quote | null = null;

    try {
        const response = await fetch(API_URL, {
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
