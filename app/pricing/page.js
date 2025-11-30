"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Link from "next/link";
import gsap from "gsap";
import './pricing.css'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


import Section5 from "../about/Section5";
import Footer from "../Components/Footer/Footer";
import PricingSection2 from "./PricingSection2";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const aboutRef = useRef(null);

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
      <Navbar />
      <div>
        <div
          ref={aboutRef}
          className="pricing flex justify-center items-center flex-col"
          style={{ willChange: "transform, opacity" }}
        >
          {/* <Navbar /> */}
          <h2 className="text-4xl text-white font-semibold mt-12">Pricing plan</h2>
          <div className="mt-4">
            <Link
              style={{ letterSpacing: "1px" }}
              className="text-body text-[1.3rem]"
              href="/"
            >
              Home
            </Link>{" "}
            <span className="text-white">{">"} </span>{" "}
            <span
              style={{ letterSpacing: "1px" }}
              className="text-main text-[1.3rem]"
            >
              Pricing plan
            </span>
          </div>
        </div>
      </div>
    <PricingSection2/>
    <Footer/>
    </>
  );
};

export default Page;
