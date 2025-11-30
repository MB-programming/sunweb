"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const portfolioItems = [
    {
      id: 1,
      title: "Profitpath Dashboard",
      description:
        "A smart financial dashboard to track expenses, manage budgets, and control your money in one place",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/2b425244b24afc7909985cfe5a5b7f0a0a45db66?width=1952",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Trendy Fashion application",
      description:
        "A modern fashion e-commerce platform with a stylish design and smooth shopping experience",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7538af6f0386b54489acc7ef3a87c658cbbce27e?width=1710",
      category: "Web Apps",
    },
    {
      id: 3,
      title: "Fashion store website",
      description:
        "A stylish fashion website designed to showcase the latest collections with a modern look and an effortless shopping experience",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a2d55937a4f359507f383be204e6a47de8a34a5b?width=980",
      category: "Web Development",
    },
    {
      id: 4,
      title: "Petra wear application",
      description:
        "A modern fashion e-commerce platform with a stylish design and smooth shopping experience",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/03b3182fdc68c9f0640a8756c5bba94bf1f2a65a?width=1218",
      category: "UX Design",
    },
    {
      id: 5,
      title: "Viora",
      description:
        "Creating More Than Furniture. We Design Experiences That Bring Elegance, Comfort, and Personality Into Every Corner of Your Home.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/957b33a28dd8c81341bd092cf4c26e6a40f8e98d?width=1648",
      category: "UI Design",
    },
    {
      id: 6,
      title: "LearnHub E-learning Dashboard",
      description:
        "An interactive educational dashboard with both light and dark modes for a seamless learning experience",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5dc72e3d758c3ebfc3dde22c8e200da86fb2c956?width=1112",
      category: "Web Apps",
    },
  ];

  useGSAP(() => {
    // Animation for section heading
    gsap.from(sectionRef.current.querySelectorAll("p, h3"), {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions:'play reverse play reverse'

      },
    });

    // Animation for cards
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions:'play reverse play reverse'

        },
      });
    });
  });

  return (
    <section ref={sectionRef} className="px-[5%] mt-8 ">
      {/* Heading */}
      <div className="flex items-start md:items-end flex-col md:flex-row justify-between">
        <div>
          <p className="text-main whitespace-nowrap text-base">Our Portfolio</p>
          <h3 className="text-white whitespace-nowrap text-[2rem] font-semibold">
            Our Portfolio Showcase
          </h3>
        </div>
        <nav
          style={{
            background: "rgba(175, 175, 175, 0.10)",
            backdropFilter: "blur(10px) saturate(1) ",
          }}
          className="rounded-full overflow-x-scroll no-scrollbar max-w-[90vw] px-2 h-14 flex items-center justify-start gap-2"
        >
          {["All","web development","UI design","UX design","CMS development","app development"].map((btn , index)=>(
            <button
              key={btn}
              className={`${btn === "All" && 'md:!px-6'} text-white px-2 md:px-3 capitalize rounded-full hover:bg-main duration-300 whitespace-nowrap py-2`}
            >
              {btn}
            </button>
          ))}
        </nav>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-6  md:grid-rows-3 gap-4 mt-6">
        {portfolioItems.map((data, index) => (
          <Link href='/projects/details' 
            key={data.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`group h-[280px] md:h-auto relative border overflow-hidden border-[#4C4C66] rounded-2xl cursor-pointer 
            ${index === 0
                ? "md:col-span-1 md:row-span-2"
                : index === 1 || index === 4
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-1 md:row-span-1"}`}
          >
            <img
            
              src={data.image}
              loading="lazy"
              alt="project"
              className="w-full h-full object-cover transform group-hover:scale-110 duration-700 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:opacity-0 group-hover:opacity-100 duration-500"></div>

            {/* Text */}
            <div className="absolute bottom-6 left-6 right-6 md:translate-y-10 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
              <h3 className="text-white text-[1.2rem] font-semibold">
                {data.title}
              </h3>
              <p className="text-[0.9rem] text-gray-200 mt-2">
                {data.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
