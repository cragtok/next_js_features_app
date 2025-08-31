import { clientEnv } from "@/lib/clientEnv";

export const fetchJoke = async (): Promise<string> => {
    const response = await fetch(clientEnv.NEXT_PUBLIC_JOKE_API_URL, {
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
