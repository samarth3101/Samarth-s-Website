"use client";
import React from "react";
import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import SocialIcons from "../components/common/FloatingSocialIcons";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Courses from "../components/sections/Courses";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";


const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <SocialIcons /> 
      <main>
        <Hero />
        <About />
        <Experience/>
        <Projects />
        <Courses />
        <Contact/>
      </main>
      <Footer/>
    </>
  );
};

export default HomePage;
