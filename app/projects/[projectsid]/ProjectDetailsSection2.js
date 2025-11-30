import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectDetailsSection2 = () => {
  const sideData = [
    {
      icon: "iconoir:design-nib",
      title: "UI Design",
    },
    {
      icon: "material-symbols:developer-mode-tv-outline-rounded",
      title: "Web Development",
    },
    {
      icon: "carbon:application-web",
      title: "Web Apps",
    },
    {
      icon: "streamline-pixel:ui-design-website",
      title: "UX Design",
    },
    {
      icon: "carbon:development",
      title: "CMS Development",
    },
  ];
  const imageDetails = [
    {
      icon: "game-icons:flexible-lamp",
      title: "Flexible & Friendly",
    },
    {
      icon: "clarity:language-line",
      title: "Multilanguage",
    },
    {
      icon: "streamline-ultimate:responsive-design",
      title: "Responsive Design",
    },
  ];
  const boxesData = [
    {
      id:"01",
      title:"Consultation & Requirement Gathering"
    },
    {
      id:"02",
      title:"Research & Wireframing"
    },
    {
      id:"03",
      title:"UI Design"
    },
    {
      id:"04",
      title:"Testing & QA"
    },
    {
      id:"04",
      title:"Review & Feedback"
    },
  ]
  return (
    <div className="pt-20 px-[5%] flex items-start flex-col md:flex-row gap-4">
      <div className="w-full md:w-[395px] border border-stroke rounded-lg px-3 py-5">
        <h3 className="text-white text-[1.1rem] font-semibold">
          More projects
        </h3>
        {sideData.map((data, index) => (
          <div
            key={index}
            className="border border-stroke bg-background2 rounded-md p-4 mt-4 flex items-center gap-4"
          >
            <Icon
              icon={data.icon}
              width="30"
              height="30"
              style={{ color: "#fff" }}
            />
            <span className="font-medium text-white text-[1.1rem]">
              {data.title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <div className="w-full h-[25rem] border border-stroke rounded-xl overflow-hidden relative">
          <Image
            src="/details-ex.png"
            width="200"
            height="200"
            alt="ui "
            className="w-full h-full"
          />
          <div className="absolute border border-stroke rounded-tl-lg  bottom-0 right-0 p-5 flex justify-between items-center flex-wrap gap-4 w-full md:w-[80%] h-[7rem] md:h-[5.6rem] bg-background2">
            {imageDetails.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <Icon
                  icon={data.icon}
                  width="30"
                  height="30"
                  className="text-main md:w-[30px] w-[25px]  h-[25px] md:h-[30px]"
                />
                <span className="text-[0.9rem]  font-semibold text-white">
                  {data.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <h3 className="mt-6 text-[1.5rem] font-semibold text-white">
          Create your website with us!
        </h3>
    
        <p className="mt-4 text-body  text-base">
          We create modern and user-friendly UI designs that focus on both
          aesthetics and functionality. Our goal is to deliver clean, engaging,
          and intuitive interfaces that enhance user experience and reflect your
          brand identity. Each project is tailored to meet business goals while
          ensuring a seamless interaction for users
        </p>
        <h3 className="mt-6 text-[1.5rem] font-semibold text-white">
        Benefits you can get
        </h3>
        <div className="grid grid-cols-2 grid-rows-4 gap-4 mt-8 border-t border-t-stroke/30 border-b py-8 border-b-stroke/30">
          {[
            "Professional and modern design.",
            "SEO friendly structure.", 
            "User friendly interfaces.",
            "Increased customer engagement.",
            "Improved user experience.",
            "Scalable and flexible solutions.",
            "Faster website performance.",
            "Secure and reliable platforms.",
            "Responsive on all devices.",
            "Ongoing support and maintenance.",
          ].map((data, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
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
        <h3 className="mt-6 text-[1.5rem] font-semibold text-white">
      UI Design Project
        </h3>
      
        <div className="flex items-center gap-5 flex-wrap">
          {
            Array.from({length:3}).map((_,index)=>(
              <Link key={index} href='/projects/details/ss' className="flex-1 min-w-[250px] mt-4 h-[13rem] rounded-lg overflow-hidden">
              <Image
                  src="/details-ex.png"
                  width="200"
                  height="200"
                  alt="project"
                  className="w-full h-full"
                />
              </Link>
            ))
          }
        </div>
         <h3 className="mt-6 text-[1.5rem] font-semibold text-white">
        How it Works
        </h3>
        <p className="mt-4 text-body  text-base">
        We understand your goals, design intuitive interfaces, refine them with your feedback, and deliver a final UI ready for development
        </p>
        <div className="grid grid-cols-6 grid-rows-2 gap-3 mt-5">
          {
            boxesData.map((data , index)=>(
              <div key={index} className={`border border-stroke bg-background2 p-5 rounded-md ${index === 0 || index ===  1 ? "col-span-3" : "md:col-span-2 col-span-3"} ${index === 4 && "md:col-span-2 col-span-6"}` }>
                <h2 className="text-[1.5rem] font-semibold text-white">{data.id}</h2>
                <p className="text-body text-base">{data.title}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSection2;
