import { useState, useEffect } from "react"
import Button from "./Button"
import MobileMenu from "./MobileMenu"
import { Link } from "react-scroll"
export default function NavBar({links, shopName, logInClick, registerClick}){
    const [scrolled, setScrolled] = useState(false);
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
        <nav className={`fixed left-0 right-0 top-0 z-40 flex justify-between items-center backdrop-blur-sm ${scrolled ? "border-b bg-black/70" : "bg-transparent"} border-b-white/30 px-10 py-4 h-[72px]`}>
            <h3 className="text-2xl md:text-3xl lg:text-3xl font-extrabold underline text-white hover:gold-text-shadow-md cursor-pointer font-mono hover:scale-105"><Link to="home" smooth={true} duration={500} offset={-72}>{shopName}</Link></h3>
            <div className="lg:hidden">
            <i onClick={()=>setToggleMobileMenu(!toggleMobileMenu)} className={`text-2xl text-white hover:black-text-shadow-md hover:cursor-pointer fa-solid ${!toggleMobileMenu ? "fa-bars": "fa-xmark"}`}></i>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-white">
            <ul className="flex items-center gap-8 text-lg">
                {
                    links.map((link, index)=>(
                        <li key={index} className="capitalize text-lg cursor-pointer hover:scale-125 hover:mx-1 hover:gold-text-shadow-sm">
                            <Link
                                to={link.toLowerCase().replace(/\s+/g, "-")}
                                smooth={true}
                                duration={500}
                                offset={-72}
                            >
                                {link}
                            </Link>
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
        </nav>
    )
}