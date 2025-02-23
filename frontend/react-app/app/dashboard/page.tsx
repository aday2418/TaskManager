import StatusColumn from "@/components/StatusColumn";

export default function dashboard(){
    const buttonStyle = "flex min-w-[130px] bg-blue-200 border rounded-md border-black justify-center px-4";

    return(
        <div className="relative w-full h-screen flex flex-col">
            <header>
                <nav className="flex justify-between h-[100px] border-b border-black bg-red-200 items-center gap-5 px-4">
                    <h1 className="font-mono text-2xl font-bold">Task Manager - Dashboard</h1>
                    <button className={buttonStyle} type="button" >Logout</button>
                </nav>
            </header>
            <div className="flex h-full w-full bg-gray-500">
                <StatusColumn columnName="TO DO" bgColor="bg-blue-300"/>
                <StatusColumn columnName="IN PROGRESS" bgColor="bg-yellow-300"/>
                <StatusColumn columnName="COMPLETED" bgColor="bg-green-300"/>
            </div>
            
        </div>
    )
}