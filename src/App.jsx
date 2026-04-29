import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import FutureProductsSection from "./components/FutureProductsSection";
import FooterSection from "./components/FooterSection";
import { useState } from "react";

export  default function App() {
  return (
    <>
      <NavBar 
        shopName={"Sip Vibe"}
        links={["Home", "Category", "Contact"]}
      />
      <HeroSection />
      <CategorySection />
      <FutureProductsSection />
      <FooterSection 
        links={(["Home", "Category", "Future Products"])}
      />
    </>
  );
}
