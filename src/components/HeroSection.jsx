import Button from "./Button"
export default function HeroSection(){
    return(
        <div className="h-screen bg-hero bg-fixed bg-cover lg:bg-center sm:bg-left flex justify-center items-center px-10 lg:px-20">
            <div className="text-white border border-white/50 rounded-2xl py-10 px-10 lg:py-20 lg:px-20 w-fit md:w-4/5 lg:w-3/5 flex flex-col gap-8 backdrop-blur-md hover:shadow-md lg:hover:shadow-lg hover:shadow-white">
                <h2 className="text-4xl lg:text-5xl font-bold font-serif white-text-shadow-md">Welcome to Sip Vibe</h2>
                <p className="text-md lg:text-lg white-text-shadow-sm">
                    Your ultimate destination for refreshing beverages and delightful
                    treats. Explore our menu and find your perfect sip today!
                </p>
                <Button 
                btnName="Explore Menu"/>
            </div>
        </div>
    )
}