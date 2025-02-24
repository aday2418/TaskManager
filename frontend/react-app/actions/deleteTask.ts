'use server'

import { cookies } from "next/headers";

export async function deleteTask(taskId: string): Promise<boolean> {
    try {
        const token = (await cookies()).get("access_token")?.value;
        const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: "DELETE",
            headers: { 
                "Cookie": `access_token=${token}`
            },
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to delete task");

        return true; 
    } catch (error) {
        console.error("Error Deleting Task:", error);
        return false; 
    }
}