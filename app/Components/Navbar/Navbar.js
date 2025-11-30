"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../Logo/Logo";
import { useGSAP } from "@gsap/react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import NavOpened from "./NavOpened";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [open  , setOpen] = useState(false)
  useEffect(()=>{
    if(open){

      document.documentElement.style.height ='100vh'
      document.documentElement.style.overflowY ='hidden'
    }else{
      document.documentElement.style.height ='auto'
      document.documentElement.style.overflowY ='auto'
    }
  },[open])
  const navRef = useRef(null);

  useGSAP(() => {
    // Animation on enter
    gsap.fromTo(
      navRef.current,
      { background: "transperant", boxShadow: "none" },
      {
      
        background: "rgba(175, 175, 175, 0.10)",
        backdropFilter:  "blur(10px) saturate(1) ",
        boxShadow: "rgba(175, 175, 175, 0.50)",
        duration: 1,
        
        ease: "power4.out",
      }
    );

    // Animation on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        gsap.to(navRef.current, {
          top:self.direction === 1 ? "0" : "2.5rem",
          height:self.direction === 1 ? "4.5rem" : "4.1rem",
          width: self.direction === 1 ? "100%" : "90%",
          backgroundColor:
            self.direction === 1
              ? "#17182c" 
              : "rgba(175, 175, 175, 0.10)", 
          // backdropFilter: self.direction === 1 ? "blur(10px)" : "blur(0px)",
          borderRadius: self.direction === 1 ? "0" : "0.5rem",
      
          // backdropFilter: "blur(200px)",
          duration: 0.6,
          ease: "power3.out",
        });
    },
    });
  });

  return (
    <>
      {
        open &&
      <NavOpened isOpen={open} setOpen={setOpen}/>
      }
    <div
      ref={navRef}
      style={{
        backgroundColor: open ? "transparent": "rgba(175, 175, 175, 0.10)",
        padding: "15px 25px",
        zIndex:"999",
        backdropFilter:  open ? "none":"blur(10px) saturate(1)",
        // backdropFilter:   "blur(10px) saturate(1) ",
        boxShadow: open ? "none": "rgba(175, 175, 175, 0.50)",
      }}
      className="w-[90%] mx-auto h-[4.1rem] rounded-lg flex items-center justify-between fixed top-[2.5rem] left-[50%] translate-x-[-50%] backdrop-saturate-200 backdrop-blur-3xl z-50"
    >
    
      <Logo />
      <div className="flex items-center gap-4">
        <span className="cursor-pointer text-[#54EECC] hover:text-[#54EECC] duration-300">
          EN
        </span>
        <span className="text-white cursor-pointer hover:text-[#54EECC] duration-300">
          AR
        </span>
        <div onClick={()=>setOpen(prev => !prev)} className="border cursor-pointer border-white h-11 w-11 flex justify-center items-center rounded-full hover:bg-main hover-main hover:border-main duration-300">{open ?<IoMdClose className="w-7 h-7 text-white rota"/> :<BiMenuAltRight className="w-7 h-7 text-white rota"/>}</div>
      </div>
    </div>
      </>
  );
};

export default Navbar;
