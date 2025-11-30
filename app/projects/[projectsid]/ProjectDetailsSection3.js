"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    <div className="border mt-4 border-stroke rounded-md overflow-hidden">
      <button
        onClick={onClick}
        className={`w-full flex justify-start items-center gap-3 px-4 py-3 text-left font-medium transition-colors ${
          isOpen ? "bg-main text-black" : "bg-background2 text-white"
        }`}
      >
        {isOpen ? (
          <FiMinus className="text-black" />
        ) : (
          <IoMdAdd className="text-white" />
        )}
        {question}
      </button>

      <div
        ref={contentRef}
        className="px-8 text-body text-sm leading-relaxed"
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <p className="py-4">{answer}</p>
      </div>
    </div>
  );
};
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



const ProjectDetailsSection3 = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll("h3, h4, p"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[5%] pt-20 grid md:grid-cols-2 gap-10"
    >
      {/* Left Section */}
      <div>
        <h3 className="text-[1.1rem] text-main font-semibold">FAQ</h3>
        <h4 className="text-[2.5rem] mt-4 text-white font-semibold leading-snug">
          Answering Your Questions, <br /> Building Your Vision.
        </h4>
        <p className="text-base text-body mt-4 max-w-[90%]">
          Here you’ll find clear answers to the most common questions about our
          services.
        </p>
      </div>

      <div className="flex-1">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectDetailsSection3;
