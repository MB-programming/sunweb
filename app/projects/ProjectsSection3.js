"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection3 = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);

  // Set up animations on component mount
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate cards with staggered animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Scroll animation
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover animation - scale up and reduce opacity of other cards
        card.addEventListener("mouseenter", () => {
          // Scale up the hovered card
          gsap.to(card, {
            // scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
          });
          
          // Reduce opacity of other cards
          cardsRef.current.forEach((otherCard) => {
            if (otherCard && otherCard !== card) {
              gsap.to(otherCard, {
                opacity: 0.4,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });
        });

        card.addEventListener("mouseleave", () => {
          // Reset the hovered card
          gsap.to(card, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          
          // Reset opacity of all cards
          cardsRef.current.forEach((otherCard) => {
            if (otherCard) {
              gsap.to(otherCard, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });
        });

        // Button hover animation
        const button = card.querySelector("button");
        if (button) {
          button.addEventListener("mouseenter", () => {
            gsap.to(button, {
              y: -3,
              duration: 0.3,
            });
          });

          button.addEventListener("mouseleave", () => {
            gsap.to(button, {
              y: 0,
              duration: 0.3,
            });
          });
        }
      });
    }, sectionRef);

    // Clean up
    return () => ctx.revert();
  });

  return (
    <div ref={sectionRef} className="px-[5%] py-20 overflow-hidden">
      <div ref={headingRef} className="text-center mb-10 opacity-0">
        <p className="text-main font-medium text-[1.1rem]">
          Top Project Design
        </p>
        <h3 className="text-[1.9rem] font-semibold text-white">
          Our Best Design Project​
        </h3>
      </div>
      <div className="flex items-center gap-4 mt-8 flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <Link href='/projects/details'
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(12, 3, 70, 0.5) -52.21%, #1F203C 59.67%)",
              backdropFilter: "blur(10px)",
            }}
            className="h-[24rem] border border-stroke p-4 flex-1 min-w-[250px] rounded-2xl opacity-0 transform will-change-transform"
          >
            <img
              src="/project-ex.png"
              className="w-full h-[50%] rounded-lg border border-stroke object-cover transform will-change-transform"
              alt="Project example"
            />
            <h4 className="text-[1.2rem] text-white font-semibold mt-6">
              LMS Platform
            </h4>
            <p className="mt-4 text-[0.9rem] text-body max-w-[80%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="w-full py-2 text-black text-base font-medium bg-main rounded-full mt-6 transition-all duration-200 transform will-change-transform">
              View Details
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection3;