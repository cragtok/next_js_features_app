interface DrizzleLibSqlNestedError {
    code: string;
    proto: {
        message: string;
    };
}

interface DrizzleLibSqlErrorCause {
    cause: DrizzleLibSqlNestedError;
}

export { type DrizzleLibSqlNestedError, type DrizzleLibSqlErrorCause };
