import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import FutureProductsSection from "./components/FutureProductsSection";
import FooterSection from "./components/FooterSection";
import Modal from "./components/Modal";
import MenuPage from "./pages/MenuPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export  default function App() {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState(null);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  
  const handleLoginSuccess = (loggedInUser) =>{
    setUser(loggedInUser);
    setShowModal(false);
    navigate("/menu");
  }

  const handleLogout = async ()=>{
    try {
      await signOut(auth);
      setUser(null);
      navigate("/")
    } catch (error) {
      console.log("Log our Failed", error)
    }
  }

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
                tabs={["shake", "smoothie", "boba", "coffee", "tea","mocktail", "fruit-water"]}/>
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
