"use client";
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import Image from "next/image";

const plans = {
  basic: {
    title: "Basic Plan (Starter)",
    desc: "Suitable for small businesses or startups",
    priceFrom: 300,
    priceTo: 500,
    includes: [
      "1–3 Pages Website (Landing Page / Portfolio).",
      "Custom UI/UX Design.",
      "Basic SEO Optimization.",
      "Speed Optimization.",
      "Delivery: 5–7 days.",
    ],
  },
  standard: {
    title: "Standard Plan (Business)",
    desc: "Suitable for medium-sized companies that want a complete website",
    priceFrom: 800,
    priceTo: 1200,
    includes: [
      "Up to 7–10 Pages Website.",
      "Custom UI/UX Design.",
      "CMS Integration (WordPress / Custom CMS).",
      "Basic E-Commerce (Products Catalog + Cart + Checkout).",
      "SEO Optimization (On-Page).",
      "Speed Optimization.",
      "Delivery: 10–14 days.",
    ],
  },
  premium: {
    title: "Premium Plan (Enterprise)",
    desc: "Suitable for large companies that need advanced web solutions",
    priceFrom: 2000,
    priceTo: 3000,
    includes: [
      "Unlimited Pages.",
      "Advanced Custom Design & Development.",
      "Full E-Commerce Platform (Payment Gateway + User Accounts).",
      "API Integrations.",
      "Advanced SEO + Analytics Integration.",
      "Maintenance & Support (1–3 months).",
      "Delivery: 20–30 days.",
    ],
  },
};

const PricingSection2 = () => {
  const [activePlan, setActivePlan] = useState("basic");
  const [fromValue, setFromValue] = useState(plans.basic.priceFrom);
  const [toValue, setToValue] = useState(plans.basic.priceTo);

  const contentRef = useRef(null);
  const listRef = useRef([]);

  useEffect(() => {
    const plan = plans[activePlan];

    // Fade content
    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Animate numbers with state update
    gsap.fromTo(
      { val: fromValue },
      { val: plan.priceFrom },
      {
        duration: 1,
        ease: "power3.out",
        onUpdate: function () {
          setFromValue(Math.floor(this.targets()[0].val));
        },
      }
    );

    gsap.fromTo(
      { val: toValue },
      { val: plan.priceTo },
      {
        duration: 1,
        ease: "power3.out",
        onUpdate: function () {
          setToValue(Math.floor(this.targets()[0].val));
        },
      }
    );

    // Stagger includes list
    gsap.fromTo(
      listRef.current,
      { autoAlpha: 0, x: -20 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [activePlan]);

  const plan = plans[activePlan];

  return (
    <div className="px-[5%] py-20 flex flex-col md:flex-row items-start gap-[5%]">
      {/* Left side buttons */}
      <div className="md:w-[40%]">
        <h3 className="text-[1.1rem] text-main font-semibold">Pricing plan</h3>
        <h4 className="text-white font-semibold mt-4 text-[2.5rem] w-[100%]">
          Pricing To Suit All Sizes Of Business
        </h4>
        <p className="text-base text-body py-8 border-b border-stroke">
          Choose the Right Plan for Your Business
        </p>
        {Object.keys(plans).map((key) => (
          <button
            key={key}
            style={{whiteSpace:"nowrap"}}
            onClick={() => setActivePlan(key)}
            className={`text-[1.9rem] mt-6 px-4 block ${
              activePlan === key
                ? "text-main font-bold border-l-4 ml-4 border-main"
                : "text-body font-medium"
            }`}
          >
            {plans[key].title}
          </button>
        ))}
      </div>

      {/* Right side box */}
      <div className="md:w-[60%] w-full flex justify-end">
        <div className=" rounded-[6rem] relative mt-4 md:mt-0  md:h-[39.5rem] h-[39.5rem] max-w-[540px] w-[90%] md:min-w-[70%]">
          <Image alt="pricing" src='/pricing.png' width='100' height='100' className='w-full rounded-[6rem] h-full object-cover'/>
          <div
            ref={contentRef}
          
            className="md:w-[90%] w-full  radius p-5 h-full border border-stroke bg-background2 absolute md:top-[10%] top-[15%] left-0 md:translate-x-[-20%] translate-x-[-15%] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white text-[1.3rem] font-medium mt-8">
                {plan.title}
              </h3>
              <p className="text-body text-base mt-4">{plan.desc}</p>
              <p className="text-white text-[2.5rem] mt-4 font-bold">
                $ {fromValue} – {toValue}
              </p>
              <p className="mt-4 text-base text-body">Includes</p>
              {plan.includes.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (listRef.current[i] = el)}
                  className="flex mt-4 items-center gap-2 opacity-0"
                > 
                  <div
                    className="flex justify-center items-center rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #54EECC 6.34%, #9995CA 71.26%, #C161C9 108.64%)",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <Icon
                      icon="material-symbols:done"
                      width="21"
                      height="21"
                      style={{ color: "#000" }}
                    />
                  </div>
                  <span className="text-[0.8rem] text-body">{item}</span>
                </div>
              ))}
            </div>

            {/* Button at bottom */}
            <div className="flex justify-center mt-2 mb-6">
              <button className="bg-main text-black px-8 md:py-3 py-2 rounded-full font-semibold hover:opacity-80 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection2;
