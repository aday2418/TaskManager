export default function LoginButton({buttonName, onClick}:{buttonName: string, onClick: ()=>void}){
    return ( <button className={"flex min-w-[130px] bg-slate-400 border rounded-md border-black justify-center px-4"} type="button" onClick={onClick}>{buttonName}</button>)
}