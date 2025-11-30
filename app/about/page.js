"use client";
import React, { useEffect, useRef } from "react";
import "./About.css";
import Navbar from "../Components/Navbar/Navbar";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Footer from "../Components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const aboutRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse",
        },
      });

    gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert(); // Cleanup
  });

  return (
    <>
    <Navbar/>
    <div>
      <div
        ref={aboutRef}
        className="about flex justify-center items-center flex-col"
        style={{ willChange: "transform, opacity" }}
      >
        {/* <Navbar /> */}
        <h2 className="text-4xl text-white font-semibold mt-12">About us</h2>
        <div className="mt-4">
          <Link style={{letterSpacing:"1px"}}  className="text-body text-[1.3rem]" href="/">
            Home
          </Link>{" "}
          <span className="text-white">{">"} </span>{" "}
          <span style={{letterSpacing:"1px"}}  className="text-main text-[1.3rem]">About us</span>
        </div>
      </div>

      <div
        ref={contentRef}
        className="px-[5%] py-16 flex justify-center items-center flex-col"
        style={{ willChange: "transform, opacity" }}
      >
        <p className="text-[1.1rem] font-medium text-main">Our story</p>
        <h3 className="mt-3 font-semibold text-[1.9rem] text-white">
          About our company
        </h3>
        <p
          style={{ lineHeight: "25px", letterSpacing: "0.5px" }}
          className="text-[1rem] text-body mt-3 max-w-[750px] text-center"
        >
          We design and develop user-centric websites and platforms that blend
          creativity with powerful technology. From UI/UX design to full-stack
          development, our team turns your vision into impactful digital
          experiences.
        </p>
      </div>
    </div>
<Section2/>
<Section3/>
<Section4/>
<Section5/>
<Footer/>
    </>
  );
};

export default Page;
