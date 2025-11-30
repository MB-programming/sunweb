"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../projects.css";
import ProjectDetailsSection2 from "./ProjectDetailsSection2";
import ProjectDetailsSection3 from "./ProjectDetailsSection3";
import Section5 from "@/app/about/Section5";
import Footer from "@/app/Components/Footer/Footer";


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

    return () => ctx.revert();
  });

  return (
    <>
      <Navbar />
      <div>
        <div
          ref={aboutRef}
          className="projects flex justify-center items-center flex-col"
          style={{ willChange: "transform, opacity" }}
        >
          {/* <Navbar /> */}
          <h2 className="text-4xl text-white font-semibold mt-12">UI Design</h2>
          <div className="mt-4">
            <Link
              style={{ letterSpacing: "1px" }}
              className="text-body text-[1.3rem]"
              href="/"
            >
              Home
            </Link>{" "}
            <span className="text-white">{">"} </span>{" "}
            <Link
              style={{ letterSpacing: "1px" }}
              className="text-body text-[1.3rem]"
              href="/projects"
            >
              Projects
            </Link>{" "}
            <span className="text-white">{">"} </span>{" "}
            <span
              style={{ letterSpacing: "1px" }}
              className="text-main text-[1.3rem]"
            >
              UI Design
            </span>
          </div>
        </div>
      </div>

<ProjectDetailsSection2/>
<ProjectDetailsSection3/>
<Section5/>
<Footer/>
    </>
  );
};

export default Page;
