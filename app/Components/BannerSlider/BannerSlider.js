"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useBanners } from "@/app/lib/hooks/useBanners";
import { Icon } from "@iconify/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BannerSlider = () => {
  const { banners, loading, error } = useBanners();

  // Filter only active banners and sort by order
  const activeBanners = banners
    ?.filter(banner => banner.status === 'active')
    ?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

  if (loading) {
    return (
      <div className="w-full border border-stroke rounded-lg p-6 bg-background2 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
        <div className="h-48 bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error || activeBanners.length === 0) {
    return null; // Don't show anything if there's an error or no banners
  }

  return (
    <div className="w-full border border-stroke rounded-lg overflow-hidden bg-background2">
      <div className="px-4 py-3 border-b border-stroke">
        <h3 className="text-white text-[1.1rem] font-semibold">Advertisements</h3>
      </div>

      <div className="p-4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={activeBanners.length > 1}
          modules={[Autoplay, Pagination, Navigation]}
          className="banner-swiper"
          style={{
            "--swiper-pagination-color": "#54EECC",
            "--swiper-navigation-color": "#54EECC",
          }}
        >
          {activeBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link
                href={banner.link || "#"}
                target={banner.link?.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden bg-gray-800">
                  {banner.image ? (
                    <Image
                      src={banner.image}
                      alt={banner.title || "Advertisement"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon icon="mdi:image" className="text-gray-600" width="64" />
                    </div>
                  )}

                  {/* Overlay with info */}
                  {(banner.title || banner.description) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      {banner.title && (
                        <h4 className="text-white font-semibold text-base mb-1">
                          {banner.title}
                        </h4>
                      )}
                      {banner.description && (
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {banner.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Link indicator */}
                  <div className="absolute top-3 right-3 bg-main/90 text-black px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon icon="mdi:external-link" width="16" className="inline mr-1" />
                    Visit
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .banner-swiper .swiper-pagination {
          bottom: 10px !important;
        }

        .banner-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          background: var(--swiper-pagination-color);
        }

        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          width: 35px;
          height: 35px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }

        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;
