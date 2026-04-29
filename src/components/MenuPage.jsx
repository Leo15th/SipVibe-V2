import { useState, useEffect } from "react"
import {collection, getDocs} from "firebase/firestore"
import { db } from "../firebase"
export default function MenuPage(){
    // Step 1: Create state to hold products
    const [products, setProducts] = useState([])
    // Step 2: Fetch products when page loads
    useEffect(()=>{
        const fetchProducts = async ()=>{
            //get all documents from products collection in firestore
            const allProducts = await getDocs(collection(db, "products"))
            //convert firestore doc to plain js object
            const menuItems = allProducts.docs.map(singleProduct =>({
                id: singleProduct.id,
                ...singleProduct.data()
            }));
            //save  into state so react can display them
            setProducts(menuItems);
        };
        //call the function when the page is loads
        fetchProducts();
    },[])
 // Step 3: Render UI
    return(
        <div className="pt-20 px-10">
            {/* Page title */}
            <h1 className="text-4xl font-bold text-center text-white mb-10">Our Menu</h1>

            {/* Grid layout for products */}
            <div className="grid grid-cols-3 gap-6">
                {/* Loop through products array and render each one */}
                {products.map(product => (
                <div
                    key={product.id} // React needs a unique key for each item
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20"
                >
                    {/* Product image */}
                    <img
                    src={product.image || ".placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    />

                    {/* Product name */}
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>

                    {/* Product price */}
                    <p className="text-gray-300">${product.price.toFixed(2)}</p>

                    {/* Add to Cart button (we’ll connect later) */}
                    <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Add to Cart
                    </button>
                </div>
                ))}
            </div>
        </div>
    )
}