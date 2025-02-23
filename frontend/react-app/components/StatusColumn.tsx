import Task from "./Task"

export default function StatusColumn({bgColor, columnName}: {bgColor: string, columnName: string}){
    console.log(bgColor)
    return(
        <div className={`flex flex-col w-1/3 h-full ${bgColor} border border-black items-center justify-top px-8`}>
            <div className="py-10 text-3xl font-bold">
                {columnName}
            </div>
            <div className="flex flex-col w-full overflow-y-auto max-h-[calc(100vh-150px)] gap-4">
                <Task taskName="Task1" taskDescription="Finish this task" />
                <Task taskName="Task2" taskDescription="Finish this task too" />
                
            </div>
            <div className="p-4">
                <button className="w-12 h-12 bg-gray-300 hover:bg-gray-400 border border-black text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-sm mx-auto">
                    +
                </button>
            </div>
                
                
            
            
            
        </div>
    )
}
