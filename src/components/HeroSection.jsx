export default function HeroSection(){
    return (
        <section className="h-screen bg-hero bg-cover bg-center flex justify-center items-center">
            <div className="border border-white/50 text-white p-20 flex flex-col gap-10 w-3/5 rounded-3xl backdrop-blur-sm hover:shadow-lg hover:shadow-white/90">
                <h2 className="text-5xl font-bold white-text-shadow-lg">Welcome to Sip Vibe</h2>
                <p className="text-lg white-text-shadow-md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet quibusdam adipisci neque voluptatem veniam alias modi esse, molestias sint, vitae officia, necessitatibus libero explicabo!</p>
                <button className="border border-white/60 rounded-lg w-fit mx-auto px-6 py-2 text-lg font-bold hover:scale-110 hover:border-[4px] hover:border-amber-400/95 hover:shadow-lg hover:shadow-amber-400/40">Explore Menu</button>
            </div>
        </section>
    )
}