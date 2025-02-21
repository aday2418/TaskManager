import type { Route } from "./+types/home";
import LoginRow from "~/components/LoginRow";
import { useState } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Manager" },
    { name: "description", content: "Keep Track Of All Your Tasks!" },
  ];
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
    //Add authentication here + route to dashboard after
  };

  return (
    <div>
      <div className="relative w-full h-screen flex flex-col bg-gray-900">
        <header>
          <nav className='flex flex-row h-[100px] border-b border-black bg-red-200 items-center gap-5'>
            <div className='flex flex-row m-4 font-mono text-2xl font-bold'>
              <h1>Task Manager</h1>
            </div>
          </nav>
        </header>
        <div className='flex flex-col h-full bg-white items-center justify-center gap-10'>
          <h1 className='text-7xl '>Welcome To Task Manager</h1>
          <div className='flex flex-col items-center justify-center gap-4 '>
            <div className='flex flex-col max-w-[320px]  gap-2'>
              <LoginRow name="Username" textType="text" variable={username} functionName={setUsername}/>
              <LoginRow name="Password" textType="password" variable={password} functionName={setPassword}/>
            </div>
            <div className='flex flex-col  items-center gap-4 justify-center max-w-[1100px]'>
              <div className="flex flex-row gap-2 ">
                <button className='flex min-w-[130px] bg-red-200 border rounded-md border-black justify-center px-4' onClick={handleLogin}>Login</button>
                <button className='flex min-w-[130px] bg-red-200 border rounded-md border-black justify-center px-4'>Create Account </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
            
    </div>
  );
}
