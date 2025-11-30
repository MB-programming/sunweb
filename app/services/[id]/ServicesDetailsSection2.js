"use client";

import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="mt-6 border border-stroke overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-start items-center gap-3 px-4 py-3 text-left font-medium transition-colors bg-background2 text-white"
      >
        {isOpen ? (
          <div className="flex justify-center items-center rounded-sm bg-main w-[32px] h-[24px]">
            <MdOutlineArrowBackIos className="text-black -rotate-90" />
          </div>
        ) : (
          <div className="flex justify-center items-center rounded-sm bg-main w-[32px] h-[24px]">
            <MdOutlineArrowBackIos className="text-black -rotate-180" />
          </div>
        )}
        {question}
      </button>

      <div
        ref={contentRef}
        className="px-8 text-body text-sm leading-relaxed bg-background2"
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <p className="py-4">{answer}</p>
      </div>
    </div>
  );
};

const ServicesDetailsSection2 = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const sideTabsRef = useRef([]);
  const accordionRef = useRef(null);
  const featuresRef = useRef([]);
  const faqRef = useRef(null);

  const sideData = [
    { icon: "iconoir:design-nib", title: "UI Design" },
    {
      icon: "material-symbols:developer-mode-tv-outline-rounded",
      title: "Web Development",
    },
    { icon: "carbon:application-web", title: "Web Apps" },
    { icon: "streamline-pixel:ui-design-website", title: "UX Design" },
    { icon: "carbon:development", title: "CMS Development" },
  ];

  const faqs = [
    {
      question: "What services does a web design agency typically offer?",
      answer:
        "A web design agency typically offers a range of services related to website design, development, and optimization, including website design and development, UI/UX design, e-commerce website development, mobile app design and development, responsive design, SEO, content creation, branding and logo design, website maintenance and support, and website hosting and security.",
    },
    {
      question: "How much does it cost to hire a web design agency?",
      answer:
        "The cost depends on the scope of the project, features required, and level of customization. Agencies may charge fixed prices or hourly rates.",
    },
    {
      question: "How long does it take to design and develop a website?",
      answer:
        "On average, it can take anywhere from 4 to 12 weeks depending on project size and complexity.",
    },
    {
      question: "How important is responsive design for a website?",
      answer:
        "Responsive design is essential as it ensures your website works seamlessly across all devices, improving user experience and SEO rankings.",
    },
    {
      question: "How can a web design agency help improve my website’s SEO?",
      answer:
        "Agencies optimize website structure, speed, mobile usability, and content to help boost search engine rankings and visibility.",
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            // toggleActions:"play reverse play reverse"

          },
        }
      );
      sideTabsRef.current.forEach((tab, i) => {
        gsap.fromTo(
          tab,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            delay: i * 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tab,
              start: "top 90%",
            // toggleActions:"play reverse play reverse"

            },
          }
        );
      });

      gsap.fromTo(
        sectionRef.current.querySelectorAll("h3"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector("h3"),
            start: "top 85%",
            toggleActions:"play reverse play reverse"
          },
        }
      );

      // الأكورديون
      gsap.fromTo(
        accordionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accordionRef.current,
            start: "top 85%",
          },
        }
      );

      // Features
      featuresRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            delay: i * 0.15,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <div
      className="py-20 px-[5%] flex items-start flex-col-reverse md:flex-row-reverse gap-4"
      ref={sectionRef}
    >
      {/* Side Section */}
      <div className="w-full md:w-[395px]">
        <div className="w-full bg-background2 px-3 py-5">
          {sideData.map((data, index) => (
            <div
              key={index}
              ref={(el) => (sideTabsRef.current[index] = el)}
              className="border sideTab border-stroke bg-white p-4 mt-4 flex flex-row-reverse justify-between items-center gap-4 opacity-0"
            >
              <Icon
                icon="solar:arrow-right-linear"
                width="24"
                height="24"
                className="text-background z-50"
              />
              <span className="font-medium z-50 text-background text-[1rem]">
                {data.title}
              </span>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-4 w-full h-[29rem] sideLinear flex flex-col justify-center items-center">
          <div className="flex items-center justify-center rounded-full w-[120px] h-[120px] bg-[#F9F4FB] bg-opacity-55">
            <div className="flex items-center justify-center rounded-full w-[100px] h-[100px] bg-white">
              <Icon
                icon="lucide:phone-call"
                width="56"
                height="56"
                style={{ color: "#000" }}
              />
            </div>
          </div>
          <h4 className="text-[1.3rem] font-semibold text-white text-center max-w-[300px] mt-8">
            Get Easy Interior Solution From Us
          </h4>
          <p className="text-base font-medium text-white mt-8">Contact us anytime</p>
          <p className="text-[1.8rem] font-semibold text-white">1018883449</p>
        </div>

        {/* Brochure */}
        <div className="mt-4 w-full h-[16.5] bg-background2 p-4">
          <h4 className="text-white font-semibold text-[1.3rem]">
            <span className="border-b-[3px] border-main pb-2">Brochure</span>{" "}
            Download
          </h4>
          <p className="mt-12 max-w-[320px] text-base text-body">
            Please click download button for getting brochure file
          </p>
          <button className="mt-4 flex items-center justify-center gap-2 px-6 py-2 bg-main">
            <Icon
              icon="humbleicons:download-alt"
              width="18"
              height="18"
              style={{ color: "#000" }}
              className="font-semibold"
            />
            <span className="font-semibold text-[0.9rem]">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1">
        {/* Main Image */}
        <div
          ref={imageRef}
          className="w-full h-[28rem] overflow-hidden relative opacity-0"
        >
          <Image
            src="/servicesDetails.png"
            width="200"
            height="200"
            alt="ui "
            className="w-full h-full"
          />
        </div>

        <h3 className="mt-6 text-[1.5rem] font-semibold text-white">
          Service Details
        </h3>

        <p className="mt-4 text-body text-[1.1rem]">
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews...
        </p>

        <h3 className="mt-6 text-[1.5rem] font-semibold text-white">
          Frequently Asked Question
        </h3>

        {/* Accordion */}
        <div className="flex-1" ref={accordionRef}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Features */}
        <div className="mt-10 flex md:flex-row flex-col-reverse  items-start gap-4 h-max">
          <div className="grid grid-cols-1 grid-rows-5 flex-1 gap-4">
            {[
              "revolutionary catalysts for chang",
              "catalysts for chang the Seamlessly ",
              "business applications through",
              "revolutionary catalysts for chang",
              "procedures whereas processes",
            ].map((data, index) => (
              <div
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                className="flex items-center gap-3 group cursor-pointer opacity-0"
              >
                <Icon
                  icon="mdi:checkbox-marked-circle-outline"
                  width="30"
                  height="30"
                  className="text-main transition-colors duration-200 group-hover:text-main/80"
                />
                <span className="text-[1.1rem] font-medium text-body transition-colors duration-200 group-hover:text-white/80">
                  {data}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1 h-full">
            <Image
              src="/services-ex.png"
              width="100"
              height="100"
              alt="meeting"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsSection2;
