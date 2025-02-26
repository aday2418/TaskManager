'use client'

import { useState} from 'react';
import { useRouter } from 'next/navigation'
import register from "../actions/register";
import LoginRow from "../components/LoginRow";
import login from '../lib/login';
import LoginButton from '@/components/LoginButton';

export default function Login(){
  const router = useRouter()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changeUsername = (newUser: string) => {
    setUsername(newUser)
  };

  const changePassword = (newPass: string) => {
    setPassword(newPass)
  };

  const handleRegister = async () => {
    setSuccess(null)
    setError(null);
    const { data, error } = await register(username, password);
    if(data) { 
      setSuccess("User Registered Succesfully, Please Log In")
    } else {
      printError(error)
    }
  };

  const handleLogin = async () => {
    setSuccess(null)
    setError(null);
    const { data, error } = await login(username, password);
    if(data) { 
      router.push('/dashboard')
    } else {
      printError(error)
    }
  };

  const printError = (error: string | null) => {
    setUsername('')
    setPassword('')
    setError(error);
  }

  return (
    <div className="relative w-full h-screen flex flex-col">
      <header>
        <nav className="flex h-[100px] border-b border-black bg-slate-400 items-center gap-5 px-4">
          <h1 className="font-mono text-2xl font-bold">Task Manager</h1>
        </nav>
      </header>
      <div className="flex flex-col h-full bg-white items-center justify-center gap-10">
        <h1 className="text-7xl">Welcome To Task Manager</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col max-w-[320px] gap-2">
            <LoginRow name="Username" textType="text" variable={username} onChange={changeUsername} />
            <LoginRow name="Password" textType="password" variable={password} onChange={changePassword} />
          </div>
          <div className="flex flex-row gap-2">
            <LoginButton buttonName={"Login"} onClick={handleLogin}/>
            <LoginButton buttonName={"Create Account"} onClick={handleRegister}/>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>
    </div>
  );
  
}
