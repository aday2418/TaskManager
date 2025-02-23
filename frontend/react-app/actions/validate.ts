'use server'

import { cookies } from "next/headers";

export default async function validate(): Promise<{data: string | null, error: string | null}>{
    try{

        const token = (await cookies()).get("access_token")?.value;

        const response = await fetch("http://localhost:8000/auth/validate", {
            method: "GET",
            headers: { 
                "Cookie": `access_token=${token}`
            },
            credentials: "include", 
        });

        console.log("Response Headers:", [...response.headers.entries()]);

        const data = await response.json() as string;
        if (!response.ok) 
            throw new Error(JSON.stringify(data));
            return {data, error: null}; 
    }catch(error: any){
        console.error("Error Validating Auth Token:", error.message);
        return {data: null, error: error.message }
    }
    
    
}