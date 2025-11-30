
"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BlogsDetailsSection2 = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentCardRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const textRef = useRef(null);
  const tagsRef = useRef(null);
  const shareRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set([imageRef.current, contentCardRef.current], {
        opacity: 0,
        y: 100
      });
      
      gsap.set([titleRef.current, metaRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(textRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set([tagsRef.current, shareRef.current], {
        opacity: 0,
        y: 20
      });

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: false
        }
      });

      imageTimeline.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentCardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: false
        }
      });

      contentTimeline
        .to(contentCardRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .to(metaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4")
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3");

      // Animate bottom section
      const bottomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: tagsRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: false
        }
      });

      bottomTimeline
        .to(tagsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        })
        .to(shareRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");

      const socialIcons = containerRef.current.querySelectorAll('.social-icon');
      socialIcons.forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            backgroundColor: "#C161C9",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon.querySelector('svg'), {
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            backgroundColor: "#9F9F9F",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon.querySelector('svg'), {
            color: "#000000",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Add subtle parallax effect to the image
      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Add text reveal animation on scroll
      const textElements = textRef.current.querySelectorAll('p, br');
      gsap.fromTo(textElements, 
        { 
          opacity: 0.3,
          filter: "blur(2px)"
        }, 
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => {
      ctx.revert(); 
    };
  });

  return (
    <div ref={containerRef} className="md:px-[5%] pt-20 overflow-hidden">
      <div className="mt-10 flex items-start gap-10 h-[34.5rem] w-full">
        <Image
          ref={imageRef}
          src="/blogs.png"
          height="200"
          alt="blogs"
          width="200"
          className="w-full object-cover h-full rounded-lg shadow-2xl"
        />
      </div>
      <div 
        ref={contentCardRef}
        className="md:w-[80%] w-[95%]   mx-auto bg-white p-6 relative top-[-10rem] rounded-xl shadow-2xl border border-gray-100"
      >
        <h3 
          ref={titleRef}
          className="text-black text-[2.7rem] font-bold leading-tight"
        >
          Purus porta feugiats dia sed ipsum enim gravida lectus.
        </h3>
        <p 
          ref={metaRef}
          className="text-base font-medium text-[#7E7E7E] mt-6"
        >
          September 10, 2022 No Comments
        </p>
        <div 
          ref={textRef}
          className="py-10 mt-10 border-y border-[#D2D2D2] text-[#7E7E7E] text-[1.1rem] leading-relaxed"
        >
          <p>
            Vestibulum netus et, in blandit aliquam, nibh enim. Nisi egestas
            lobortis ut sed gravida a pellentesque arcu blandit. Augue vestibulum
            praesent aliquam risus nunc et purus pretium. Nibh senectus ac sed eu
            elementum ac curabitur maecenas. Tristique eu dui nunc semper nibh
            nunc tortor eu, non. Sed integer vitae tortor elit mollis. Praesent
            lorem iaculis ultrices scelerisque in etiam. Egestas pretium dolor in
            viverra id tellus condimentum purus. Erat platea turpis mus faucibus
            fames egestas.
          </p>
          <br />
          <br />
          <p>
            Vestibulum netus et, in blandit aliquam, nibh enim. Nisi egestas
            lobortis ut sed gravida a pellentesque arcu blandit. Augue vestibulum
            praesent aliquam risus nunc et purus pretium. Nibh senectus ac sed eu
            elementum ac curabitur maecenas. Tristique eu dui nunc semper nibh
            nunc tortor eu, non. Sed integer vitae tortor elit mollis. Praesent
            lorem iaculis ultrices scelerisque in etiam. Egestas pretium dolor in
            viverra id tellus condimentum purus. Erat platea turpis mus faucibus
            fames egestas.
          </p>
          <br />
          <br />
          <p>
            Vestibulum netus et, in blandit aliquam, nibh enim. Nisi egestas
            lobortis ut sed gravida a pellentesque arcu blandit. Augue vestibulum
            praesent aliquam risus nunc et purus pretium. Nibh senectus ac sed eu
            elementum ac curabitur maecenas. Tristique eu dui nunc semper nibh
            nunc tortor eu, non. Sed integer vitae tortor elit mollis. Praesent
            lorem iaculis ultrices scelerisque in etiam. Egestas pretium dolor in
            viverra id tellus condimentum purus. Erat platea turpis mus faucibus
            fames egestas.
          </p>
        </div>
        <div className="flex items-start gap-4 md:items-center md:flex-row flex-col justify-between mt-6">
          <div ref={tagsRef} className="flex items-center flex-wrap gap-1">
            {['Business', "Computer", "Design", "Technology", "Template", "Website"].map((data, index) => (
              <span 
                className="text-[#C161C9] text-[1.1rem] font-bold hover:text-[#9F4A9F] transition-colors duration-300" 
                key={index}
              >
                {index !== 0 && ", "}{data}
              </span>
            ))}
          </div>
          <div ref={shareRef} className="flex items-center gap-4">
            <span className="text-black font-bold text-[1.1rem]">Share :</span>
            {["ri:facebook-fill", "mdi:twitter", "akar-icons:instagram-fill", "ic:baseline-email"].map((data, index) => (
              <div 
                key={index}
                className="social-icon w-[22px] h-[22px] bg-[#9F9F9F] rounded-full flex justify-center items-center cursor-pointer transition-all duration-300"
              >
                <Icon icon={data} width="12" height="12" style={{ color: '#000' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailsSection2;
