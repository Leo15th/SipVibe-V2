import Button from "./Button"
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
export default function LogInForm({onClose, onSwitchToRegister}){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            )
            const user = userCredential.user;
            if(!user.emailVerified){
                alert("!!Please Verify Your Email First Before Logging In")
                return
            }
            alert("Log In Successful!")
            onClose();
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false)
        }
    }
    return(
        <form onSubmit={handleLogin} className="border p-10 flex flex-col gap-6 backdrop-blur-xl rounded-2xl pt-24 relative">
            <div className="absolute top-0 left-0 right-0">
                <h3 className="text-4xl font-mono font-extrabold bg-red-600 w-fit mx-auto px-2 py-1 rounded-b-xl">Log In</h3>
                </div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="px-2 py-1 outline-none bg-transparent border border-white/40 rounded-lg text-lg"/>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="px-2 py-1 outline-none bg-transparent border border-white/40 rounded-lg text-lg"/>
            <div className="flex justify-between items-center">                
                <div className="flex items-center gap-2 py-1 text-md">
                    <input type="checkbox"/>
                    <span>Remember Me</span>
                </div>
                <a href="" className="text-md text-amber-400 hover:scale-110">Forgot Password?</a>
            </div>
            <div className="w-1/2 mx-auto"><Button type="submit" btnName={loading?"Loging In": "Log In"} disabled={loading}/></div>
            <div className="flex gap-2 text-md">
                <p className="capitalize">you don't have an account?</p>
                <button  onClick={onSwitchToRegister} className="text-green-600 duration-500 transition-transform hover:animate-bounce hover:white-text-shadow-sm">Register Here</button>
            </div>
            <div className="z-20 absolute right-0 top-0 px-3">
                <button onClick={onClose} className="text-4xl hover:scale-110 hover:text-red-600 hover:cursor-pointer hover:font-bold hover:white-text-shadow-sm"> × </button>
            </div>
        </form>
    )
}