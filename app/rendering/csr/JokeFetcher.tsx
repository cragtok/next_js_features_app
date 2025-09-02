"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { fetchJoke } from "./apiCall";
import CardWrapper from "@/components/general/CardWrapper";
import ButtonWrapper from "@/components/general/ButtonWrapper";

const JokeSkeleton = () => (
    <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
        <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full bg-brand-50" />
            <Skeleton className="h-4 w-full bg-brand-50" />
        </CardContent>
    </Card>
);

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

    return (
        <>
            {isFetching ? (
                <JokeSkeleton />
            ) : (
                <CardWrapper>
                    <CardContent>
                        {isError ? (
                            <TextAccentWrapper classNameOverride="italic text-status-danger-500 text-center">
                                {
                                    "Failed to load joke. Please try fetching again."
                                }
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
                </CardWrapper>
            )}

            <ButtonWrapper onClick={handleClick} disabled={isFetching}>
                Fetch Joke
            </ButtonWrapper>
        </>
    );
};

export default JokeFetcher;
