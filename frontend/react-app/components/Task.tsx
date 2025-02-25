'use client'

import { deleteTask } from "@/actions/deleteTask";
import { useState, useRef, useEffect } from "react";
import { updateTask } from "@/actions/updateTask";

export default function Task({taskName, taskDescription, taskID, taskStatus, isNew=false, onCreate, cancelTask, refreshTasks}: {taskName: string, taskDescription: number, taskID: string, taskStatus: number, isNew?: boolean, onCreate?: (taskName: string, taskPriority: number)=>void, cancelTask?: ()=>void, refreshTasks: ()=>void}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(isNew);
    const [editedName, setEditedName] = useState(taskName);
    const [editedPriority, setEditedPriority] = useState<number>(taskDescription);
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    const priorityColor: Record<number,string> = {
        1: "bg-green-200",  
        2: "bg-yellow-200", 
        3: "bg-red-300"    
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async () => {
        setIsDropdownOpen(false); 
        const success = await deleteTask(taskID);
        if (success) {
            refreshTasks()
        }
    };

    const handleSave = async () => {
        setIsEditing(false);
        if (isNew && onCreate) {
            onCreate(editedName, editedPriority);
            refreshTasks()
        }else{
            const success = await updateTask(taskID, editedName, editedPriority, taskStatus);
            if (success) {
                refreshTasks()
            }
        }
    };
    const handleCancel = async () => { 
        cancelTask && cancelTask()
    };


    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("taskID", taskID);
        e.dataTransfer.setData("taskStatus", taskStatus.toString());
    };

    return (
        <div className={`cursor-grab active:cursor-grabbing relative flex flex-col w-full h-fit border border-black rounded-lg ${priorityColor[taskDescription]} p-4`} draggable={!isEditing} onDragStart={handleDragStart}>
            <div className="flex justify-between items-start w-full">
                <div className="flex flex-col w-3/4">
                    {isEditing ? (<input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="border border-black rounded px-2 py-1 w-full"/>) : (<div className="text-xl font-bold">{taskName}</div>)}
                    
                    {isEditing ? (
                        <select value={editedPriority} onChange={(e) => setEditedPriority(Number(e.target.value))} className="border border-black rounded px-2 py-1 w-full mt-2">
                            <option value={1}>Low</option>
                            <option value={2}>Normal</option>
                            <option value={3}>Urgent</option>
                        </select>
                    ) : (<div className="mt-2">Priority: {["Low", "Normal", "URGENT"][taskDescription - 1]}</div>)}
                </div>
                {isEditing ? (
                    <div className="flex flex-col gap-1">
                        <button className="text-xl font-bold px-2 cursor-pointer bg-green-500 text-white rounded px-3 py-1" onClick={handleSave}>
                            Save
                        </button>
                        <button className="text-xl font-bold px-2 cursor-pointer bg-red-500 text-white rounded px-3 py-1" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (<button className="text-xl font-bold px-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>...</button>)}
            </div>
            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-2 w-32">
                    <button className="w-full px-4 rounded my-1 border bg-white border-black text-left hover:bg-gray-200" onClick={() => {setIsDropdownOpen(false); setIsEditing(true);}}>
                        Edit Task
                    </button>
                    <button className="w-full px-4 rounded border bg-white border-black text-left hover:bg-gray-200" onClick={handleDelete}>
                        Delete Task
                    </button>
                </div>
            )}
        </div>
    );
}