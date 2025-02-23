
import { useState } from 'react';
import { useNavigate } from "react-router";
import LoginRow from "~/components/LoginRow";

export default function login(){
  const buttonStyle = "flex min-w-[130px] bg-red-200 border rounded-md border-black justify-center px-4";

  let navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (newUser: string) => {
    setUsername(newUser)
  }

  const changePassword = (newPass: string) => {
    setPassword(newPass)
  }

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault(); 
    console.log("In Login");

    try {
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }), 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Login Failed");
        }

        console.log("User Logged In", data);
        //Need to add middleware here to redirect back if they don't have an auth token
        navigate("/", { replace: true });
        
    } catch (error) {
        console.error("Error logging in:", error);
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault(); 
    console.log("In Register")
    console.log(username,password)

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password }) 
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      console.log("User Registered:", data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-gray-900">
      <header>
        <nav className="flex h-[100px] border-b border-black bg-red-200 items-center gap-5 px-4">
          <h1 className="font-mono text-2xl font-bold">Task Manager</h1>
        </nav>
      </header>
      <div className="flex flex-col h-full bg-white items-center justify-center gap-10">
        <h1 className="text-7xl">Welcome To Task Manager</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col max-w-[320px] gap-2">
            <LoginRow name="Username" textType="text" variable={username} functionName={changeUsername} />
            <LoginRow name="Password" textType="password" variable={password} functionName={changePassword} />
          </div>
          <div className="flex flex-row gap-2">
            <button className={buttonStyle} onClick={handleLogin}>Login</button>
            <button className={buttonStyle} onClick={handleRegister}>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
/*

            ;*/