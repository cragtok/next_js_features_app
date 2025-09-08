import { clientEnv } from "@/lib/env/clientEnv";

export const fetchJoke = async (): Promise<string> => {
    try {
        const response = await fetch(clientEnv.NEXT_PUBLIC_JOKE_API_URL, {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const errorDetail = response.text();
            throw new Error(
                `Failed to fetch quote: ${response.status} ${response.statusText} ${errorDetail}`
            );
        }

        const data = await response.json();
        return data.joke;
    } catch (error) {
        console.error(error);
        throw new Error("Could not fetch joke. Please try again later.");
    }
};
