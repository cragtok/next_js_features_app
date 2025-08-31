import { JOKE_API_URL } from "./constants";

export const fetchJoke = async (): Promise<string> => {
    if (!JOKE_API_URL) {
        throw new Error("Missing joke API URL.");
    }

    const response = await fetch(JOKE_API_URL, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch joke");
    }

    const data = await response.json();
    return data.joke;
};

