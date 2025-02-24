'use server'

import { fetchTasks } from "@/lib/fetchTasks"

export default async function getTasks(){
    return await fetchTasks()
}