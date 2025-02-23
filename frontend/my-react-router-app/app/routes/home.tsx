import { useEffect } from "react";
import type { Route } from "./+types/home";
import { redirect, useNavigate } from "react-router";
//import { parse } from "cookie";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Manager" },
    { name: "description", content: "Keep Track Of All Your Tasks!" },
  ];
}


export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  async function loader() {
    const response = await fetch("http://localhost:8000/auth/validate", {
    method: "GET",
    credentials: "include", // Allows cookies to be sent
    });
  
    if (!response.ok) {
      console.log("BAD RESPONSE", response)
      navigate("/login"); // Redirect if token is invalid
    }
  
    const data = await response.json();
    return { userId: data.userId };
  }

  useEffect(() => {
    console.log("calling on start")
    loader()
  }, [])
  return(
    <div>
    <div>Dashboard</div>
    <div>
      {loaderData?.userId ? (<div>Inner Content</div>): (<div>Other?</div>)}
     </div>
    </div>
  )
}
