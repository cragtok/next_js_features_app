"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

const JOKE_API_URL = process.env.NEXT_PUBLIC_JOKE_API_URL;

const JokeSkeleton = () => (
    <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
        <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full bg-brand-50" />
            <Skeleton className="h-4 w-full bg-brand-50" />
        </CardContent>
    </Card>
);

const fetchJoke = async (): Promise<string> => {
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

const JokeFetcher = () => {
    const {
        data: joke,
        isFetching,
        isError,
        refetch,
    } = useQuery<string, Error>({
        queryKey: ["joke"],
        queryFn: fetchJoke,
        enabled: false,
        retry: false,
    });

    const handleClick = () => {
        refetch();
    };

    if (isFetching) {
        return <JokeSkeleton />;
    }

    return (
        <>
            <Card className="max-w-prose bg-neutral-100 rounded-md pt-5 pb-3">
                <CardContent>
                    {isError ? (
                        <TextAccentWrapper classNameOverride="italic text-status-danger-500 text-center">
                            {"Failed to load joke. Please try fetching again."}
                        </TextAccentWrapper>
                    ) : joke ? (
                        <TextAccentWrapper classNameOverride="italic text-center">
                            {joke}
                        </TextAccentWrapper>
                    ) : (
                        <TextAccentWrapper classNameOverride="text-center text-brand-500">
                            {"Click the button to fetch a joke."}
                        </TextAccentWrapper>
                    )}
                </CardContent>
            </Card>

            <Button
                className="bg-brand-500"
                onClick={handleClick}
                disabled={isFetching}
            >
                Fetch Joke
            </Button>
        </>
    );
};

export default JokeFetcher;
