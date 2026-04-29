export default function SectionHeader({title, subtitle}){
    return(
        <div className="text-white flex flex-col gap-10 mb-10">
                <h3 className="text-5xl black-text-shadow-md font-bold">{title}</h3>
                <p className="text-lg black-text-shadow-md">{subtitle}</p>
            </div>
    )
}