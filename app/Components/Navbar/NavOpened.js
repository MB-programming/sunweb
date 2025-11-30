"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./NavOpened.css";
import Navbar from "./Navbar";

const NavOpened = ({setOpen}) => {
  const circleRef = useRef(null);
  const linksRef = useRef([]);
  const [hoverActive, setHoverActive] = useState(false);
  const [hoverIndex, setHoverIndex] = useState("");

  useGSAP(() => {
    // Circle entrance
    gsap.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0, y: -50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1,0.6)",
      }
    );

    // Links stagger entrance
    gsap.fromTo(
      linksRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      }
    );

    // Neon stroke rotation + pulse
    gsap.to(".neon-stroke", {
      rotate: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      duration: 10,
      ease: "linear",
    });

    gsap.to(".neon-stroke circle", {
      strokeDasharray: "15 90",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Hover animation for links
  const handleEnter = (el) => {
    gsap.to(el, {
      scale: 1.2,
      color: "#54EECC",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el, {
      scale: 1,
      color: "#fff",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div style={{zIndex:"999"}}   className="h-screen   home w-screen fixed top-0 left-0 flex items-center justify-center z-50">
      <div
        ref={circleRef}
        className="group md:w-[85vh] w-[50vh] h-[50vh] md:h-[85vh] max-h-screen flex flex-col justify-center items-center gap-8 relative glass-circle rounded-full"
      >
        {/* Glow border */}
        <div
          className={`absolute inset-0 rounded-full  border-white/30 ${
            hoverActive ? "!border-0" : "border-4  duration-500"
          }`}
        ></div>

        {/* Neon stroke */}
        <svg
          className={`absolute inset-0 w-full h-full neon-stroke transition-opacity duration-500 ${
            hoverActive ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="#54EECC"
            strokeWidth="1"
            strokeDasharray="25 80"
            strokeLinecap="round"
          />
        </svg>

        {/* Links */}
        {[
          "Home",
          "About us",
          "Services",
          "Projects",
          "Pricing plan",
          "Blogs",
          "Contact us",
        ].map((item, i) => (
          <Link
          onClick={()=>setOpen(false)}
            key={i}
            href={item === 'Home' ? '/' : "/"+item.toLowerCase().split(" ")[0]}
            ref={(el) => (linksRef.current[i] = el)}
            onMouseEnter={() => {
              setHoverIndex(i);
              setHoverActive(true);
              handleEnter(linksRef.current[i]);
            }}
            onMouseLeave={() => {
              setHoverIndex("");
              setHoverActive(false);
              handleLeave(linksRef.current[i]);
            }}
            className="text-3xl text-white font-medium relative transition-opacity duration-300 group-hover:opacity-40 hover:!opacity-100"
          >
            <span
              className={`relative duration-300 z-10 ${
                hoverIndex !== ""
                  ? hoverIndex === i
                    ? "opacity-100 scale-105"
                    : "opacity-30 scale-95"
                  : ""
              }`}
            >
              {item}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavOpened;
