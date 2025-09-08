import { GoogleGenAI } from "@google/genai";
import { serverEnv } from "@/lib/env/serverEnv";
import { delay } from "@/lib/utils";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

interface CityDateTime {
    city: string;
    date: string;
    time: string;
}

const baseContents =
    "Give me the current date and time for these cities: New York, London, Tokyo, and Dubai.";

const systemInstruction = `
        Your answer must be in the format of an array of JSON objects.
        Each object must contain three keys: 'city', 'date', 'time' and is of this format:
        """
        {
            city: <The name of the city>
            date: <Date in 'DD/MM/YYYY' format>
            time: <Time in 'hh:mm a' format, where 'a' is either AM or PM>
        }
        """
        Do not wrap the answer in any markers such as backticks ('\`'), as it must be able to be directly processed using JavaScript's 'JSON.parse' function.
        `;

async function fetchCityDateTimes(): Promise<CityDateTime[]> {
    const MAX_RETRIES = 5;
    const RETRY_DELAY_MS = 1000;
    const ai = new GoogleGenAI({ apiKey: serverEnv.GEMINI_API_KEY });

    const logger = getLogger(`${CURRENT_FILE_NAME} | fetchCityDateTimes`);

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            // Append a unique timestamp to the user content to bust potential API-side caching
            // This makes each request's contents slightly different, forcing a new lookup.
            const cacheBustingContents = `${baseContents} (Request Time: ${new Date().toISOString()})`;

            logger.info(`Fetching city date times...`, {
                attempt: i + 1,
            });

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: [{ text: cacheBustingContents }],
                config: {
                    systemInstruction,
                    tools: [{ googleSearch: {} }],
                    temperature: 0,
                },
            });

            if (!response || !response.text) {
                throw new Error("Error: missing or malformated response");
            }

            const cityDateTimes = JSON.parse(response.text);
            logger.info("Fetched city date times:", {
                data: cityDateTimes,
            });
            return cityDateTimes;
        } catch (error) {
            // Sometimes the response from Gemini comes wrapped in backticks,
            // despite providing system instructions.
            // So we retry the Gemini call until we get the response
            // in the proper format.
            logger.error(`Gemini call attempt ${i + 1} failed:`, {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
            if (i < MAX_RETRIES - 1) {
                await delay(RETRY_DELAY_MS);
            }
        }
    }
    throw new Error("Gemini error: Max retries reached.");
}

export { fetchCityDateTimes, type CityDateTime };

