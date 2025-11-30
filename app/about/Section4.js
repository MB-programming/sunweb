import { Icon } from "@iconify/react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const boxesRef = useRef([]);

  const boxesData = [
    {
      icon: "fe:layer",
      title: "Select Your Design",
      disc: "Pick from modern, customizable templates built to make your brand stand out.",
    },
    {
      icon: "hugeicons:payment-02",
      title: "Make A Payment",
      disc: "Enjoy secure, fast, and flexible payment options with no hidden fees.",
    },
    {
      icon: "fluent:design-ideas-20-regular",
      title: "Enjoy Your Design",
      disc: "Get a stunning, ready-to-use design that brings your vision to life.",
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Boxes staggered animation
      gsap.fromTo(
        boxesRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boxesRef.current[0],
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Individual box hover animations
      boxesRef.current.forEach((box, index) => {
        if (box) {
          const icon = box.querySelector('.icon-container');
          const title = box.querySelector('.title');
          const description = box.querySelector('.description');

          // Set initial hover state
          gsap.set([icon, title, description], { scale: 1, y: 0 });

          // Hover in animation
          box.addEventListener('mouseenter', () => {
            gsap.to(box, {
              scale: 1.05,
              y: -8,
              duration: 0.4,
              ease: "power2.out",
            });
            
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to([title, description], {
              y: -2,
              duration: 0.3,
              ease: "power2.out",
            });

            // Gradient animation on hover
            // gsap.to(box, {
            //   background: "linear-gradient(top, rgba(193, 97, 201, 0.4) 0%, rgba(39, 40, 75, 0.5) 100%)",
            //   // duration: 0.3,
            //   ease: "power2.out",
            // });
          });

          // Hover out animation
          box.addEventListener('mouseleave', () => {
            gsap.to(box, {
              scale: 1,
              y: 0,

              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to([title, description], {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            // // Reset gradient
            // gsap.to(box, {
            //   background: "linear-gradient(top, rgba(193, 97, 201, 0.2) 0%, rgba(39, 40, 75, 0.3) 100%)",
            //   // duration: 0.3,
            //   ease: "power2.out",
            // });
          });
        }
      });

      // Floating animation for icons
      boxesRef.current.forEach((box, index) => {
        if (box) {
          const icon = box.querySelector('.icon-container');
          gsap.to(icon, {
            y: -5,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2,
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <div ref={sectionRef} className="px-[5%] py-20 overflow-hidden">
      <div ref={headerRef} className="flex justify-center items-center gap-4 flex-col">
        <p className="text-main text-[1.1rem]">How We Works</p>
        <h3 className="text-[1.9rem] text-white font-medium">
          Our Working Process
        </h3>
        <p className="max-w-[695px] text-center text-body text-base">
          We follow a clear and structured process to ensure every project is
          delivered with quality, creativity, and efficiency. From the first
          idea to the final launch, we make the journey smooth and transparent
          for our clients.
        </p>
      </div>
      
      <div className="flex items-center gap-8 mt-8 flex-wrap lg:flex-nowrap">
        {boxesData.map((data, index) => (
          <div
            key={index}
            ref={(el) => (boxesRef.current[index] = el)}
            style={{
              flex: "1 1 30%",
              background:
                " linear-gradient(180deg, rgba(193, 97, 201, 0.15) -16.04%, rgba(0, 0, 0, 0) 100%), rgba(39, 40, 75, 0.3)",
            }}
            className="border border-[#4C4C66] rounded-2xl p-6 pr-8 pb-12 cursor-pointer transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-500/20 min-w-[280px]"
          >
            <div className="flex items-center gap-3">
              <div className="icon-container">
                <Icon
                  icon={data.icon}
                  width="60"
                  height="60"
                  style={{ color: "#fff" }}
                />
              </div>
              <h4 className="title text-white font-semibold text-[1.3rem]">
                {data.title}
              </h4>
            </div>
            <p className="description mt-4 text-base text-body">
              {data.disc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section4;





