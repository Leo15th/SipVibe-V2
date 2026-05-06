import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import FutureProductsSection from "./components/FutureProductsSection";
import FooterSection from "./components/FooterSection";
import Modal from "./components/Modal";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import {doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore"
import { db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";


export  default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadCart(currentUser); // reload cart for this user
      } else {
        setUser(null);
        setCart([]);
      }
    });
  
    return () => unsubscribe(); // cleanup listener
  }, []);
  
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState(null);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [cart, setCart] = useState([])

  const loadCart = async (loggedInUser) =>{
    try {
      const userRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()) {
        const data = userSnap.data();
        setCart(data.cart || []);
      } else {
        setCart([])
      }
    } catch (error) {
      console.log("Error loading cart:",error)
    }
  }

  const saveCart = async (loggedInUser, newCart)=>{
    try {
      const userRef = doc(db, "users", loggedInUser.uid)
      await updateDoc(userRef, {cart: newCart});
    } catch (error) {
      console.log("Error saving cart:", error)
    }
  }
  
  const handleLoginSuccess = async (loggedInUser) =>{
    setUser(loggedInUser);
    setShowModal(false);
    await loadCart(loggedInUser)
    navigate("/menu");
  }

  const handleLogout = async ()=>{
    try {
      await signOut(auth);
      setUser(null);
      setCart([])
      navigate("/")
    } catch (error) {
      console.log("Log our Failed", error)
    }
  }

  const addToCart = async (product)=>{
    setCart(prevCart => {
      const existing = prevCart.find(item=> item.id === product.id);
      let newCart;

      if (existing){
        newCart = prevCart.map(item=>
          item.id === product.id ?
          {...item, quantity: item.quantity +1} :item
        )
      } else {
        newCart = [...prevCart, {...product, quantity: 1}]
      }

      if (user) saveCart(user, newCart);
      return newCart;
    })
  }

  const updateQuantity = async (id, qty) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item => item.id === id ?
        {...item, quantity: Math.max(qty, 1)} : item
      );
      if (user) saveCart(user, newCart);
      return newCart;
    })
  }

  const removeItem = async (id) =>{
    setCart(prevCart=>{
      const newCart = prevCart.filter(item=> item.id !== id);
      if (user) saveCart(user, newCart);
      return newCart;
    })
  }
  // inside App component
const handleCheckout = async () => {
  if (!user) {
    alert("Please log in to place an order.");
    return;
  }

  try {
    const order = {
      userId: user.uid,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: cart.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      createdAt: Date.now()
    };

    await addDoc(collection(db, "orders"), order);
    alert("Order placed successfully!");
    setCart([]);
    await saveCart(user, []);
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order. Try again.");
  }
};

const images = import.meta.glob("./assets/menu/*/*.{jpg,jpeg,png}", { eager: true });
const imageMap = Object.keys(images).reduce((acc, path) => {
  const fileName = path.split("/").pop().replace(/\.(jpg|jpeg|png)$/, "");
  acc[fileName] = images[path].default;
  return acc;
}, {});


  return (
    <>
      <NavBar
        shopName="Sip Vibe"
        links={["home", "category", "contact"]
        }
        logInClick={()=>{setShowModal(true); setModalMode("login")}}
        registerClick={()=>{setShowModal(true); setModalMode("register")}}
        user = {user}
        onLogout={handleLogout}
        cart = {cart}
      />
      <Routes>
        <Route 
          path="/" element={
            // Home Page
            <>
              <section id="home"> 
                <HeroSection/>
              </section>
              <section id="category">
                <CategorySection/>
              </section>
              <section id="futureProduct">
                <FutureProductsSection/>
              </section>
              <section id="contact">
                <FooterSection
                links ={
                  ["home","menu", "category", "futureProduct"]
                }
                />
              </section>
            </>
          }
        />
        <Route 
          path="/menu" element= {
            <section>
              <MenuPage 
                tabs={["shake", "smoothie", "boba", "coffee", "tea","mocktail", "fruit-water"]}
                user={user}
                logInClick={()=>{setShowModal(true); setModalMode("login")}}
                cart={cart}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                imageMap={imageMap}
                />
            </section>
          }
        />
        <Route
          path="/cart" element={
            <section>
              <Cart 
                cart={cart}
                updateQuantity={updateQuantity}  
                removeItem={removeItem}          
                imageMap= {imageMap}
                onCheckout={handleCheckout} 
              />
            </section>
          }
        />
      </Routes>
      {showModal && 
        <Modal 
          mode={modalMode}
          onClose = {()=>setShowModal(false)}
          onSwitchMode = {(newMode)=> setModalMode(newMode)}
          setUser = {handleLoginSuccess}
        />
      }
    </>
  );
}
