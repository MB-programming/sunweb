"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const barsRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -120,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(textRef.current, {
        x: 120,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Progress Bars مع stagger
      gsap.fromTo(
        barsRef.current,
        { width: "0%" },
        {
          width: (i, el) => el.dataset.percent + "%",
          duration: 2,
          ease: "power2.out",
          stagger: 0.3, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  });

  const data = [
    { title: "High Quality Design", percent: 90 },
    { title: "Experienced Designer", percent: 95 },
    { title: "Creator’s Royalty & Splits", percent: 85 },
  ];

  return (
    <div
      ref={sectionRef}
      className="px-[5%] md:px-0 md:pr-[5%] py-20 overflow-x-hidden flex md:flex-row flex-col items-center gap-[10vw]"
    >
      <div className="flex-1" ref={imageRef}>
        <Image src="/section3.png" width="600" height="600" alt="Section" />
      </div>

      <div className="flex-1 pt-4" ref={textRef}>
        <p className="text-[1.1rem] text-main">Why choose us</p>
        <h3 className="text-[1.9rem] mt-6 text-white font-medium">
          Crafting Websites with Purpose and Passion
        </h3>
        <p
          style={{ letterSpacing: "0.5px" }}
          className="mt-6 text-base text-body"
        >
          We create websites that don’t just look good — they deliver real
          impact. Our team combines creativity, strategy, and technology to
          design digital experiences that help your business grow and stand out.
          Every project is crafted with care, precision, and a focus on
          achieving your goals.
        </p>

        <div className="mt-6 rounded-xl">
          {data.map((d, index) => (
            <div key={index} className={`${index > -1 && "mt-8"}`}>
              <h4 className="text-white font-semibold text-base">{d.title}</h4>
              <div className="w-full h-2 bg-white rounded-full mt-1">
                <div
                  ref={(el) => (barsRef.current[index] = el)}
                  data-percent={d.percent}
                  className="h-full bg-main relative rounded-full"
                >
                  <div className="absolute -top-10 right-0 flex flex-col items-center">
                    <div
                      style={{ paddingTop: "2px" }}
                      className="bg-white text-black font-bold px-2 rounded-md shadow"
                    >
                      {d.percent + "%"}
                    </div>
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "10px solid white",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
