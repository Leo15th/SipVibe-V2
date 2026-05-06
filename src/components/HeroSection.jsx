import Button from "./Button"
import { Navigate, useNavigate } from "react-router-dom"
export default function HeroSection(){
    const navigate = useNavigate();
    return(
        <div className="bg-hero bg-cover bg-left-top lg:bg-center pt-32 py-20 px-10 md:px-0 md:pt-32 md:py-24 lg:pt-40 lg:py-32">
            <div className="text-white border border-white/50 rounded-2xl py-10 px-10 lg:py-20 lg:px-20 w-fit md:w-4/5 lg:w-3/5 flex flex-col gap-8 backdrop-blur-md hover:shadow-md lg:hover:shadow-lg hover:shadow-white mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold font-serif white-text-shadow-md">Welcome to Sip Vibe</h2>
                <p className="text-md lg:text-lg white-text-shadow-sm">
                    Your ultimate destination for refreshing beverages and delightful
                    treats. Explore our menu and find your perfect sip today!
                </p>
                <Button 
                btnName="Explore Menu"
                onClickListener={()=> navigate("/menu")}/>
            </div>
        </div>
    )
}