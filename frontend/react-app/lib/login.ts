
//This has to stay client-side to recieve the authcookie
export default async function login(username: string, password: string) : Promise<{data: string | null, error: string | null}> {
    try {
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        });

        const data = await response.json() as string;
        if (!response.ok) 
            throw new Error(JSON.stringify(data));

        return {data, error: null}; 

    } catch (error: any) {
        const response = JSON.parse(error.message)
        return {data: null, error: response.detail }
    }
}

