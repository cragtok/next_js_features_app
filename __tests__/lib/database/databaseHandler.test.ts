import {
    db,
    getCachedUsers,
    addUserToDb,
    findUserInDb,
    updateUserInDb,
    deleteUserInDb,
    clearDb,
    seedDb,
    User,
    UserDTO,
} from "@/lib/database/databaseHandler";
import { expect } from "@jest/globals";
import { DB_CACHE_TAG } from "@/lib/database/constants";
import { revalidateTag } from "next/cache";

jest.mock("next/cache", () => ({
    revalidateTag: jest.fn(),
    unstable_cache: jest.fn((fn) => fn),
}));

describe("Database Handler Integration Tests", () => {
    beforeEach(async () => {
        await clearDb();
        jest.clearAllMocks();
    });

    afterAll(() => {
        db.close();
    });

    describe("addUserToDb", () => {
        it("should add a new user to the database", async () => {
            const newUser: UserDTO = {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            };

            const addedUser = await addUserToDb(newUser);

            expect(addedUser).toHaveProperty("id");
            expect(addedUser.username).toBe(newUser.username);
            expect(addedUser.email).toBe(newUser.email);
            expect(addedUser.password).toBe(newUser.password);
            expect(addedUser).toHaveProperty("createdAt");
            expect(revalidateTag).toHaveBeenCalledWith(DB_CACHE_TAG);

            const foundUser = await findUserInDb(addedUser.id);
            expect(foundUser).toEqual(addedUser);
        });

        it("should delete the oldest user if MAX_USERS is reached", async () => {
            const MAX_USERS = 10;

            const usersToSeed: UserDTO[] = [];
            for (let i = 0; i < MAX_USERS; i++) {
                usersToSeed.push({
                    username: `user${i}`,
                    email: `user${i}@example.com`,
                    password: `password${i}`,
                });
            }
            await seedDb(usersToSeed);
            let users = (await getCachedUsers()) || [];
            expect(users.length).toBe(MAX_USERS);

            const newUser: UserDTO = {
                username: "newuser",
                email: "new@example.com",
                password: "newpassword",
            };
            const addedUser = await addUserToDb(newUser);
            users = (await getCachedUsers()) || [];
            expect(users.length).toBe(MAX_USERS);
            expect(revalidateTag).toHaveBeenCalledWith(DB_CACHE_TAG);

            users = (await getCachedUsers()) || [];
            const oldestUser = await findUserInDb(users[0].id);
            expect(oldestUser?.username).not.toBe("user0");
            expect(oldestUser?.email).not.toBe("user0@example.com");

            const foundNewUser = await findUserInDb(addedUser.id);
            expect(foundNewUser).toEqual(addedUser);
        });

        it("should throw an error if username already exists", async () => {
            const newUser: UserDTO = {
                username: "duplicateuser",
                email: "unique@example.com",
                password: "password123",
            };
            await addUserToDb(newUser);

            const duplicateUser: UserDTO = {
                username: "duplicateuser",
                email: "anotherunique@example.com",
                password: "password456",
            };

            await expect(addUserToDb(duplicateUser)).rejects.toThrow(
                /UNIQUE constraint failed: users.username/
            );
        });

        it("should throw an error if email already exists", async () => {
            const newUser: UserDTO = {
                username: "uniqueuser",
                email: "duplicate@example.com",
                password: "password123",
            };
            await addUserToDb(newUser);

            const duplicateUser: UserDTO = {
                username: "anotheruniqueuser",
                email: "duplicate@example.com",
                password: "password456",
            };

            await expect(addUserToDb(duplicateUser)).rejects.toThrow(
                /UNIQUE constraint failed: users.email/
            );
        });
    });

    describe("findUserInDb", () => {
        it("should find an existing user by ID", async () => {
            const newUser: UserDTO = {
                username: "findtest",
                email: "find@example.com",
                password: "password123",
            };
            const addedUser = await addUserToDb(newUser);

            const foundUser = await findUserInDb(addedUser.id);
            expect(foundUser).toEqual(addedUser);
        });

        it("should return null if user is not found", async () => {
            const foundUser = await findUserInDb("non-existent-id");
            expect(foundUser).toBeNull();
        });
    });

    describe("updateUserInDb", () => {
        it("should update an existing user", async () => {
            const newUser: UserDTO = {
                username: "updatetest",
                email: "update@example.com",
                password: "oldpassword",
            };
            const addedUser = await addUserToDb(newUser);

            const updatedUserData: User = {
                ...addedUser,
                username: "updateduser",
                email: "updated@example.com",
                password: "newpassword",
            };

            const updatedUser = await updateUserInDb(updatedUserData);

            expect(updatedUser.id).toBe(addedUser.id);
            expect(updatedUser.username).toBe(updatedUserData.username);
            expect(updatedUser.email).toBe(updatedUserData.email);
            expect(updatedUser.password).toBe(updatedUserData.password);
            expect(revalidateTag).toHaveBeenCalledWith(DB_CACHE_TAG);

            const foundUser = await findUserInDb(addedUser.id);
            expect(foundUser).toEqual(updatedUser);
        });

        it("should throw an error if updating with an existing username", async () => {
            const user1: UserDTO = {
                username: "user1",
                email: "user1@example.com",
                password: "password1",
            };
            const user2: UserDTO = {
                username: "user2",
                email: "user2@example.com",
                password: "password2",
            };
            const addedUser1 = await addUserToDb(user1);
            await addUserToDb(user2);

            const updatedUserData: User = {
                ...addedUser1,
                username: "user2",
            };

            await expect(updateUserInDb(updatedUserData)).rejects.toThrow(
                /UNIQUE constraint failed: users.username/
            );
        });

        it("should throw an error if updating with an existing email", async () => {
            const user1: UserDTO = {
                username: "userA",
                email: "userA@example.com",
                password: "passwordA",
            };
            const user2: UserDTO = {
                username: "userB",
                email: "userB@example.com",
                password: "passwordB",
            };
            const addedUser1 = await addUserToDb(user1);
            await addUserToDb(user2);

            const updatedUserData: User = {
                ...addedUser1,
                email: "userB@example.com",
            };

            await expect(updateUserInDb(updatedUserData)).rejects.toThrow(
                /UNIQUE constraint failed: users.email/
            );
        });
    });

    describe("deleteUserInDb", () => {
        it("should delete an existing user", async () => {
            const newUser: UserDTO = {
                username: "deletetest",
                email: "delete@example.com",
                password: "password123",
            };
            const addedUser = await addUserToDb(newUser);

            await deleteUserInDb(addedUser.id);
            expect(revalidateTag).toHaveBeenCalledWith(DB_CACHE_TAG);

            const foundUser = await findUserInDb(addedUser.id);
            expect(foundUser).toBeNull();
        });

        it("should not throw an error if user to delete does not exist", async () => {
            await expect(
                deleteUserInDb("non-existent-id")
            ).resolves.not.toThrow();
        });
    });

    describe("clearDb", () => {
        it("should clear all users from the database", async () => {
            const usersToSeed: UserDTO[] = [
                {
                    username: "clear1",
                    email: "clear1@example.com",
                    password: "p1",
                },
                {
                    username: "clear2",
                    email: "clear2@example.com",
                    password: "p2",
                },
            ];
            await seedDb(usersToSeed);
            let users = (await getCachedUsers()) || [];
            expect(users.length).toBe(2);

            await clearDb();
            users = (await getCachedUsers()) || [];
            expect(users.length).toBe(0);
        });
    });

    describe("seedDb", () => {
        it("should seed the database with provided users", async () => {
            const usersToSeed: UserDTO[] = [
                {
                    username: "seed1",
                    email: "seed1@example.com",
                    password: "p1",
                },
                {
                    username: "seed2",
                    email: "seed2@example.com",
                    password: "p2",
                },
            ];
            await seedDb(usersToSeed);

            const usersInDb = (await getCachedUsers()) || [];
            expect(usersInDb.length).toBe(2);
            expect(usersInDb[0].username).toBe("seed1");
            expect(usersInDb[1].username).toBe("seed2");
        });
    });

    describe("getCachedUsers", () => {
        it("should return all users from the database", async () => {
            const usersToSeed: UserDTO[] = [
                { username: "get1", email: "get1@example.com", password: "p1" },
                { username: "get2", email: "get2@example.com", password: "p2" },
            ];
            await seedDb(usersToSeed);

            const users = (await getCachedUsers()) || [];
            expect(users.length).toBe(2);
            expect(users[0].username).toBe("get1");
            expect(users[1].username).toBe("get2");
        });

        it("should return an empty array if no users exist", async () => {
            const users = await getCachedUsers();
            expect(users).toEqual([]);
        });
    });
});
