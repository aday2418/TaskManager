'use client'

import { createTask } from "@/actions/createTask"
import Task from "./Task"
import { TaskType } from "@/app/dashboard/page"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect} from "react";
import { updateTask } from "@/actions/updateTask"


export default function StatusColumn({bgColor, status, tasks, onTaskDrop, refreshTasks}: {bgColor: string, status: number, tasks: TaskType[], onTaskDrop:(taskID: string, newStatus: number) => void, refreshTasks: ()=>void}){
    const router = useRouter()

    const [newTasks, setNewTasks] = useState<TaskType[]>([]);
    const taskListRef = useRef<HTMLDivElement>(null);

    const sortedTasks = tasks.sort((a, b) => b.task_priority_id - a.task_priority_id);


    const statusNames: Record<number, string> = {
        1: "To Do",
        2: "In Progress",
        3: "Completed"
    };

    useEffect(() => {
        if (taskListRef.current) {
            taskListRef.current.scrollTop = 0;
        }
    }, []);

    useEffect(() => {
        if (taskListRef.current && newTasks.length > 0) {
            taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
        }
    }, [newTasks]);

    const handleAddTask = () => {
        const newTask: TaskType = {
            task_id: `temp-${Date.now()}`, 
            task_name: "",
            task_priority_id: 1, 
            task_status_id: status, 
        };
        setNewTasks([newTask]);
    };

    const cancelTask = () => {
        setNewTasks([])
    }

    const handleCreateTask = async (taskName: string, taskPriority: number) => {
        const success = await createTask(taskName, taskPriority, status); 
        if (success) {
            console.log("Task Created Successfully")
            setNewTasks([]);
            router.refresh()
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); 
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const taskID = e.dataTransfer.getData("taskID");
        const prevStatus = Number(e.dataTransfer.getData("taskStatus"));

        if (!taskID || prevStatus === status) return;

        console.log(`Dropping Task ${taskID} into Column ${status}`);

        onTaskDrop(taskID, status);
    };

    return(
        <div className={`flex flex-col w-1/3 h-full ${bgColor} border border-black items-center justify-top px-8`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="py-10 text-3xl font-bold">
                {statusNames[status]}
            </div>
            <div ref={taskListRef} className="flex flex-col w-full overflow-y-auto max-h-[calc(100vh-150px)] gap-4">
                {sortedTasks.map((task) => (
                    <Task taskID={task.task_id} key={task.task_id} taskName={task.task_name} taskDescription={task.task_priority_id} taskStatus={task.task_status_id} />
                ))}
                {newTasks.map((task) => (
                    <Task key={task.task_id} taskID={task.task_id} taskName={task.task_name} taskDescription={task.task_priority_id} taskStatus={task.task_status_id} isNew={true} onCreate={handleCreateTask} cancelTask={cancelTask} refreshTasks={refreshTasks}/>
                ))}
                
            </div>
            <div className="p-4">
                <button className="w-12 h-12 bg-gray-300 hover:bg-gray-400 border border-black text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-sm mx-auto" onClick={handleAddTask}>
                    +
                </button>
            </div> 
        </div>
    )
}
