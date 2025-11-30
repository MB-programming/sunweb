import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ServeicesSection2 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const gridItemsRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Simple fade up animation
      gsap.fromTo(
        [imageRef.current, textRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Grid items subtle entrance
      gsap.fromTo(
        gridItemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  });

  const addToRefs = (el) => {
    if (el && !gridItemsRef.current.includes(el)) {
      gridItemsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="px-[5%] relative py-20 flex items-start md:gap-12">
      <Image src='/serveicesS2.png' width='221' height={269} className="absolute top-1/2 right-[0%] translate-y-[-90%]"/>
      <div className="flex-1">
        <div ref={imageRef} className="group cursor-pointer hidden md:block">
          <Image 
            src="/services2Image.png" 
            width="608" 
            height="500" 
            alt="Services"
          />
        </div>
      </div>
      <div ref={textRef} className="md:flex-1">
        <p className="text-base text-main">Our services</p>
        <h3 className="text-white mt-4 font-medium text-[1.9rem] md:max-w-[470px]">
          Results Driven Services That Fuel Your Business Forward.
        </h3>
        <p
          style={{ letterSpacing: "1px" }}
          className="text-body mt-4 font-medium text-[1rem] md:w-[490px]"
        >
          We craft smart, scalable, and creative web solutions that help your
          business stand out online
        </p>
        <div className="grid w-max grid-cols-2 grid-rows-4 md:gap-x-20 gap-x-14 gap-y-6 mt-8 border-t border-t-stroke/30 border-b py-8 border-b-stroke/30">
          {[
            "Proven Results",
            "Expert Team", 
            "Creative Strategy",
            "Client Focused",
            "Data-Driven",
            "Market Insights",
            "Fast Execution",
            "Custom Solutions",
          ].map((data, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Icon
                icon="ri:checkbox-circle-fill"
                width="24"
                height="24"
                className="text-main transition-colors duration-200 group-hover:text-main/80"
              />
              <span className="text-base font-medium text-white transition-colors duration-200 group-hover:text-white/80">
                {data}
              </span>
            </div>
          ))}
        </div>
        <div className="flex mt-8 items-center gap-4">
          <button className="px-10 py-4 md:flex-grow-0 flex-grow rounded-full text-black bg-main font-semibold transition-all duration-200 hover:bg-main/90">
            Learn more
          </button>
          <div className="transition-transform duration-200 hover:drop-shadow-lg cursor-pointer">
            <Image src='/play.png' width='90' height='90' alt="Play" className="w-[5.5rem] h-[5.5rem]"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServeicesSection2;