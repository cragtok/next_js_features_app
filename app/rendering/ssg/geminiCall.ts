import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface CityDateTime {
    city: string;
    date: string;
    time: string;
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const baseContents =
    "Give me the current date and time for these cities: New York, London, Tokyo, and Dubai.";
const systemInstruction = `
        Your answer must be in the format of an array of JSON objects.
        Each object must contain three keys: 'city', 'date', 'time' and is of this format:
        """
        {
            city: <The name of the city>
            date: <Date in 'DD/MM/YYYY' format>
            time: <Time in 'hh:mm a' format>
        }
        """
        Do not wrap the answer in any markers such as backticks ('\`'), as it must be able to be directly processed using JavaScript's 'JSON.parse' function.
        `;

async function fetchCityDateTimes(): Promise<CityDateTime[]> {
    try {
        // Append a unique timestamp to the user content to bust potential API-side caching
        // This makes each request's contents slightly different, forcing a new lookup.
        const cacheBustingContents = `${baseContents} (Request Time: ${new Date().toISOString()})`;

        console.log(
            `[Gemini Call] Requesting content: ${cacheBustingContents.substring(0, 100)}...`
        );

        // return [
        //     {
        //         city: "Dubai",
        //         time: "DD/MM/YY",
        //         date: "12:23",
        //     },
        // ];

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

        console.log(response.text);
        return JSON.parse(response.text);
    } catch (error) {
        console.error(error);
        throw new Error("Gemini error");
    }
}

export { type CityDateTime, fetchCityDateTimes };
