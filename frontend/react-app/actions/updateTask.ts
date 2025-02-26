"use server";

import { cookies } from "next/headers";

export async function updateTask(taskId: string, taskName: string, taskPriority: number, taskStatus: number): Promise<boolean> {
    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) throw new Error("No auth token found");

        const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `access_token=${token}`
            },
            credentials: "include",
            body: JSON.stringify({
                task_name: taskName,
                task_priority_id: taskPriority,
                task_status_id: taskStatus
            }),
        });

        if (!response.ok) throw new Error("Failed to Update Task");

        return true; 
    } catch (error) {
        return false; 
    }
}