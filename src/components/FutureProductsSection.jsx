import fruitWater from "../assets/futureProducts/fruit-water.jpg"
import matchaLatte from "../assets/futureProducts/matcha-latte.jpg"
import proteinSmoothie from "../assets/futureProducts/protein-smoothie.jpg"
import veganShake from "../assets/futureProducts/vegan-shake.jpg"
import SectionHeader from "./SectionHeader"
import ImageCard from "./ImageCard"
export default function FutureProductsSection(){
    const futureProducts = [
        {title: "fruit Water", image: fruitWater},
        {title: "matcha Latte", image: matchaLatte},
        {title: "protein Smoothie", image: proteinSmoothie},
        {title: "vegan Shake", image: veganShake}
    ]
    return(
        <section className="py-20 px-40 bg-gray-700">
            <SectionHeader
                title= "Future Products"
                subtitle = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptates architecto fuga!"
            />
            <div className="grid grid-cols-4 md:grid-cols-3 gap-10">
                {futureProducts.map((futureProduct, index)=>(
                    <ImageCard key={index} title={futureProduct.title} image={futureProduct.image}/>
                )
            )}
            </div>
        </section>
    )
}