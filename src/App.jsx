import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import FutureProductsSection from "./components/FutureProductsSection";
import FooterSection from "./components/FooterSection";
import Modal from "./components/Modal";
import MenuPage from "./pages/MenuPage";
import { useState } from "react";
export  default function App() {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState(null);
  return (
    <>
      <NavBar
        shopName="Sip Vibe"
        links={["home", "category", "contact"]
        }
        logInClick={()=>{setShowModal(true); setModalMode("login")}}
        registerClick={()=>{setShowModal(true); setModalMode("register")}}
      />
      <section>
        <MenuPage 
          tabs={["shake", "smoothie", "boba", "coffee", "tea","mocktail", "fruit-water"]}
        />
      </section>
      {/* <section id="home"> 
        <HeroSection/>
      </section>
      {showModal && 
        <Modal 
          mode={modalMode}
          onClose = {()=>setShowModal(false)}
          onSwitchMode = {(newMode)=> setModalMode(newMode)}
        />
      }
      <section id="category">
        <CategorySection/>
      </section>
      <section id="futureProduct">
        <FutureProductsSection/>
      </section>
      <section id="contact">
        <FooterSection id="futureproducts"
        links ={
          ["home","menu", "category", "future Products"]
        }
        />
      </section> */}
    </>
  );
}
