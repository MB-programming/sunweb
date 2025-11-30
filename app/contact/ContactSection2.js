"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState } from "react";
import { useBookingMutations } from "../lib/hooks/useBookings";
import { toast } from "react-toastify";

const ContactSection2 = () => {
  const { createBooking, loading } = useBookingMutations();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // Submit contact form as a booking without service_id
      await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        message: `Subject: ${formData.subject || "No subject"}\n\n${formData.message}`,
        service_id: "" // Empty since it's a general contact
      });

      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const boxesData = [
    {
      icon: "mdi:address-marker",
      title: "Location",
      disc: "Location Puputan Renon East ST. 1190 Denpasar, Bali",
    },
    {
      icon: "solar:phone-bold",
      title: "Phone",
      disc: "Just Call On This Number (+62) 123-321-543",
    },
    {
      icon: "mdi:email",
      title: "Email",
      disc: "Sunmed@support.com Sunmed@production.com",
    },
    {
      icon: "streamline:web",
      title: "Website",
      disc: "Contact with us on our website Sunmedagency.com",
    },
  ];

  return (
    <>
      <div className="px-[5%] py-20 flex md:flex-row flex-col items-start gap-12">
        <div className="flex-1">
          <p className="text-[1.1rem] font-medium text-main">Get In Touch</p>
          <h3 className="text-[1.9rem] mt-4 font-semibold text-white">
            Got Any Questions​
          </h3>
          <p className="text-body text-base mt-4 max-w-[500px]">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="grid mt-8 grid-cols-2 grid-rows-2 gap-5">
            {boxesData.map((data, index) => (
              <div
                style={{
                  background:
                    "linear-gradient(180deg , rgba(193, 97, 201, 0.15) -16.04%, rgba(0, 0, 0, 0) 100%), rgba(39, 40, 75, 0.3)",
                }}
                key={index}
                className="p-5 border md:rounded-lg rounded-2xl border-stroke hover:border-main transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <Icon
                    icon={data.icon}
                    width="36"
                    height="36"
                    className="text-white group-hover:text-main transition-colors"
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

        <form onSubmit={handleSubmit} className="flex-1 animate-fadeIn">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px] grid gap-3">
              <label
                htmlFor="name"
                className="text-base text-white font-medium"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="border border-stroke focus:border-main rounded-3xl text-white outline-none p-3 bg-white/5 transition-colors"
                required
              />
            </div>
            <div className="flex-1 min-w-[250px] grid gap-3">
              <label
                htmlFor="email"
                className="text-base text-white font-medium"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="border border-stroke focus:border-main rounded-3xl text-white outline-none p-3 bg-white/5 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap mt-4">
            <div className="flex-1 min-w-[250px] grid gap-3">
              <label
                htmlFor="phone"
                className="text-base text-white font-medium"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="border border-stroke focus:border-main rounded-3xl text-white outline-none p-3 bg-white/5 transition-colors"
              />
            </div>
            <div className="flex-1 min-w-[250px] grid gap-3">
              <label
                htmlFor="subject"
                className="text-base text-white font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="border border-stroke focus:border-main rounded-3xl text-white outline-none p-3 bg-white/5 transition-colors"
              />
            </div>
          </div>

          <div className="w-full mt-4 grid gap-3">
            <label
              htmlFor="message"
              className="text-base text-white font-medium"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="border border-stroke focus:border-main h-44 text-white outline-none rounded-3xl p-3 bg-white/5 transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-main text-black text-base font-medium rounded-3xl p-3 hover-main duration-200 w-full text-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Icon icon="mdi:loading" className="animate-spin" width="20" />
                Sending...
              </>
            ) : (
              <>
                <Icon icon="mdi:send" width="20" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      <div className="w-[90%] h-[470px] mx-auto my-20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src="/map.png"
          height={470}
          alt="contact us location map"
          width={200}
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default ContactSection2;
