import { useState, useEffect } from "react"
// import firestore functions
import { collection,getDocs, addDoc} from "firebase/firestore"
import { db } from "../firebase"

export default function MenuPage({tabs}){
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [menuItems, setMenuItems] = useState([]);
    
    const images = import.meta.glob("../assets/menu/*/*.{jpg,jpeg,png}", {eager:true})
    const imageMap = Object.keys(images).reduce((acc, path)=>{
        const fileName = path.split("/").pop().replace(/\.(jpg|jpeg|png)$/, "")
        acc[fileName] = images[path].default;
        return acc;
    },{})

    //for use next time
    // const menuData = [
    //     {title: "Almon Boba Tea", category: "boba", price: 2.5},
    //     {title: "Brown Sugar Milk Tea", category: "boba", price: 2.6},
    //     {title: "Honeydew Boba Tea", category: "boba", price: 2.4},
    //     {title: "Passion Fruit Boba Tea", category: "boba", price: 2.9},
    //     {title: "Strawberry Milk Tea", category: "boba", price: 2.1},
    //     {title: "affogato", category: "coffee", price: 2.5},
    //     {title: "americano", category: "coffee", price: 2.5},
    //     {title: "cappuccino", category: "coffee", price: 2.5},
    //     {title: "espresso", category: "coffee", price: 2.5},
    //     {title: "latte macchiato", category: "coffee", price: 2.5},
    //     {title: "latte", category: "coffee", price: 2.5},
    //     {title: "berries lemon", category: "fruit-water", price: 1.9},
    //     {title: "blueberry orange", category: "fruit-water", price: 1.9},
    //     {title: "cucumba apple orange", category: "fruit-water", price: 1.9},
    //     {title: "cucumba orange mint", category: "fruit-water", price: 1.9},
    //     {title: "mixed fruit", category: "fruit-water", price: 1.9},
    //     {title: "orang mint", category: "fruit-water", price: 1.9},
    //     {title: "strawberry orange cinnamon", category: "fruit-water", price: 1.9},
    //     {title: "blue hawaii", category: "mocktail", price: 3.1},
    //     {title: "fruit punch", category: "mocktail", price: 3.1},
    //     {title: "mojito", category: "mocktail", price: 3.1},
    //     {title: "passionfruit mojito", category: "mocktail", price: 3.1},
    //     {title: "pink lady", category: "mocktail", price: 3.1},
    //     {title: "sunset bliss", category: "mocktail", price: 3.1},
    //     {title: "blueberry shake", category: "shake", price: 2},
    //     {title: "mixed berry shake", category: "shake", price: 2},
    //     {title: "orange shake", category: "shake", price: 2},
    //     {title: "pineapple shake", category: "shake", price: 2},
    //     {title: "strawberry shake", category: "shake", price: 2},
    //     {title: "mixed berry smoothie", category: "smoothie", price: 2.5},
    //     {title: "orange smoothie", category: "smoothie", price: 2.5},
    //     {title: "pineapple smoothie", category: "smoothie", price: 2.5},
    //     {title: "strawberry smoothie", category: "smoothie", price: 2.5},
    //     {title: "black tea", category: "tea", price: 2},
    //     {title: "chaomile tea", category: "tea", price: 2},
    //     {title: "green tea", category: "tea", price: 2},
    //     {title: "herbal tea", category: "tea", price: 2},
    //     {title: "matcha tea", category: "tea", price: 2}
    // ]
    // async function  seedMenuItems() {
    //     for (const item of menuData) {
    //         await addDoc(collection(db, "menuItems"), item)
    //         console.log(`Added: ${item.title}`)
    //     }
    //     console.log("All menu items added!")
    // }
    // useEffect(()=>{
    //     seedMenuItems();
    // },[])

    useEffect(()=>{
        const fetchMenuItems = async ()=>{
            const querySnapshot = await getDocs(collection(db, "menuItems"));
            const items = querySnapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }))
            setMenuItems(items);
        };
        fetchMenuItems();
    }, [])
    const filteredItems = menuItems.filter(menuitem => menuitem.category === activeTab);
    return(
        <div className="bg-hero bg-center bg-cover bg-fixed h-screen overflow-hidden">
            <div className="pt-[72px]">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 w-full fixed z-40 text-white">
                    {
                        tabs.map((tab, index)=>(
                            <button key={index} onClick={()=> setActiveTab(tab)} className={`text-md lg:text-lg px-2 py-1 lg:px-3 lg:py-1 font-bold capitalize border border-white/30 rounded-lg hover:scale-105 lg:hover:scale-110 hover:border-2 hover:border-amber-400 hover:mx-2 w-full
                                ${activeTab=== tab ? "bg-amber-400 border-2 black-text-shadow-sm" : "bg-slate-700/90 hover:bg-slate-900/90 hover:black-text-shadow-sm"}`}>{tab}</button>
                        ))
                    }
                </div>
                <div className="pt-32 md:pt-24 lg:pt-20 pb-10 h-[calc(100vh-150px)] overflow-y-auto px-3 scrollbar-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7">
                        {filteredItems.map((item, index)=>(
                            <div key={index} className="card border border-slate-600/50 bg-gray-400/10 rounded-2xl overflow-hidden hover:cursor-pointer shadow-md hover:shadow-white transition-transform duration-500 hover:scale-105">
                                <img src={imageMap[item.title.toLowerCase().replace(/\s+/g, "-")] || "/assets/placeholder.png"} alt={item.title} className="aspect-square w-full object-cover"/>
                                <div className="text-white capitalize flex flex-col p-4 gap-3">
                                    <h3 className="truncate">{item.title}</h3>
                                    <p>Price:{item.price}</p>
                                    <button className="border border-white/40 rounded-lg hover:border-amber-400 hover:bg-slate-300/40 hover:black-text-shadow-sm w-full py-1 px-2">Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-[80px] fixed bottom-0 left-0 right-0 border-t border-t-white bg-black flex justify-center items-center">
                    <div className="text-white font-bold text-2xl">This will be ADS</div>
                </div>
            </div>
        </div>
    )
}