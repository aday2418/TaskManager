export default function Task({taskName, taskDescription}: {taskName: string, taskDescription: string}){
    return(
        <div className={`flex flex-col w-full h-fit  border border-black rounded-lg bg-gray-100 items-center justify-center gap-2`}>
            <div className="text-xl font-bold">
                {taskName}
            </div>
            <div>
                {taskDescription}
            </div>
        </div>
    )
}