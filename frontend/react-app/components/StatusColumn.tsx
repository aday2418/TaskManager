'use client'

import { createTask } from "@/actions/createTask"
import Task from "./Task"
import { TaskType } from "@/app/dashboard/page"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect} from "react";


export default function StatusColumn({bgColor, status, tasks, onTaskDrop, refreshTasks}: {bgColor: string, status: number, tasks: TaskType[], onTaskDrop:(taskID: string, newStatus: number) => void, refreshTasks: ()=>void}){
    const router = useRouter()

    const [newTask, setNewTask] = useState<TaskType | null>(null);
    const taskListRef = useRef<HTMLDivElement>(null);

    const sortedTasks = tasks.sort((a, b) => b.task_priority_id - a.task_priority_id);


    const statusNames: Record<number, string> = {
        1: "To Do",
        2: "In Progress",
        3: "Completed"
    };

    //This keeps task list scrolled to top when reloading page
    useEffect(() => {
        if (taskListRef.current) {
            taskListRef.current.scrollTop = 0;
        }
    }, []);

    //This scrolls to the bottom when adding new task
    useEffect(() => {
        if (taskListRef.current && newTask) {
            taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
        }
    }, [newTask]);

    const handleAddTask = () => {
        const newTask: TaskType = {
            task_id: `temp-${Date.now()}`, //Giving it a fake id until I actually create the task in db
            task_name: "",
            task_priority_id: 1, 
            task_status_id: status, 
        };
        setNewTask(newTask);
    };

    const cancelTask = () => {
        setNewTask(null)
    }

    const handleCreateTask = async (taskName: string, taskPriority: number) => {
        const success = await createTask(taskName, taskPriority, status); 
        if (success) {
            setNewTask(null);
            router.refresh()
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        console.log('dropped')
        const taskID = e.dataTransfer.getData("taskID");
        const prevStatus = Number(e.dataTransfer.getData("taskStatus"));

        if (!taskID || prevStatus === status) return;

        onTaskDrop(taskID, status);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return(
        <div className={`flex flex-col w-1/3 h-full ${bgColor} border border-black items-center justify-top px-8`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1 className="py-10 text-3xl font-bold">{statusNames[status]}</h1>
            <div ref={taskListRef} className="flex flex-col w-full overflow-y-auto max-h-[calc(100vh-150px)] gap-4">
                {sortedTasks.map((task) => (
                    <Task taskID={task.task_id} key={task.task_id} taskName={task.task_name} taskDescription={task.task_priority_id} taskStatus={task.task_status_id} refreshTasks={refreshTasks} />
                ))}
                {newTask && <Task key={newTask.task_id} taskID={newTask.task_id} taskName={newTask.task_name} taskDescription={newTask.task_priority_id} taskStatus={newTask.task_status_id} isNew={true} onCreate={handleCreateTask} cancelTask={cancelTask} refreshTasks={refreshTasks}/>}
            </div>
            <div className="p-4">
                <button className="w-12 h-12 bg-gray-300 hover:bg-gray-400 border border-black text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-sm mx-auto" onClick={handleAddTask}>+</button>
            </div> 
        </div>
    )
}
