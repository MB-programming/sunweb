"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const progressRefs = useRef([]);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current.children, {
        x: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions:'play reverse play reverse'

        },
      });

      // progress bars
      progressRefs.current.forEach((bar, i) => {
        const percent = bar.dataset.percent;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${percent}%`,
            duration: 3,
            delay:1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
          toggleActions:'play reverse play reverse'

            },
          }
        );
      });

      // gsap.from(buttonRef.current, {
      //   scale: 0.5,
      //   opacity: 0,
      //   duration: 0.8,
      //   ease: "back.out(1.7)",
      //   scrollTrigger: {
      //     trigger: buttonRef.current,
          
      //     start: "top 85%",
      //   },
      // });
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <div
      ref={sectionRef}
      style={{ padding: "20px 5%" }}
      className="flex items-start md:flex-row flex-col justify-between gap-8 md:mt-5 overflow-x-hidden"
    >
      {/* Image */}
      <div ref={imgRef} className="flex-1">
        <Image src="/aboutUs.png" width="500" height="300" alt="About us" />
      </div>

      {/* Text */}
      <div ref={textRef} className="flex-1">
        <p className="text-main text-[1.1rem] font-normal capitalize">
          Who we are
        </p>
        <h3 className="text-white mt-6 text-[2rem] font-medium">
          We Turn Ideas Into Digital Reality
        </h3>
        <p
          style={{ letterSpacing: "1px" }}
          className="text-body mt-6 text-[1rem] md:w-[500px] capitalize"
        >
          We are a creative web solutions agency helping businesses design,
          build, and grow their digital presence with innovation and expertise
        </p>

        {/* Skills */}
        <div className="mt-6 bg-[#27284B] bg-opacity-20 rounded-xl border border-stroke  p-6">
          {[
            {
              title: "User Interface Designer",
              percent: 94,
            },
            {
              title: "WordPress Developer",
              percent: 98,
            },
          ].map((data, index) => (
            <div key={index} className={`${index > 0 && "mt-8"}`}>
              <h4 className="text-white font-semibold text-base">
                {data.title}
              </h4>
              <div className="w-full h-2 bg-white rounded-full mt-1">
                <div
                  ref={(el) => (progressRefs.current[index] = el)}
                  data-percent={data.percent}
                  className="h-full bg-main relative rounded-full"
                  style={{ width: `${data.percent}%` }}
                >
                  <div className="absolute -top-10 right-0 flex flex-col items-center">
                    <div
                      style={{ paddingTop: "2px" }}
                      className="bg-white text-black font-bold px-2 rounded-md shadow"
                    >
                      {data.percent}
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


        <button
          ref={buttonRef}
          className="mt-8  hover:text-white hover:bg-main hover-main bg-white px-6 py-2 text-[#141414] rounded font-semibold"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default About;
