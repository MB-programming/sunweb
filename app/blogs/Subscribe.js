"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Subscribe = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll(".animate-item");

    gsap.from(elements, {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        toggleActions:"play reverse play reverse",
        start: "top 80%",
      },
    });
  });

  return (
    <div className="px-[5%] md:pb-20  " ref={sectionRef} >
      <div className="Subscribe flex flex-col lg:flex-row items-center pt-20 px-[5%] md:gap-10">
        <div className="md:flex-1 text-center md:text-start">
          <h3 className="text-main  text-[1.3rem] font-semibold animate-item">
            newsletter
          </h3>
          <h3
            
            className="text-white md:leading-[70px] leading-[50px] text-4xl md:text-5xl font-semibold max-w-[500px] md:mt-4 animate-item"
          >
            Subscribe To Our Newsletter
          </h3>
        </div>

        <div className="md:flex-1 md:mt-0 mt-3 text-center md:text-start">
          <h3 className="text-white text-[1.3rem] font-bold animate-item">
            Be ready for the ever-changing world.
          </h3>
          <p className="text-body text-[0.9rem] mt-4 animate-item md:w-auto max-w-[90%] text-center mx-auto md:mx-0">
            Commodo elementum, sed imperdiet nunc euismod etiam aliquet viverra
          </p>
          <div className="flex mt-6 items-center gap-6 animate-item ">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-white text-body rounded-full py-3 pl-5 outline-none"
            />
            <button className="text-black bg-main  hover-main px-6 md:px-8 py-3 rounded-full hover:bg-[#54EECC] transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
