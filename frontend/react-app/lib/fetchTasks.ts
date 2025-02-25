import { TaskType } from "@/app/dashboard/page";
import { cookies } from "next/headers";


export async function fetchTasks(): Promise<TaskType[]> { 
    try {
        const token = (await cookies()).get("access_token")?.value;
        const response = await fetch("http://localhost:8000/tasks", {
            method: "GET",
            headers: { 
                "Cookie": `access_token=${token}`
            },
            credentials: "include", 
        });

        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json() as { tasks: TaskType[]};
        return data.tasks
    } catch (error: any ) {
        return []
    }
}