import { useState } from "react";

export default function Test() {
    const [LogIn , setLogIn] = useState(false)
    function handleEventFunction(){
        setLogIn(!LogIn)
    }
  return (
    <div>
        <button onClick={handleEventFunction} className="border-4 border-black rounded-lg">
            {LogIn ? "WelcomeBack":"LogIN"}
        </button>
    </div>
  );
}