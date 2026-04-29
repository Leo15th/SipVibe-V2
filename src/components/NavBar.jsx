import { useState, useEffect } from "react"
import PopupBoxContainer from "./PopupBoxContainer";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";

export default function NavBar({shopName, links}){
    const [showLogInForm, setShowLogInForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm]= useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(()=>{
        const handleScrolled = () =>{
            setScrolled(window.scrollY>50);
        }
        window.addEventListener("scroll",handleScrolled);
        return()=>{
            window.removeEventListener("scroll",handleScrolled)
        };
    },[])

    return(
        <nav className={`flex justify-between py-4 px-12 items-center fixed left-0 right-0 top-0 z-40 ${scrolled ? "bg-black/50 border-b-2 border-b-white/50" : "bg-transparent"}`}>
            <h2 className="text-3xl underline font-bold text-white cursor-pointer hover:text-amber-400/95 hover:text-[30px] hover:gold-text-shadow-sm hover:scale-105">{shopName}</h2>
            <div className="flex gap-5 items-center">
                <ul className="flex gap-5 items-center">
                    {
                        links.map((link, index)=> {
                            const path = link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;
                            return(                                
                                <li key={index}>
                                <Link
                                    to={path}
                                    className="text-xl font-bold text-white cursor-pointer hover:text-amber-400/95 hover:gold-text-shadow-sm hover:scale-110 hover:p-4">
                                    {link}
                                </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="flex gap-5 items-center">
                    <button onClick={()=> setShowLogInForm(true)} className="text-xl border border-white/60 rounded-lg font-bold px-3 py-1 text-white hover:border-amber-400/95 hover:border-[3px] hover:shadow-lg hover:shadow-amber-400/40 hover:scale-105 hover:bg-slate-500/50">Log In</button>
                    <button onClick={()=> setShowRegisterForm(true)} className="text-xl border border-white/60 rounded-lg font-bold px-3 py-1 text-white hover:border-amber-400/95 hover:border-[3px] hover:shadow-lg hover:shadow-amber-400/40 hover:scale-105 hover:bg-slate-500/50">Register</button>
                </div>
            </div>
            <PopupBoxContainer isOpen={showLogInForm} onClose={()=> setShowLogInForm(false)}>
                <LogInForm 
                    onClose = {()=>setShowLogInForm(false)}
                    onSwitchToRegister={()=>{
                        setShowLogInForm(false)
                        setShowRegisterForm(true)
                    }}
                />
            </PopupBoxContainer>
            <PopupBoxContainer isOpen={showRegisterForm} onClose={()=> setShowRegisterForm(false)}>
                <RegisterForm
                    onClose={()=>setShowRegisterForm(false)}
                    onSwitchToLogIn={()=>{
                        setShowRegisterForm(false)
                        setShowLogInForm(true)
                    }}
                />
            </PopupBoxContainer>
        </nav>
    )
}