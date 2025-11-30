"use client";
import React, { useEffect, useRef } from "react";
import "./book.css";
import Navbar from "../Components/Navbar/Navbar";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BookingSection2 from "./BookingSection2";
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

    });

    return () => ctx.revert(); // Cleanup
  });

  return (
    <>
    <Navbar/>
    <div>
      <div
        ref={aboutRef}
        className="book flex justify-center items-center flex-col"
        style={{ willChange: "transform, opacity" }}
      >
        {/* <Navbar /> */}
        <h2 className="text-4xl text-white font-semibold mt-12">Booking</h2>
        <div className="mt-4">
          <Link style={{letterSpacing:"1px"}}  className="text-body text-[1.3rem]" href="/">
            Home
          </Link>{" "}
          <span className="text-white">{">"} </span>{" "}
          <span style={{letterSpacing:"1px"}}  className="text-main text-[1.3rem]">Booking </span>
        </div>
      </div>

    
    </div>
<BookingSection2 />
<Footer />
    </>
  );
};

export default Page;
