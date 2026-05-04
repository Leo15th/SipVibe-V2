import SectionHeader from "./SectionHeader"
import ImageCard from "./ImageCard"
export default function CategorySection(){
    const images = import.meta.glob("../assets/category/*{jpg,png,jpeg}", {eager: true});
    const categories = Object.keys(images).map((path)=>{
        const fileName = path.split("/").pop().split(".")[0];
        //file name is like ../assets/category/smoothie.jpg and we split with split("/") is mean [assets, category , smoothie.jpg] and with pop() we got the return arr[smoothie.jpg] and we split again for dot split(".") and it will be like this [smoothie , jpg] and we take by index[0] for smoothie title
        return{
            title: fileName,
            image: images[path].default,
        }
    })
    return(
        <div className="py-10 px-5 md:py-14 md:px-10 lg:py-20 lg:px-20 bg-gray-800">
            <SectionHeader
            header="Sip Spotlight"
            p="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, hic."/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {categories.map((categoryItem, index)=>(
                    <ImageCard key={index} title={categoryItem.title} image={categoryItem.image}/>
                ))}
            </div>
        </div>
    )
}