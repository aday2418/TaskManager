'use client'

import { TaskType } from "@/app/dashboard/page";
import StatusColumn from "./StatusColumn";
import { updateTask } from "@/actions/updateTask";
import { useState } from "react";
import getTasks from "@/actions/getTasks";



export default function MainDashboard({ initialTasks }:{initialTasks: TaskType[]}){
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

    const handleTaskDrop = async (taskID: string, newStatus: number) => {
        const draggedTask = tasks.find(task => task.task_id === taskID);
        if (!draggedTask) return;

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.task_id === taskID ? { ...task, task_status_id: newStatus } : task
            )
        );

        await updateTask(taskID, draggedTask.task_name, draggedTask.task_priority_id, newStatus);
        refreshTasks()
    };

    const refreshTasks = async () => {
        const tasks = await getTasks()
        setTasks(tasks)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return(
        <div className="flex h-[calc(100vh-100px)] w-full bg-gray-500" onDragOver={handleDragOver}>
            <StatusColumn status={1} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 1)} onTaskDrop={handleTaskDrop} refreshTasks={refreshTasks}/>
            <StatusColumn status={2} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 2)} onTaskDrop={handleTaskDrop} refreshTasks={refreshTasks}/>
            <StatusColumn status={3} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 3)} onTaskDrop={handleTaskDrop} refreshTasks={refreshTasks}/>
        </div>
    )
}