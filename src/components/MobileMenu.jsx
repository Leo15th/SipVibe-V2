import { useRef, useEffect, useState } from "react"
import Button from "./Button"
export default function MobileMenu({links, toggleMobileMenu}){
    const mobileMenuBoxRef = useRef(null)
    const [boxWidth, setBoxWidth] = useState(0)

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
                        <li key={index} className="bg-white text-black font-bold capitalize text-lg py-1 rounded-lg text-center hover:scale-110 hover:cursor-pointer hover:my-1 hover:bg-slate-300/40 hover:text-white hover:black-text-shadow-sm">{link}</li>
                    ))
                }
                <Button btnName="Log In"/>
                <Button btnName="Register"/>
            </ul>
        </div>
    )
}