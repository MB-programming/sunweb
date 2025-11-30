"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const LatestProjects = () => {
  const [resize  , setResize] = useState();
  useEffect(()=>{
  setResize((85 / 100) * window.innerWidth);

    if (typeof window !== "undefined") {
      window.addEventListener("resize" , ()=> setResize(window.innerWidth))
      return ()=> window.removeEventListener("resize" , ()=> setResize(window.innerWidth))
    }
  },[])
  const containerRef = useRef(null);

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
    let ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 80,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions:'play reverse play reverse'
          
        },
      });
    }, containerRef);

    return () => ctx.revert();
  });

  return (
    <section className="px-[5%] my-16" ref={containerRef}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-main whitespace-nowrap text-base tracking-wider">
            Our LATEST PROJECTS
          </p>
          <h3 className="text-white whitespace-nowrap text-[2rem] font-semibold">
            Our Successful Projects
          </h3>
        </div>
        <div className="md:flex items-center gap-4 hidden ">
          <div className="left-btn rounded-full border border-stroke cursor-pointer hover:bg-opacity-60 duration-200 bg-[#27284B] h-[3rem] w-[3rem] flex justify-center items-center ">
            <IoIosArrowBack className="text-white w-5 h-5" />
          </div>
          <div className="right-btn rounded-full border border-stroke cursor-pointer hover:bg-opacity-60 duration-200 bg-[#27284B] h-[3rem] w-[3rem] flex justify-center items-center ">
            <IoIosArrowBack className="text-white w-5 h-5 rotate-180" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Swiper
          spaceBetween={30}
          slidesPerView={resize > 820 ? 3 : 1}
          navigation={{ nextEl: ".right-btn", prevEl: ".left-btn" }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {portfolioItems.map((data) => (
            <SwiperSlide key={data.id}>
              <Link href='/projects/details'  className="project-card group w-full h-full relative overflow-hidden rounded md:rounded-2xl shadow-lg cursor-pointer">
                <img
                  src={data.image}
                  alt={data.title}
                  // width={100}
                  // height={100}
                  // unoptimized
                  className="object-cover w-full h-[350px] transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 duration-500 flex flex-col justify-end p-5">
                  <span className="text-main text-sm uppercase tracking-wider">
                    {data.category}
                  </span>
                  <h4 className="text-white text-lg font-semibold mt-1">
                    {data.title}
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    {data.description}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-center mt-6 md:hidden gap-4">
          <div className="left-btn rounded-full border border-stroke cursor-pointer hover:bg-opacity-60 duration-200 bg-[#27284B] h-[3rem] w-[3rem] flex justify-center items-center ">
            <IoIosArrowBack className="text-white w-5 h-5" />
          </div>
          <div className="right-btn rounded-full border border-stroke cursor-pointer hover:bg-opacity-60 duration-200 bg-[#27284B] h-[3rem] w-[3rem] flex justify-center items-center ">
            <IoIosArrowBack className="text-white w-5 h-5 rotate-180" />
          </div>
        </div>
    </section>
  );
};

export default LatestProjects;
