"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BlogsSection2 = () => {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;

    gsap.from(section.querySelectorAll("h3, p, h2"), {
      scrollTrigger: {
        trigger: section,
        start: "top 50%",
      toggleActions:"play reverse play reverse"

      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });

    gsap.from(section.querySelector("img"), {
      scrollTrigger: {
        trigger: section,
      toggleActions:"play reverse play reverse",

        start: "top 50%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

  
  });

  return (
    <div ref={sectionRef} className="px-[5%] py-20">
      <div className="text-center">
        <p className="text-[1.1rem] text-main font-semibold">blog</p>
        <h3 className="font-semibold text-[1.9rem]  md:text-[2.5rem] text-white mt-3">
          Latest Blog & News
        </h3>
        <p
          style={{ lineHeight: "28px" }}
          className="text-body text-base text-center mx-auto max-w-[750px] mt-3"
        >
          Commodo elementum, sed imperdiet nunc euismod etiam aliquet viverra
          enim. Adipiscing nunc condimentum risus id. Aquam mattis magna
          facilisi
        </p>
      </div>
      <div className="mt-10 flex items-start flex-col md:flex-row gap-10 h-max">
        <Image
          src="/blogs.png"
          height="200"
          alt="blogs"
          width="200"
          className="md:w-[55%] w-full h-full"
        />
        <div>
          <h2 className="text-white text-[1.5rem] md:text-[2.5rem] font-semibold ">
            Purus porta feugiats dia sed ipsum enim gravida lectus.
          </h2>
          <p className="text-body text-base my-4">
            September 10, 2022 No Comments
          </p>
          <p className="text-body text-[1.1rem] ">
            Vestibulum netus et, in blandit aliquam, nibh enim. Nisi egestas
            lobortis ut sed gravida a pellentesque arcu blandit. Augue
            vestibulum praesent aliquam risus nunc et purus pretium. Nibh
            senectus ac
          </p>
          <button
            ref={btnRef}
            className="flex items-center mt-6 gap-4 border-main px-6 py-2 rounded-lg transition-all duration-300"
          >
            <span className="text-base font-bold text-main">Read more</span>
            <Icon
              icon="mingcute:arrows-right-line"
              width="18"
              height="18"
              className="text-main"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection2;
