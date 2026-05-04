import { useState } from "react";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import Button from "./Button";

export default function Modal({mode, onClose, onSwitchMode}){
    return(
        <div className="fixed inset-0 z-50 bg-black/50 text-white flex justify-center items-center">
            {mode=== "login" && (
                <LogInForm onClose={onClose}
                onSwitchToRegister = {()=> onSwitchMode("register")}
                />)}
            {mode=== "register" && (<RegisterForm onClose={onClose}
                onSwitchToLogIn = {()=> onSwitchMode("login")}
                />)}
        </div>
    )
}