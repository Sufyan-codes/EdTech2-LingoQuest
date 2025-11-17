import React from "react";
import Navbar from "./Navbar";
import Hero from "../Pages/Home/Hero";
import WhyChooseUs from "../Pages/Home/WhyChooseUs";
import HowItWOrks from "../Pages/Home/HowItWOrks";
import Languages from "../Pages/Home/Languages";
import Ai from "../Pages/Home/Ai";
import CTA from "../Pages/Home/CTA";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <HowItWOrks />
      <Languages />
      <Ai />
      <CTA />
      <Footer />
    </>
  );
}
