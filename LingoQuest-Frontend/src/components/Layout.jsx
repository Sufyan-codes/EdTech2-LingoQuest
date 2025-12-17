import React from "react";
import Navbar from "./Navbar";
import Hero from "../Pages/Home/Hero";
import WhyChooseUs from "../Pages/Home/WhyChooseUs";
import HowItWorks from "../Pages/Home/HowItWorks";
import Languages from "../Pages/Home/Languages";
import Ai from "../Pages/Home/Ai";
import CTA from "../Pages/Home/CTA";
import Footer from "./Footer";
import BecomeATutor from "../Pages/Home/BecomeATutor";


export default function Layout() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Languages />
      <Ai />
      <BecomeATutor />
      <CTA />
      <Footer />
    </>
  );
}
