import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import FutureProductsSection from "./components/FutureProductsSection";
import FooterSection from "./components/FooterSection";
import MenuPage from "./components/MenuPage";
import { useState } from "react";

export  default function App() {
  return (
    <Router basename="/SipVibe-V2/">
      {/* NavBar always visible */}
      <NavBar 
        shopName={"Sip Vibe"}
        links={["Home", "Category", "Contact"]}
      />
      {/* Define Routes from different Page */}
      <Routes>
        {/* HomePage Landing Page */}
        <Route
          path="/"
          element = {
            <>
              <HeroSection />
              <CategorySection />
              <FutureProductsSection />
              <FooterSection 
                links={(["Home", "Category", "Future Products"])}
                />
            </>
          }
        />

        {/* MenuPage */}
        <Route
          path="/menu"
          element ={
            <MenuPage/>
          }
        />
        <Route path="/category" element={<CategorySection />} />
        <Route path="/contact" element={<FooterSection links={["Home", "Category", "Future Products"]} />} />

      </Routes>
    </Router>
  );
}
