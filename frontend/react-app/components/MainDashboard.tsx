'use client'

import { TaskType } from "@/app/dashboard/page";
import StatusColumn from "./StatusColumn";
import { updateTask } from "@/actions/updateTask";
import { useState } from "react";
import getTasks from "@/actions/getTasks";



export default function MainDashboard({ initialTasks }:{initialTasks: TaskType[]}){
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleTaskDrop = async (taskID: string, newStatus: number) => {
        console.log(`Updating Task ${taskID} to Status ${newStatus}`);

        const draggedTask = tasks.find(task => task.task_id === taskID);
        if (!draggedTask) {
            console.log("Task not found globally. Drop ignored.");
            return;
        }

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.task_id === taskID ? { ...task, task_status_id: newStatus } : task
            )
        
        );

        const success = await updateTask(taskID, draggedTask.task_name, draggedTask.task_priority_id, newStatus);
        if (!success) {
            console.log("Failed to update task. Reverting changes.");
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.task_id === taskID ? { ...task, task_status_id: draggedTask.task_status_id } : task
                )
            );

            refreshTasks()
        }
       
    };

    const refreshTasks = async () => {
        const tasks = await getTasks()
        setTasks(tasks)
    }

    return(
        <div className="flex h-[calc(100vh-100px)] w-full bg-gray-500" onDragOver={handleDragOver}>
            <StatusColumn status={1} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 1)} onTaskDrop={handleTaskDrop} refreshTasks={refreshTasks}/>
            <StatusColumn status={2} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 2)} onTaskDrop={handleTaskDrop} refreshTasks={refreshTasks}/>
            <StatusColumn status={3} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 3)} onTaskDrop={handleTaskDrop} refreshTasks={refreshTasks}/>
        </div>
    )
}