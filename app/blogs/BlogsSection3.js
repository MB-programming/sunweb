"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const BlogsSection3 = () => {
  const cardsRef = useRef([]);
useGSAP(()=>{
  gsap.from(cardsRef.current, {
    scrollTrigger: {
      trigger: cardsRef.current[0],
      start: "top 90%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.15,
  });

})
  useEffect(() => {
  
    cardsRef.current.forEach((card, index) => {
      const title = card.querySelector("h4");

      card.addEventListener("mouseenter", () => {
        cardsRef.current.forEach((otherCard, i) => {
          if (i !== index) {
            gsap.to(otherCard, { opacity: 0.4, duration: 0.3, ease: "power2.out" });
          } else {
            gsap.to(otherCard, { opacity: 1, duration: 0.3, ease: "power2.out" });
          }
        });
      });

      card.addEventListener("mouseleave", () => {
        cardsRef.current.forEach((otherCard) => {
          gsap.to(otherCard, { opacity: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    });
  }, []);

  return (
    <div className="px-[5%] py-20 flex items-center gap-8 flex-wrap relative">
      {Array.from({ length: 6 }).map((_, index) => (
        <Link
        href='/blogs/details'
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          style={{ flex: "1 1 30%" }}
          className="bg-background2 rounded-lg min-w-[250px] overflow-hidden cursor-pointer relative"
        >
          <Image
            src="/blogs.png"
            height="100"
            width="200"
            alt="blog"
            className="w-full md:h-[15rem]  object-cover"
          />
          <div className="p-3">
            <h4 style={{letterSpacing:"1px"}} className="text-white text-[1rem] font-semibold">
              Purus porta feugiats dia sed ipsum enim gravida lectus.
            </h4>
            <p className="text-body text-[0.9rem] my-2">
              September 10, 2022 No Comments
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogsSection3;
