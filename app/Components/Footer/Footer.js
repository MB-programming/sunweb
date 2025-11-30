"use client";
import React, { useEffect, useRef } from "react";
import "./Footer.css";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaPhone, FaLocationDot, FaEarthAmericas } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",

        },
      });

      gsap.from(".footer-col", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",

        },
      });
    }, footerRef);

    return () => ctx.revert();
  });

  const services = [
    { name: "UI Design", link: "/" },
    { name: "Web Development", link: "/about" },
    { name: "UX Design", link: "/services" },
    { name: "CMS Development", link: "/blog" },
    { name: "Wep App", link: "/blog" },
  ];

  const Links = [
    { name: "Home", link: "/" },
    { name: "About us", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Blog", link: "/blog" },
    { name: "Projects", link: "/projects" },
    { name: "Pricring Plane", link: "/pricring" },
    { name: "Contact us", link: "/contact" },
  ];

  return (
    <footer ref={footerRef} className="footer px-[5%] py-5 mt-10 md:mt-0">
      <div className="text-center">
        <h2 className="footer-title text-white font-bold text-5xl md:text-8xl md:border-b-8 border-b-4 border-b-white py-2 w-max mx-auto ">
          Get In touch
        </h2>
      </div>

      <div className="flex items-start md:flex-row flex-col  md:gap-5 gap-8 justify-between mt-16 flex-wrap">
        {/* first col */}
        <div className="footer-col flex-1 flex flex-col justify-start min-w-[250px]">
          <Logo />
          <p
            style={{ lineHeight: "25px" }}
            className="mt-6 text-white font-light text-[0.9rem]"
          >
            Sunmed Web Solution is a digital agency that provides creative and
            modern web solutions. We design and develop websites and platforms
            tailored to help businesses enhance their online presence and
            achieve growth
          </p>
          <div className="flex mt-6 items-center gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 hover:bg-main cursor-pointer duration-300 flex justify-center items-center rounded-full bg-glass"
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Links col */}
        <div className="footer-col flex-1 ">
          <h3 className="text-white text-[1.3rem] font-semibold">Quick Links</h3>
          <div className="mt-6">
            {Links.map((data, key) => (
              <Link key={key} className="flex mt-3 items-center gap-2" href={data.link}>
                <IoIosArrowBack className="text-main w-5 h-5 rotate-180" />
                <span className="text-white text-base font-medium">
                  {data.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Services col */}
        <div className="footer-col flex-1 ">
          <h3 className="text-white text-[1.3rem] font-semibold">Services</h3>
          <div className="mt-6">
            {services.map((data, key) => (
              <Link key={key} className="flex mt-3 items-center gap-2" href={data.link}>
                <IoIosArrowBack className="text-main w-5 h-5 rotate-180" />
                <span className="text-white text-base font-medium">
                  {data.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact col */}
        <div className="footer-col flex-1">
          <h3 className="text-white text-[1.3rem] font-semibold">Contact</h3>
          <div className="flex mt-3 items-center gap-2">
            <FaPhone className="text-main w-5 h-5 " />
            <span className="text-white text-base font-medium">
              +1 123 456 7890
            </span>
          </div>
          <div className="flex mt-3 items-center gap-2">
            <FaLocationDot className="text-main w-5 h-5" />
            <span className="text-white text-base font-medium">
              421 Allen, Mexico 4233
            </span>
          </div>
          <div className="flex mt-3 items-center gap-2">
            <MdEmail className="text-main w-5 h-5 " />
            <span className="text-white text-base font-medium">
              Sunmedgency@com
            </span>
          </div>
          <div className="flex mt-3 items-center gap-2">
            <FaEarthAmericas className="text-main w-5 h-5" />
            <span className="text-white text-base font-medium">
              Sunmedgency@com
            </span>
          </div>
        </div>

        {/* Newsletter col */}
        <div className="footer-col flex-1 ">
          <h3 className="text-white text-[1.3rem] font-semibold">Join newsletter</h3>
          <div className="mt-6">
            <Image src="/news.png" alt="news" width={119} height={39} />
            <div className="flex items-center gap-2  bg-glass h-14 mt-8 rounded-lg">
              <input
                type="text"
                placeholder="Email"
                className="bg-transparent ml-4 text-white flex-1 outline-none border-none"
              />
              <button className="bg-main px-6 py-2 hover-main rounded-md mr-4">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
