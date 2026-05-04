export default function ImageCard({image, title}){
    return(
        <div className="aspect-[3/4] relative rounded-3xl overflow-hidden hover:cursor-pointer shadow-lg hover:shadow-white transition-transform duration-500 hover:scale-105">
            <img src={image} alt="" className="w-full h-full object-cover object-center"/>
            <h3 className="text-xl lg:text-2xl font-bold capitalize absolute bottom-0 py-2 px-6 text-white bg-black/80 left-0 right-0">{title}</h3>
        </div>
    )
}