"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Testmonials = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".testmonials-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testmonials-title",
          start: "top 85%",
          toggleActions:"play reverse play reverse"

        },
      });

      // Main Card
      gsap.from(".testmonials-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testmonials-card",
          start: "top 80%",
          toggleActions:"play reverse play reverse"

        },
      });

      // Side images
      gsap.from(".side-img", {
        x: (i) => (i % 2 === 0 ? -100 : 100), 
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".testmonials-card",
          start: "top 75%",
          toggleActions:"play reverse play reverse"
        },
      });

      // Buttons
      // gsap.from(".testmonials-btn", {
      //   y: 40,
      //   opacity: 0,
      //   duration: 0.8,
      //   ease: "power3.out",
      //   stagger: 0.15,
      //   scrollTrigger: {
      //     trigger: ".testmonials-btn",
      //     start: "top 85%",
      //   },
      // });
    }, containerRef);

    return () => ctx.revert();
  });

  return (
    <div
      ref={containerRef}
      className="testmonials py-20 flex justify-center items-center flex-col"
    >
      <div className="text-center testmonials-title">
        <p className="text-base capitalize text-main">Real feedback</p>
        <h3
          style={{ letterSpacing: "1px" }}
          className="text-[2rem] mt-2 text-white font-medium"
        >
          Client Success Stories
        </h3>
      </div>

      {/* Main Card */}
      <div className="mt-6 relative bg-[#27284B] border border-stroke rounded-lg p-6 md:w-[575px] w-[90vw] testmonials-card">
        <div className="flex justify-start items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} className="text-[#CFB107] w-4 h-4" />
          ))}
        </div>
        <div className="flex justify-end">
          <Image src="/eye.png" width="25" height="21" alt="eye" />
        </div>
        <p
          style={{ lineHeight: "30px" }}
          className="text-base mt-2 font-normal text-white"
        >
          Great experience! The team delivered exactly what we needed a modern,
          user friendly website that made our online presence stronger. Highly
          recommend them for any web solutions
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Image src="/p1.png" width="56" height="56" alt="p1" />
          <div>
            <p className="text-white text-[1.1rem] font-bold">Hussein Ezzat</p>
            <p className="text-body text-sm">Owner FeatherDev</p>
          </div>
        </div>

        <Image
          className="absolute top-0 left-[110%] side-img hidden md:block"
          src="/p1.png"
          width="72"
          height="72"
          alt="p1"
        />
        <Image
          className="absolute top-[35%] left-[120%] side-img hidden md:block"
          src="/p2.png"
          width="72"
          height="72"
          alt="p2"
        />
        <Image
          className="absolute top-[75%] left-[110%] side-img hidden md:block"
          src="/p3.png"
          width="72"
          height="72"
          alt="p3"
        />
        <Image
          className="absolute md:top-0 md:right-[110%] side-img  top-[140%] right-[50%]"
          src="/p4.png"
          width="72"
          height="72"
          alt="p4"
        />
        <Image
          className="absolute md:top-[35%] md:right-[120%] side-img  top-[140%] right-[34%]"
          src="/p5.png"
          width="72"
          height="72"
          alt="p5"
        />
        <Image
          className="absolute md:top-[75%] md:right-[110%] side-img  top-[140%] right-[42%]"
          src="/p6.png"
          width="72"
          height="72"
          alt="p6"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <div className="testmonials-btn left-btn rounded-full border border-stroke cursor-pointer hover:bg-opacity-60 duration-200 bg-[#27284B] h-[3rem] w-[3rem] flex justify-center items-center ">
          <IoIosArrowBack className="text-white w-5 h-5" />
        </div>
        <div className="testmonials-btn right-btn rounded-full border border-stroke cursor-pointer hover:bg-opacity-60 duration-200 bg-[#27284B] h-[3rem] w-[3rem] flex justify-center items-center ">
          <IoIosArrowBack className="text-white w-5 h-5 rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default Testmonials;
