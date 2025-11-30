import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backgroundRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            // end: "bottom 20%",
            // toggleActions: "play none none reverse",
          },
        }
      );

      // Simple title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Simple paragraph animation
      gsap.fromTo(
        paragraphRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Simple button animation
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Simple hover effect for button
      const button = buttonRef.current;
      
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <div ref={sectionRef} className="px-[5%] py-20">
      <div 
        ref={backgroundRef}
        className="section5 md:h-96 h-[400px] rounded-xl flex justify-center items-center gap-4 flex-col"
      >
        <h3 
          ref={titleRef}
          className="text-[1.3rem] max-w-[250px] md:max-w-[100%] text-center md:text-[2.5rem] md:font-medium text-white"
        >
          Get Free Designs & Discounts for New Users
        </h3>
        
        <p ref={paragraphRef} className="text-body text-base max-w-[250px]  md:max-w-[600px] text-center">
          Dont miss the chance to elevate your brand with professional web
          solutions at special rates.
        </p>
        
        <button 
          ref={buttonRef}
          className="text-base mt-8 font-semibold duration-300 hover-main text-black/85 px-7 py-3 bg-main rounded-full"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default Section5;