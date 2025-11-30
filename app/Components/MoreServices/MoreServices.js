"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const MoreServices = () => {
  const services = [
    {
      icon: "iconoir:design-pencil",
      title: "UI Design",
      link: "/services",
    },
    {
      icon: "material-symbols:code",
      title: "Web Development",
      link: "/services",
    },
    {
      icon: "carbon:application-web",
      title: "Web Apps",
      link: "/services",
    },
    {
      icon: "streamline:interface-edit-magic-wand-design-magic-star-supplies-wand",
      title: "UX Design",
      link: "/services",
    },
    {
      icon: "carbon:content-delivery-network",
      title: "CMS Development",
      link: "/services",
    },
  ];

  return (
    <div className="w-full border border-stroke rounded-lg px-3 py-5 bg-background2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-[1.1rem] font-semibold">More Services</h3>
        <Link
          href="/services"
          className="text-main text-sm hover:underline flex items-center gap-1"
        >
          View All
          <Icon icon="mdi:arrow-right" width="16" />
        </Link>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.link}
            className="border border-stroke bg-background rounded-md p-4 flex items-center gap-4 hover:border-main hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="bg-main/10 p-2 rounded-lg group-hover:bg-main/20 transition-colors">
              <Icon
                icon={service.icon}
                width="30"
                height="30"
                className="text-main group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="font-medium text-white text-[1rem] group-hover:text-main transition-colors">
              {service.title}
            </span>
            <Icon
              icon="mdi:chevron-right"
              width="20"
              className="ml-auto text-body group-hover:text-main transition-colors"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreServices;
