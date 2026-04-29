export default function ImageCard({title, image}){
    return(
        <div className="relative rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-white cursor-pointer hover:scale-105"> 
            <img src={image} alt={title} className="aspect-[3/4] w-full h-full object-cover object-center"/>
            <h2 className="absolute bottom-0 left-0 right-0 text-amber-400 bg-black/80 px-4 py-2 capitalize text-xl font-bold">{title}</h2>
        </div>
    )
}