import React from "react";
import Navbar from "./Navbar";
import Hero from "../Pages/home/Hero";
import WhyChooseUs from "../Pages/home/WhyChooseUs";
import HowItWorks from "../Pages/home/HowItWorks";
import Languages from "../Pages/home/Languages";
import Ai from "../Pages/home/Ai";
import CTA from "../Pages/home/CTA";
import Footer from "./Footer";
import BecomeATutor from "../Pages/home/BecomeATutor";


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
