import LogoutButton from "@/components/LogoutButton";
import MainDashboard from "@/components/MainDashboard";
import { fetchTasks } from "@/lib/fetchTasks";


export interface TaskType {
    task_id: string;
    task_name: string;
    task_priority_id: number;
    task_status_id: number;
}

export default async function dashboard(){
    const tasks = await fetchTasks()

    return(
        <div className="relative w-full h-screen flex flex-col">
            <header>
                <nav className="flex justify-between h-[100px] border-b border-black bg-slate-400 items-center gap-5 px-4">
                    <h1 className="font-mono text-2xl font-bold">Task Manager - Dashboard</h1>
                    <LogoutButton/>
                </nav>
            </header>
            <MainDashboard initialTasks={tasks} />
        </div>
    )
}