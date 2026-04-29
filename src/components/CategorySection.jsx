import boba from "../assets/category/boba.jpg"
import coffee from "../assets/category/coffee.jpg"
import fruitWater from "../assets/category/fruit-water.jpg"
import mocktail from "../assets/category/mocktail.jpg"
import shake from "../assets/category/shake.jpg"
import smoothie from "../assets/category/smoothie.jpg"
import tea from "../assets/category/tea.jpg"
import SectionHeader from "./SectionHeader"
import ImageCard from "./ImageCard"


export default function CategorySection(){
    const categories = [
        {title: "boba", image: boba},
        {title: "coffee", image: coffee},
        {title: "fruit-Water", image: fruitWater},
        {title: "mocktail", image: mocktail},
        {title: "shake", image: shake},
        {title: "smoothie", image: smoothie},
        {title: "tea", image: tea}
    ]
    return (
        <section className="bg-gray-800 py-20 px-40">
            <SectionHeader 
                title = "Sip Spotlight"
                subtitle= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptates architecto fuga!"
            />
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-10">
                {categories.map((category, index)=>(
                    <ImageCard key={index} title={category.title} image={category.image}/>
                ))}
            </div>
        </section>
    )
}