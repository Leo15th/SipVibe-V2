import { useRef, useEffect, useState } from "react"
import Button from "./Button"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useLocation } from "react-router-dom"
export default function MobileMenu({links, toggleMobileMenu, logInClick, registerClick, user, onLogout}){
    const mobileMenuBoxRef = useRef(null)
    const [boxWidth, setBoxWidth] = useState(0)
    const location = useLocation();
    useEffect(()=>{
        if(mobileMenuBoxRef.current && toggleMobileMenu){
            setBoxWidth(mobileMenuBoxRef.current.offsetWidth)
        }
    }, [toggleMobileMenu])
    return(
        <div ref={mobileMenuBoxRef} className={`lg:hidden fixed z-40 w-2/5 top-[72px] right-0 border-t-0 border-r-0 border border-white/30 rounded-bl-2xl p-8 bg-black/90 transform transition-transform duration-300 ${!toggleMobileMenu ? "translate-x-full" : "translate-x-0"}`}>
            <ul className="text-white flex flex-col justify-center gap-4">
                {
                    links.map((link, index)=>(
                        <li key={index} className="bg-white text-black font-bold capitalize text-lg py-1 rounded-lg text-center hover:scale-110 hover:cursor-pointer hover:my-1 hover:bg-slate-300/40 hover:text-white hover:black-text-shadow-sm">
                            <ScrollLink to={link} smooth={true} duration={500}>
                                {link} 
                            </ScrollLink>
                        </li>
                    ))
                }
                {user?(
                    <>
                        <button 
                        onClick={onLogout} 
                        className="text-lg px-2 py-1 lg:px-3 lg:py-1 font-bold capitalize bg-slate-400/20 border border-white/30 rounded-lg hover:scale-110 hover:border-2 hover:border-red-500 hover:bg-red-700/40 hover:black-text-shadow-sm w-full hover:my-1 text-white"
                        >
                            Logout
                        </button>
                    </>
                ):(
                    <>
                        <Button onClickListener={logInClick} btnName="Log In"/>
                        <Button onClickListener={registerClick} btnName="Register"/>
                    </>
                )}
            </ul>
        </div>
    )
}