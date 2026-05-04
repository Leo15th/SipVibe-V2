import { useState, useEffect } from "react"
import Button from "./Button"
import MobileMenu from "./MobileMenu"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useLocation } from "react-router-dom"
export default function NavBar({links, shopName, logInClick, registerClick, user, onLogout}){
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        const handleScroll = ()=> {
            setScrolled(window.scrollY>50)
        };

        window.addEventListener("scroll", handleScroll)

        return() =>{
            window.removeEventListener("scroll", handleScroll)
        }
    } , [])
    const [toggleMobileMenu, setToggleMobileMenu] = useState(false)
    return(
        <nav className={`fixed left-0 right-0 top-0 z-40 flex justify-between items-center backdrop-blur-sm ${scrolled ? "border-b bg-black/70" : "bg-black"} border-b-white/30 px-10 py-4 h-[72px]`}>
            {user?
            (
                <>
                    <h3 className="text-xl font-extrabold underline text-white hover:gold-text-shadow-md cursor-pointer font-mono hover:scale-105">{user.displayName|| user.email}</h3>
                    <div className="flex items-center gap-4">
                        <i className="fa-solid fa-cart-shopping text-white text-2xl"></i>
                        <button 
                        onClick={onLogout} 
                        className="text-lg px-2 py-1 lg:px-3 lg:py-1 font-bold capitalize bg-slate-400/20 border border-white/30 rounded-lg hover:scale-110 hover:border-2 hover:border-red-500 hover:bg-red-700/40 hover:black-text-shadow-sm w-full hover:my-1 text-white"
                        >
                            Logout
                        </button>
                    </div>
                </>
            ):(
                <>
                    <h3 className="text-2xl md:text-3xl lg:text-3xl font-extrabold underline text-white hover:gold-text-shadow-md cursor-pointer font-mono hover:scale-105"><RouterLink to="home">{shopName}</RouterLink></h3>
                    <div className="lg:hidden">
                    <i onClick={()=>setToggleMobileMenu(!toggleMobileMenu)} className={`text-2xl text-white hover:black-text-shadow-md hover:cursor-pointer fa-solid ${!toggleMobileMenu ? "fa-bars": "fa-xmark"}`}></i>
                    </div>
                    <div className="hidden lg:flex items-center gap-8 text-white">
                    <ul className="flex items-center gap-8 text-lg">
                        {
                            links.map((link, index)=>(
                                <li key={index} className="capitalize text-lg cursor-pointer hover:scale-125 hover:mx-1 hover:gold-text-shadow-sm">
                                    {/* ✅ If we are on Home page, use react-scroll to jump to sections */}
                                    {location.pathname === "/" ? (
                                        <ScrollLink
                                        to={link.toLowerCase().replace(/\s+/g, "-")}
                                        smooth={true}
                                        duration={500}
                                        offset={-72}
                                        >
                                        {link}
                                        </ScrollLink>
                                    ) : (
                                        /* ✅ If we are on another page, just route back to Home */
                                        <RouterLink to="/">{link}</RouterLink>
                                    )}
                                    </li>
                            ))
                        }
                    </ul>
                    <div className="flex items-center gap-8">
                        <Button onClickListener={logInClick} btnName="Log In"/>
                        <Button onClickListener={registerClick} btnName="Register"/>
                    </div>
                    </div>
                    <MobileMenu
                        links={links}
                        toggleMobileMenu={toggleMobileMenu}
                    />
                </>
            )}
        </nav>
    )
}