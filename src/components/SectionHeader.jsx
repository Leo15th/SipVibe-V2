export default function SectionHeader({header, p}){
    return(
        <div className="flex flex-col gap-8 text-white mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">{header}</h3>
            <p className="text-white sm:text-sm md:text-md lg:text-lg">{p}</p>
        </div>
    )
}