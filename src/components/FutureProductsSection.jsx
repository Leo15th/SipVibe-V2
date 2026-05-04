import SectionHeader from "./SectionHeader"
import ImageCard from "./ImageCard"
export default function FutureProductsSection(){
    const images = import.meta.glob("../assets/futureProducts/*{jpg,jpeg,png}", {eager:true});
    const futureProducts = Object.keys(images).map((path)=>{
        const fileName = path.split("/").pop().split(".")[0];
        return {
            title: fileName,
            image: images[path].default
        }
    })
    return(
        <div className="bg-slate-900 py-10 px-5 md:py-14 md:px-10 lg:py-20 lg:px-20">
            <SectionHeader 
            header = "Future Products"
            p = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, maxime."/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {
                    futureProducts.map((futureProduct, index)=>
                    <ImageCard key={index} title={futureProduct.title}
                    image={futureProduct.image}/>
                    )
                }
            </div>
        </div>
    )
}