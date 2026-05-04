import { Link } from "react-scroll"
export default function FooterSection({links}){
    return(
        <div className="px-20 pt-10 pb-5 bg-black">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 text-white px-10 py-5">
                <div className="px-2 lg:px-5 mx-auto">
                    <h3 className="text-xl font-bold mb-3 gold-text-shadow-sm text-center">Sip Vibe</h3>
                    <p className="text-lg text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quasi!</p>
                </div>
                <div className="mx-auto">
                    <h3 className="text-xl font-bold mb-3 gold-text-shadow-sm text-center">Quick Links</h3>
                    <ul className="flex flex-col gap-2 items-start mx-auto w-fit">
                        {
                            links.map((link,index)=>(
                                <li className="capitalize hover:text-amber-400 hover:cursor-pointer hover:white-text-shadow-sm hover:scale-125 text-center" key={index}>
                                    <Link 
                                        to={link.toLowerCase().replace(/\s+/g, "-",)}
                                        smooth={true}
                                        duration={500}
                                        offset={-72}>{link}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="mx-auto sm:w-full md:col-span-1 sm:col-span-2 grid md:grid-cols-1 sm:grid-cols-2 items-center">
                    <div className="flex flex-col gap-2 md:items-center">
                        <h3 className="text-xl font-bold mb-3 gold-text-shadow-sm text-center">Contact</h3>
                        <p>
                            <b className="capitalize mr-2">email:</b>
                            <a href="mailto:pwaiag@2023@gmail.com?subject=Sip Vibe &body=Hello!, I'd like to order" className="hover:text-amber-500 hover: white-text-shadow-sm">pwaiag2023@@mail.com</a>
                        </p>
                        <p>
                            <b className="capitalize mr-2">phone:</b>
                            <a href="tel:+66949407681" className="hover:text-amber-500 hover: white-text-shadow-sm">Click to Call me</a>
                        </p>
                    </div>
                    <div className="flex justify-start sm:justify-center gap-4 text-xl mt-4">
                        <a href="#"><i className="fa-brands fa-facebook hover:text-amber-400 hover:white-text-shadow-sm hover:scale-125 hover:mx-1"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram hover:text-amber-400 hover:white-text-shadow-sm hover:scale-125 hover:mx-1"></i></a>
                        <a href="#"><i className="fa-brands fa-github hover:text-amber-400 hover:white-text-shadow-sm hover:scale-125 hover:mx-1"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin hover:text-amber-400 hover:white-text-shadow-sm hover:scale-125 hover:mx-1"></i></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/30 py-4">
                <p className="text-white text-center text-sm">© 2026 Sip Vibe.All rights reserved.</p>
            </div>
        </div>
    )
}