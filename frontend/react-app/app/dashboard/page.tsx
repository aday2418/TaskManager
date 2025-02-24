import StatusColumn from "@/components/StatusColumn";
import { fetchTasks } from "@/lib/fetchTasks";


export interface TaskType {
    task_id: string;
    task_name: string;
    task_priority_id: number;
    task_status_id: number;
}

export default async function dashboard(){
    const tasks = await fetchTasks()
    console.log(tasks)

    return(
        <div className="relative w-full h-screen flex flex-col">
            <header>
                <nav className="flex justify-between h-[100px] border-b border-black bg-slate-400 items-center gap-5 px-4">
                    <h1 className="font-mono text-2xl font-bold">Task Manager - Dashboard</h1>
                    <button className={"flex min-w-[130px] bg-red-500 border border-2 rounded-md border-black justify-center font-bold px-4"} type="button" >Logout</button>
                </nav>
            </header>
            <div className="flex h-[calc(100vh-100px)] w-full bg-gray-500">
                <StatusColumn status={1} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 1)}/>
                <StatusColumn status={2} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 2)}/>
                <StatusColumn status={3} bgColor="bg-gray-200" tasks={tasks.filter(task => task.task_status_id === 3)}/>
            </div>
            
        </div>
    )
}