import {doc, setDoc} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import Button from "./Button";
export default function RegisterForm({onClose, onSwitchToLogIn, setUser}){
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const validatePassword = (password, confirmPassword)=>{
        if(password !== confirmPassword){
            alert("Password do not match!")
            return false;
        }
        return true;
    }
    const [loading, setLoading] = useState(false)
    const handleRegister = async (e)=>{
        e.preventDefault();
        if(!validatePassword(formData.password, formData.confirmPassword)) return;
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid),{
                fullName: formData.fullName,
                email: formData.email,
                createdAt: new Date(),
            });
            await sendEmailVerification(user);
            alert("Registration Successful!")
            setUser(user)
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false)
        }
    }
    return(
        <form onSubmit={handleRegister} className="border p-10 flex flex-col gap-6 backdrop-blur-xl rounded-2xl pt-24 relative">
            <div className="absolute top-0 left-0 right-0">
                <h3 className="text-4xl font-mono font-extrabold bg-red-600 w-fit mx-auto px-2 py-1 rounded-b-xl">Register</h3>
            </div>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} disabled={loading} placeholder="Name" className="px-2 py-1 outline-none bg-transparent border border-white/40 rounded-lg text-lg"/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={loading} placeholder="Email" className="px-2 py-1 outline-none bg-transparent border border-white/40 rounded-lg text-lg"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} disabled={loading} placeholder="Password" className="px-2 py-1 outline-none bg-transparent border border-white/40 rounded-lg text-lg"/>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} disabled={loading} placeholder="Confirm Password" className="px-2 py-1 outline-none bg-transparent border border-white/40 rounded-lg text-lg"/>
            <div className="w-1/2 mx-auto">
            <Button type="submit" btnName={loading?"Registering": "Register"} disabled={loading}/></div>
            <div className="flex gap-2 text-md">
                <p className="capitalize">do you have an account?</p>
                <button onClick={onSwitchToLogIn} className="text-green-600 duration-500 transition-transform hover:animate-bounce hover:white-text-shadow-sm">Log In Here</button>
            </div>
            <div className="z-20 absolute right-0 top-0 px-3">
                <button onClick={onClose} className="text-4xl hover:scale-110 hover:text-red-600 hover:cursor-pointer hover:font-bold hover:white-text-shadow-sm"> × </button>
            </div>
        </form>
    )
}