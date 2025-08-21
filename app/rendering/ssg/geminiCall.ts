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
            time: <Time in 'hh:mm a' format, where 'a' is either AM or PM>
        }
        """
        Do not wrap the answer in any markers such as backticks ('\`'), as it must be able to be directly processed using JavaScript's 'JSON.parse' function.
        `;

async function fetchCityDateTimes(): Promise<CityDateTime[]> {
    /* 
    When this function runs at build time, sometimes the Gemini call will
    stubbornly add backticks to the response (despite adding instructions),
    thus causing this function to throw an error. This requires running the
    build again until the response arrives in the correct format. When wanting
    to test production mode, it can get annoying to have to repeatedly run the
    build, so uncomment the next return statement and comment out the
    "return JSON.parse" statement at the end of the "try" block to just bypass
    the request to Gemini. 
    */

    // return [
    //     {
    //         city: "New York",
    //         date: "21/08/2025",
    //         time: "09:09 AM",
    //     },
    //     {
    //         city: "London",
    //         date: "21/08/2025",
    //         time: "02:09 PM",
    //     },
    //     {
    //         city: "Tokyo",
    //         date: "21/08/2025",
    //         time: "10:09 PM",
    //     },
    //     {
    //         city: "Dubai",
    //         date: "21/08/2025",
    //         time: "05:09 PM",
    //     },
    // ];

    try {
        // Append a unique timestamp to the user content to bust potential API-side caching
        // This makes each request's contents slightly different, forcing a new lookup.
        const cacheBustingContents = `${baseContents} (Request Time: ${new Date().toISOString()})`;

        console.log(
            `[Gemini Call] Requesting content: ${cacheBustingContents.substring(0, 100)}...`
        );

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
