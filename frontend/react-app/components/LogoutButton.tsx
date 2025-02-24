'use client'

import logout from "@/actions/logout"
import { useRouter } from "next/navigation"

export default function LogoutButton(){
    const router = useRouter()
    
    const handleLogout = () => {
        logout()
        router.refresh()
    }

    return(
        <button className={"flex min-w-[130px] bg-red-500 border border-2 rounded-md border-black justify-center font-bold px-4"} type="button" onClick={handleLogout}>
            Logout
        </button>
    )
}