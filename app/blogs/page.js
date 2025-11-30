"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Blogs.css";
import BlogsSection2 from "./BlogsSection2";
import BlogsSection3 from "./BlogsSection3";
import Subscribe from "./Subscribe";
import Footer from "../Components/Footer/Footer";


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
          className="blogs flex justify-center items-center flex-col"
          style={{ willChange: "transform, opacity" }}
        >
          {/* <Navbar /> */}
          <h2 className="text-4xl text-white font-semibold mt-12">Blogs</h2>
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
              Blogs
            </span>
          </div>
        </div>
      </div>
  <BlogsSection2/>
  <BlogsSection3/>
  <Subscribe />
  <Footer/>
    </>
  );
};

export default Page;
