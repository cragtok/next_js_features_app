import * as z from "zod";

function processEnv<T extends z.ZodSchema>(
    schema: T,
    source: Record<string, string | undefined>
): z.infer<T> {
    const parsed = schema.safeParse(source);

    if (!parsed.success) {
        console.error(
            "❌ Invalid environment variables:",
            z.treeifyError(parsed.error).errors,
            "\nFull error:",
            parsed.error // Log the Zod error for detailed context
        );
        throw new Error(
            "Invalid client environment variables. Check your .env file or deployment config."
        );
    }

    return parsed.data;
}

export { processEnv };
