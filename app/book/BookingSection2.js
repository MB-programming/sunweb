"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BookingSection2 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const button = buttonRef.current;

    // Scroll animation for image and content
    gsap.from(image, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(content, {
      x: 200,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });


  });

  return (
    <div style={{filter:"drop-shadow(0 0 3px rgb(84, 238, 204 , .2))"}} ref={sectionRef} className="px-[5%] relative top-[-15vh]">
      <div className="flex h-max md:h-[800px] flex-col md:flex-row w-full bg-background2 items-start md:rounded-lg overflow-hidden">
        <Image
          ref={imageRef}
          src="/booking.png"
          width="400"
          height="400"
          className="md:w-[40%] w-full md:h-full h-[265px]"
        />
        <div ref={contentRef} className="py-20 px-6 flex-1">
          <h3 className="text-white text-[1.9rem] font-semibold">
            Book with us
          </h3>
          <p className="text-[0.9rem] mt-4 text-body max-w-[80%]">
            Lorem ipsum dolor sit amet consectetur. Consectetur vel volutpat vel
            lectus massa tempus.
          </p>
          <form>
            <div className="flex items-center flex-wrap gap-4 mt-6">
              <input
                type="text"
                placeholder="Name"
                className="outline-none min-w-[250px] flex-1 p-4 text-body bg-glass rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                className="outline-none min-w-[250px] flex-1 p-4 text-body bg-glass rounded"
              />
            </div>
            <div className="flex items-center flex-wrap gap-4 mt-6">
              <input
                type="email"
                placeholder="Email"
                className="outline-none flex-1 min-w-[250px] p-4 text-body bg-glass rounded"
              />
              <select className="outline-none min-w-[250px] flex-1 p-4 text-body bg-glass rounded">
                <option value="" selected>
                  Services
                </option>
              </select>
            </div>
            <textarea
              placeholder="Message"
              className="outline-none mt-6 w-full h-40 p-4 text-body bg-glass rounded"
            />
            <button
              ref={buttonRef}
              className="px-8 py-2 rounded bg-main text-black hover-main duration-200 mt-4"
              type="submit"
            >
              Submit now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingSection2;
