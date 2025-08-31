import { serverEnv } from "@/lib/serverEnv";

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

    const response = await fetch(apiCallURL, {
        method: "POST",
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return [];
    }

    const responseJson: ApiResponse = await response.json();
    const payload: APIPayload = responseJson.data;
    const result = formatPayload(payload);

    console.log(result);
    return result;
}

export { fetchPrices, oldPrices, type CryptoData };
