const API_KEY = process.env.TWELVE_DATA_API_KEY;
const API_BATCH_URL = process.env.TWELVE_DATA_API_BATCH_URL;

interface RequestBody {
    [key: string]: {
        url: string;
    };
}

interface Payload {
    status: string;
    response: {
        price: string;
    };
}
interface ApiResponse {
    code: number;
    status: string;
    data: Payload;
}

export interface CryptoData {
    symbol: string;
    status: string;
    price: string;
}

// Sometimes the API does not return the price for a particular coin
// In that case we show its previous price, which is stored here
export const oldPrices: Record<string, string> = {};

export async function fetchPrices(): Promise<CryptoData[]> {
    if (!API_KEY || !API_BATCH_URL) {
        throw new Error("Missing API Key or URL.");
    }

    const coinsList = ["BTC", "ETH", "XMR", "XRP"];

    const body: RequestBody = {};

    for (const coin of coinsList) {
        body[coin] = {
            url: `/price?symbol=${coin}/USD&apikey=${API_KEY}`,
        };
    }

    const response = await fetch(`${API_BATCH_URL}?apikey=${API_KEY}`, {
        method: "POST",
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return [];
    }

    const responseJson: ApiResponse = await response.json();
    const payload: Payload = responseJson.data;

    const result: CryptoData[] = Object.entries(payload)
        .map(([symbol, value]) => {
            if (value.response.price) {
                oldPrices[symbol] = value.response.price;
            }
            return {
                symbol: symbol,
                status: value.status,
                price: value.response.price,
            };
        })
        .sort((a, b) => (a.symbol >= b.symbol ? 1 : -1));
    console.log(result);
    return result;
}
