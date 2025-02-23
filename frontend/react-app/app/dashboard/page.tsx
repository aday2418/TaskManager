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
            <div className="flex flex-col h-full bg-white items-center justify-center gap-10">
                <h1 className="text-7xl">Welcome To Task Manager</h1>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col max-w-[320px] gap-2"/>
                    <div className="flex flex-row gap-2">
                        <button className="" type="button" >Login</button>
                        <button className="{buttonStyle}" type="button" >Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}