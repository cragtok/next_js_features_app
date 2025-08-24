export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

const API_BASE_URL = "/route-handlers/my-api";

export async function fetchAllUsers(): Promise<User[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
}

export async function updateUser(user: User): Promise<User> {
    const updatedFields = {
        username: user.username,
        email: user.email,
        password: user.password,
    };

    const response = await fetch(`${API_BASE_URL}/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
}

export async function deleteUser(userId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
