import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

const ContactSection2 = () => {
  const boxesData = [
    {
      icon: "mdi:address-marker",
      title: "Location",
      disc: "Location Puputan Renon East ST. 1190 Denpasar, Bali",
    },
    {
      icon: "solar:phone-bold",
      title: "Phone",
      disc: "Just Call On This Number(+62) 123-321-543",
    },
    {
      icon: "mdi:email",
      title: "Email",
      disc: "Sunmed@support.com Sunmed@production.com",
    },
    {
      icon: "streamline:web",
      title: "Website",
      disc: "Contact with us in our website Sunmedagency.com",
    },
  ];
  return (
    <>
      <div className="px-[5%] py-20 flex md:flex-row flex-col  items-start gap-12">
        <div className="flex-1">
          <p className="text-[1.1rem] font-medium text-main">Get In Touch</p>
          <h3 className="text-[1.9rem] mt-4 font-semibold text-white">
            Got Any Questions​
          </h3>
          <p className="text-body text-base mt-4 max-w-[500px]">
            Lorem ipsum dolor sit amet consectetur. Tincidunt egestas
            ullamcorper{" "}
          </p>
          <div className="grid mt-8 grid-cols-2 grid-rows-2  gap-5">
            {boxesData.map((data, index) => (
              <div
                style={{
                  background:
                    "linear-gradient(180deg , rgba(193, 97, 201, 0.15) -16.04%, rgba(0, 0, 0, 0) 100%), rgba(39, 40, 75, 0.3)",
                }}
                key={index}
                className=" p-5 border md:rounded-lg rounded-2xl border-stroke "
              >
                <div className="flex items-center gap-4">
                  <Icon
                    icon={data.icon}
                    width="36"
                    height="36"
                    style={{ color: "#fff" }}
                  />
                  <h4 className="text-base font-semibold text-white">
                    {data.title}
                  </h4>
                </div>
                <p className="md:text-[0.9rem] text-[0.8rem] text-body mt-3">
                  {data.disc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <form className="flex-1">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px]  grid gap-3">
              <label
                htmlFor="name"
                className="text-base text-white font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="border border-main rounded-3xl text-white outline-none active:border-white p-3 bg-transparent"
              />
            </div>
            <div className="flex-1  min-w-[250px] grid gap-3">
              <label
                htmlFor="email"
                className="text-base text-white font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="border border-main rounded-3xl text-white outline-none active:border-white p-3 bg-transparent"
              />
            </div>
          </div>
          <div className="w-full mt-4 grid gap-3">
            <label
              htmlFor="subject"
              className="text-base text-white font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              className="border border-main rounded-3xl text-white outline-none active:border-white p-3 bg-transparent"
            />
          </div>
          <div className="w-full mt-4 grid gap-3">
            <label
              htmlFor="messgae"
              className="text-base text-white font-medium"
            >
              Message
            </label>
            <textarea
              id="messgae"
              placeholder="Messgae"
              className="border border-main h-44 text-white outline-none active:border-white rounded-3xl p-3 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-main text-black text-base font-medium rounded-3xl p-3 hover-main duration-200 w-full text-center mt-6"
          >
            Send message
          </button>
        </form>
      </div>
      <div className="w-[90%] h-[470px] mx-auto my-20">
        <Image
          src="/map.png"
          height={470}
          alt="contact us"
          width={200}
          className="w-full h-full object-cover rounded-lg md:rounded-none"
        />
      </div>
    </>
  );
};

export default ContactSection2;
