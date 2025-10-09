import { appEnv } from "@/lib/env/appEnv";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

const TWELVE_DATA_API_BATCH_URL = "https://api.twelvedata.com/batch";
const API_CALL_URL = `${TWELVE_DATA_API_BATCH_URL}?apikey=${appEnv.TWELVE_DATA_API_KEY}`;

interface RequestBody {
    [key: string]: {
        url: string;
    };
}

interface APIPayload {
    status: string;
    response: {
        price: string;
    };
}
interface ApiResponse {
    code: number;
    status: string;
    data: APIPayload;
}

interface CryptoData {
    symbol: string;
    status: string;
    price: string;
}

// Sometimes the API does not return the price for a particular coin.
// In that case we show its previous price, which is stored here.
const oldPrices: Record<string, string> = {};

const formatPayload = (payload: APIPayload): CryptoData[] =>
    Object.entries(payload)
        .map(([symbol, value]) => {
            let price;
            if (value.response.price) {
                oldPrices[symbol] = value.response.price;
                price = value.response.price;
            } else {
                price = oldPrices[symbol];
            }
            return {
                symbol: symbol,
                status: value.status,
                price,
            };
        })
        .sort((a, b) => (a.symbol >= b.symbol ? 1 : -1));

const generateRequestBody = () => {
    const coinsList = ["BTC", "ETH", "XMR", "XRP"];

    const generateCoinURL = (coin: string) =>
        `/price?symbol=${coin}/USD&apikey=${appEnv.TWELVE_DATA_API_KEY}`;

    const body: RequestBody = {};
    for (const coin of coinsList) {
        body[coin] = {
            url: generateCoinURL(coin),
        };
    }

    return JSON.stringify(body);
};

async function fetchPrices(): Promise<CryptoData[]> {
    const logger = getLogger(`${CURRENT_FILE_NAME} | fetchPrices`);

    logger.info("Fetching crypto prices...");

    let result: CryptoData[] = [];
    try {
        const response = await fetch(API_CALL_URL, {
            method: "POST",
            body: generateRequestBody(),
        });

        if (!response.ok) {
            logger.error("Response not success.", {
                status: response.status,
                text: response.statusText,
            });
            const errorDetail = response.text();
            throw new Error(
                `Failed to fetch quote: ${response.status} ${response.statusText} ${errorDetail}`
            );
        }

        const responseJson: ApiResponse = await response.json();
        const payload: APIPayload = responseJson.data;
        result = formatPayload(payload);

        logger.info("Fetched crypto prices.");
        logger.debug("Crypto price data:", {
            data: result,
        });
        return result;
    } catch (error) {
        console.error(error);
        logger.error("Error fetching prices.", {
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        throw new Error("Could not fetch prices. Please try again later.");
    }
}

export { fetchPrices, oldPrices, type CryptoData };
