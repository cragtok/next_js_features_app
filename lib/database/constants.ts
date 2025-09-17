import path from "path";

export const DB_FILE_PATH = process.env.NODE_ENV === 'test' ? ':memory:' : path.join(process.cwd(), "data", "app.db");
export const DB_CACHE_PATH = "db-users-path";
export const DB_CACHE_TAG = "db-users-tag";
export const MAX_USERS = 10;
