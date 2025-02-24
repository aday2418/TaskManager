'use client'

import { deleteTask } from "@/actions/deleteTask";
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Task({taskName, taskDescription, taskID}: {taskName: string, taskDescription: string, taskID: string}){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async () => {
        setDropdownOpen(false); 
        const success = await deleteTask(taskID);
        if (success) {
            console.log("Deleted Task")
            router.refresh() 
        }
    };

    return (
        <div className="relative flex flex-col w-full h-fit border border-black rounded-lg bg-gray-100 p-4">
            <div className="flex justify-between w-full items-center">
                <div className="text-xl font-bold">{taskName}</div>
                <button className="text-xl font-bold px-2 cursor-pointer" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    ...
                </button>
            </div>

            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-2 w-32">
                    <button className="w-full px-4 rounded my-1 border bg-white border-black text-left hover:bg-gray-200" onClick={() => {setDropdownOpen(false);}}>
                        Edit Task
                    </button>
                    <button className="w-full px-4 rounded border bg-white border-black text-left hover:bg-gray-200" onClick={handleDelete}>
                        Delete Task
                    </button>
                </div>
            )}

            <div className="mt-2">{taskDescription}</div>
        </div>
    )
}