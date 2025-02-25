'use server'

export default async function register(username: string, password: string): Promise<{data: string | null, error: string | null}> {
    try {
        const response = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json() as string;
        if (!response.ok) 
            throw new Error(JSON.stringify(data));

        return {data, error: null}; 
    } catch (error: any) {
        return {data: null, error: error.message }
    }
}