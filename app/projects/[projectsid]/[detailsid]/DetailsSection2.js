import React, { useRef } from "react";
import "./Details.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const DetailsSection2 = () => {
  // Static data
  const staticProjects = [
    {
      id: 1,
      title: "Fashion store website",
      url: "/servicesDetails.png",
      description: "<p>This is a static project description.</p>",
      attachments: ["/servicesDetails.png", "/servicesDetails.png"],
      attributes: [
        { key: "Technology", value: "React, GSAP" },
        { key: "Duration", value: "3 Months" },
        { key: "Client", value: "Sunmed Agency" },
      ],
    },
    {
      id: 2,
      title: "Static Project 2",
      url: "https://example2.com",
      description: "<p>Another static project description.</p>",
      attachments: ["/static-image-3.jpg", "/static-image-4.jpg"],
      attributes: [
        { key: "Technology", value: "Next.js, TailwindCSS" },
        { key: "Duration", value: "2 Months" },
        { key: "Client", value: "Tech Company" },
      ],
    },
  ];

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const titlesRef = useRef(null);
  const itemRef = useRef(null);

  const filter = staticProjects.filter((project) => project.id == 1);

  useGSAP(() => {
    const animateFromLeft = gsap.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
      },
    });

    const animateFromRight = gsap.from(textRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
    });

    const animateTitles = gsap.from(titlesRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titlesRef.current,
        start: "top 90%",
      },
    });

    const animateItems = gsap.from(itemRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 90%",
      },
    });

    return () => {
      animateFromLeft.kill();
      animateFromRight.kill();
      animateTitles.kill();
      animateItems.kill();
    };
  });

  const images =
    filter.length > 0 && Array.isArray(filter[0].attachments)
      ? filter[0].attachments.map((url) => ({
          original: url,
          thumbnail: url,
        }))
      : [];

  return (
    <div className="DevelopmentProjectDetails px-[7vw] py-7">
      <div className="content">
        <div className="img md:!w-[60%]" ref={imageRef}>
          <ReactImageGallery
            items={images}
            showBullets={false}
            showPlayButton={false}
          />
        </div>

        <div className="text !flex-1" ref={textRef}>
          <h3 className="uppercase max-w-[394px]">{filter[0]?.title}</h3>
          <p className="!text-body">By sunmed agency</p>

          <div className="flex flex-col mt-3">
            <a target="_blank" href={filter[0]?.url} className="button hover-main duration-200">
              <Icon icon="pajamas:eye" width="22" height="22"
              
              className="text-black"
              />
              <span>Live preview</span>
            </a>
            <Link className="button hover-main duration-200" href="/bookNow">
              <Icon
                icon="material-symbols-light:book-outline"
                width="30"
                height="30"
                className="text-black"
              />
              <span>Book now</span>
            </Link>
          </div>

          <div className="details">
            <h4>Attributes</h4>
            <div className="container">
              <div className="titles" ref={titlesRef}>
                {filter[0]?.attributes.map((data, index) => (
                  <span key={index}>{data.key}</span>
                ))}
              </div>
              <div className="item" ref={itemRef}>
                {filter[0]?.attributes.map((data, index) => (
                  <span key={index}>{data.value}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="discription">
        <h3>Descriptions</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur. Urna neque nibh pretium hac eu
          turpis posuere. Erat sem adipiscing non vitae lacus pellentesque justo
          est. Non eu eu aliquet cras in a. Pharetra neque eleifend nulla
          adipiscing faucibus feugiat interdum nibh. Commodo erat nullam
          pharetra at mauris tincidunt lacus turpis elementum. Lorem ipsum dolor
          sit amet consectetur. Urna neque nibh pretium hac eu turpis posuere.
          Erat sem adipiscing non vitae lacus pellentesque justo est.
        </p>
      </div>
    </div>
  );
};

export default DetailsSection2;
