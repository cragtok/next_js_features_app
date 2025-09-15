"use client";

import { useQuery } from "@tanstack/react-query";
import { CardContent } from "@/components/ui/card";
import LoadingSkeleton from "@/components/general/LoadingSkeleton";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { fetchJoke } from "./apiCall";
import CardWrapper from "@/components/general/CardWrapper";
import ButtonWrapper from "@/components/general/ButtonWrapper";

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
                <LoadingSkeleton numRows={4} />
            ) : (
                <CardWrapper>
                    <CardContent>
                        {isError ? (
                            <TextAccentWrapper
                                classNameOverride="text-status-danger-500 text-center"
                                data-test="joke-error"
                            >
                                {
                                    "Failed to load joke. Please try fetching again."
                                }
                            </TextAccentWrapper>
                        ) : joke ? (
                            <TextAccentWrapper
                                classNameOverride="italic text-center"
                                data-test="joke-text"
                            >
                                {joke}
                            </TextAccentWrapper>
                        ) : (
                            <TextAccentWrapper classNameOverride="text-center text-brand-500" data-test="initial-text">
                                {"Click the button to fetch a joke."}
                            </TextAccentWrapper>
                        )}
                    </CardContent>
                </CardWrapper>
            )}

            <ButtonWrapper
                onClick={handleClick}
                disabled={isFetching}
                data-test="joke-fetch-button"
            >
                Fetch Joke
            </ButtonWrapper>
        </>
    );
};

export default JokeFetcher;
