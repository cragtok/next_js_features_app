import { serverEnv } from "@/lib/env/serverEnv";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

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

const generateCoinURL = (coin: string) =>
    `/price?symbol=${coin}/USD&apikey=${serverEnv.TWELVE_DATA_API_KEY}`;

const apiCallURL = `${serverEnv.TWELVE_DATA_API_BATCH_URL}?apikey=${serverEnv.TWELVE_DATA_API_KEY}`;

async function fetchPrices(): Promise<CryptoData[]> {
    const coinsList = ["BTC", "ETH", "XMR", "XRP"];

    const body: RequestBody = {};
    for (const coin of coinsList) {
        body[coin] = {
            url: generateCoinURL(coin),
        };
    }
    const logger = getLogger(`${CURRENT_FILE_NAME} | fetchPrices`);

    logger.info("Fetching crypto prices...");

    let result: CryptoData[] = [];
    try {
        const response = await fetch(apiCallURL, {
            method: "POST",
            body: JSON.stringify(body),
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
