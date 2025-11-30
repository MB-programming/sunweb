"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Navbar from "./Components/Navbar/Navbar";
import Image from "next/image";
import "./Home.css";
import { useGSAP } from "@gsap/react";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import LatestProjects from "./LatestProjects";
import Testmonials from "./Testmonials";
import Footer from "./Components/Footer/Footer";
import Link from "next/link";

export default function Home() {
  const [size, setSize] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setSize((85 / 100) * window.innerWidth);
  
    
      setSize((window.innerWidth * 100) / 90);
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  
  const svgRef = useRef();
  const headingRef = useRef();
  const textRef = useRef();
  const buttonsRef = useRef();
  console.log(size);
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Split heading into words for staggering
    const headingWords = gsap.utils.toArray(
      headingRef.current.querySelectorAll(".word")
    );

    // Staggered word animation
    tl.from(headingWords, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      rotate: 5,
    });

    // Text animation
    tl.from(
      textRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
      },
      "-=0.5"
    );

    // Button animation
    tl.from(
      buttonsRef.current.children,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scale: 0.8,
      },
      "-=0.3"
    );

    // SVG path drawing animation
    const path = svgRef.current.querySelector("path");
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      stroke: "#54EECC",
      strokeWidth: 2,
      fill: "transparent",
    });

    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: 1.8,
      },
      "-=0.2"
    )
      .to(
        path,
        {
          fill: "#54EECC",
          duration: 0.8,
        },
        "-=0.5"
      )
      .to(path, {
        strokeWidth: 0,
        duration: 0.5,
      });

    // Button hover animations
    const buttons = buttonsRef.current.querySelectorAll("button");

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          // scale: 1.05,
          boxShadow: "0 0 15px #54EECC",
          duration: 0.3,
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          // scale: 1,
          boxShadow: "none",
          duration: 0.3,
        });
      });
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", () => {});
        btn.removeEventListener("mouseleave", () => {});
      });
    };
  });

  // Split heading text into words
  const headingText = "Innovative Web Solutions for a Smarter Digital Future";
  const headingLines = ["Building Digital Solutions That Drive Growth"];

  return (
    <>
      <Navbar />
      <div className="home pt-[20vh] max-w-[100vw] overflow-hidden">
        <h3
          ref={headingRef}
          className="text-4xl md:leading-[70px] leading-[50px] px-4 md:text-5xl font-semibold max-w-[900px] text-white text-center"
        >
          {headingLines.map((line, i) => (
            <div key={i} className="line">
              {line.split(" ").map((word, j) => (
                <span key={j} className="word inline-block ">
                  {word}&nbsp;
                </span>
              ))}
            </div>
          ))}
        </h3>

        <p
          ref={textRef}
          style={{ lineHeight: "30px", marginTop: "20px" }}
        className="text-center text-[#D1D5DB] text-[1.1rem] mx-auto max-w-[90%] md:max-w-[700px] "
        >
          From web design to development and marketing we craft solutions that
          help your business stand out
        </p>

        <div
          ref={buttonsRef}
          style={{ margin: "25px 0" }}
          className="flex items-center justify-center md:flex-row flex-col gap-3 mt-5  w-full"
        >
          <Link
            href="/services"
            className="font-semibold md:py-2 py-3 px-5 cursor-pointer md:w-max w-[90%]  text-center  text-black bg-white rounded-3xl md:rounded border border-white transition-colors hover:bg-transparent hover:text-white"
          >
            our Services
          </Link>
          <Link 
          href='/book'
            className="font-semibold md:py-2 py-3 px-5 cursor-pointer md:w-max w-[90%] text-center  bg-transparent text-white rounded-3xl md:rounded border border-white transition-colors hover:bg-white hover:text-black"
          >
            Get Started
          </Link>
        </div>

        <svg
          ref={svgRef}
          width={size}
          height="140"
          viewBox="0 0 1250 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_40_940)">
            <path
              d="M1233 123C1118.56 81.0704 887.92 15.7474 603.695 17.0183C328.388 18.2461 130.543 81.3936 17 123C150.481 86.7357 360.96 46.4002 603.695 42.8675C880.737 38.8393 1090.83 84.3985 1233 123Z"
              fill="transparent"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_40_940"
              x="0.4"
              y="0.4"
              width="1249.2"
              height="139.2"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="8.3" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="hard-light"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_40_940"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_40_940"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <About />
      <Portfolio />
      <Contact />
      <LatestProjects />
      <Testmonials />
      <Footer />
    </>
  );
}
