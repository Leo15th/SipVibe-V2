import SectionHeader from "./SectionHeader"
export default function FooterSection({links}){
    const socialIcons = [
        {iconClass: "fa-brands fa-facebook"},
        {iconClass: "fa-brands fa-instagram"},
        {iconClass: "fa-brands fa-twitter"}
    ]
    return(
        <section className="bg-black grid grid-cols-3 py-8 px-20 text-white gap-10">
            <div>
                <h3 className="text-3xl font-bold mb-4">Sip Vibe</h3>
                <p className="text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui necessitatibus rem doloribus.</p>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                <ul className="flex flex-col gap-2">
                    {
                        links.map((link, index)=>(
                            <li key={index} className="text-md hover:scale-105 hover:text-amber-400 hover:cursor-pointer hover:scale-125 w-fit">{link}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                <div className="flex flex-col gap-4">
                    <p><b>Email:</b>info@sipvibe.com</p>
                    <p><b>Phone:</b>+66949407681</p>
                    <div className="flex flex-wrap gap-5">
                        {
                            socialIcons.map((socialIcon, index)=>(
                                <i key={index} className={`text-xl hover:cursor-pointer hover:text-amber-400 hover:scale-125 ${socialIcon.iconClass}`}></i>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}