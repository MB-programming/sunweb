import { Icon } from "@iconify/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const containerRef = useRef(null);

  const boxesData = [
    {
      icon: "streamline-freehand:design-tool-quill",
      title: "Modern platform",
      disc: "We build fast, secure, and future-ready websites using the latest technologies.",
    },
    {
      icon: "streamline-ultimate:design-tool-compass",
      title: "Custom Design",
      disc: "Tailor-made designs that reflect your brand identity and deliver unique user experiences.",
    },
    {
      icon: "hugeicons:customer-support",
      title: "Very Experienced",
      disc: "A team of experts with years of experience in web development and business solutions.",
    },
    {
      icon: "hugeicons:security-validation",
      title: "100% Trusted",
      disc: "Trusted by clients for our commitment to quality, transparency, and reliability.",
    },
    {
      icon: "streamline-freehand:cash-payment-bill",
      title: "Easy Payment",
      disc: "Flexible and hassle-free payment options designed to fit your needs.",
    },
    {
      icon: "hugeicons:customer-support",
      title: "24/7 Support",
      disc: "Round-the-clock support to ensure your business runs smoothly at all times.",
    },
  ];

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".box-item");

      gsap.from(boxes, {
        opacity: 0,
        // y: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="px-[5%] py-[10vh]" ref={containerRef}>
      <p className="text-[1.2rem] text-main font-medium">About our agency</p>
      <h3 className="text-[1.9rem] font-semibold text-white">
        Why choose our Web Solutions?
      </h3>
      <div className="flex items-center mt-12 gap-5 flex-wrap">
        {boxesData.map((data, index) => (
          <div
            key={index}
            style={{ flex: "1 1 30%" }}
            className="box-item flex min-w-[250px] items-start gap-5 border border-main rounded-2xl px-8 py-10 h-56 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] 
              hover:border-white will-change-transform cursor-pointer"
          >
            <Icon
              className="shrink-0"
              icon={data.icon}
              width="50"
              height="50"
              style={{ color: "#fff" }}
            />
            <div>
              <h3 className="text-[1.3rem] font-medium text-white">
                {data.title}
              </h3>
              <p className="text-body text-[0.9rem] mt-4 max-w-[85%]">
                {data.disc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;
