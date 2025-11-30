"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlogsDetailsSection2 from "./BlogsDetailsSection2";
import "./BlogDetails.css"
import BlogsDetailsSection3 from "./BlogsDetailsSection3";
import BlogsDetailsSection4 from "./BlogsDetailsSection4";
import Subscribe from "../Subscribe";
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
          className="blogs flex justify-center items-center flex-col"
          style={{ willChange: "transform, opacity" }}
        >
          {/* <Navbar /> */}
          <h2 className="text-4xl text-white font-semibold mt-12">Blog Details</h2>
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
<BlogsDetailsSection2/>
<BlogsDetailsSection3/>
<BlogsDetailsSection4/>
<Subscribe/>
<Footer />
    </>
  );
};

export default Page;
