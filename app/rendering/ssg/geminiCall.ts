import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface CityDateTime {
    city: string;
    date: string;
    time: string;
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const contents =
    "Give me the current data and time for these cities: New York, London, Tokyo, and Dubai.";
const systemInstruction = `
        Your answer must be an array of json objects, where each object contains three keys: 'city', 'date', 'time'.
        The values of each key must be strings.
        'city' is the city name.
        'date' is the date in 'DD/MM/YYYY' format.
        'time' is the time in 'HH:MM' format using the 24 hour clock followed by a space and then 'PM' or 'AM' depending on the time of day.
        Do not wrap the response in any markers such as backticks, as it must be able to be directly processed using JavaScript's 'JSON.parse' function.
        `;

async function fetchCityDateTimes(): Promise<CityDateTime[]> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents,
            config: {
                systemInstruction,
                tools: [{ googleSearch: {} }],
            },
        });

        if (!response || !response.text) {
            throw new Error("Error: missing or malformated response");
        }

        console.log(response.text);
        return JSON.parse(response.text);
    } catch (error) {
        console.error(error);
        throw new Error("Gemini error");
    }
}

export { type CityDateTime, fetchCityDateTimes };
