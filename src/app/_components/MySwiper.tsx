"use client";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/thumbs";
// @ts-ignore
import "swiper/css/free-mode";
import "./MySwiper.css";

interface imagesType {
  listOfImages?: string[];
  isProductDetails?: boolean;
}

export default function MySwiper({
  listOfImages,
  isProductDetails = false,
}: imagesType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      {isProductDetails ? (
        /* ===== Product Details ===== */
        <div className="product-swiper-wrapper">
          {/* Main Image Swiper */}
          <Swiper
            className="product-main-swiper"
            modules={[Pagination, Thumbs]}
            slidesPerView={1}
            loop
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            pagination={{
              clickable: true,
              el: ".product-custom-pagination",
            }}
          >
            {listOfImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden h-72 md:h-[420px]">
                  <img
                    className="h-full w-full object-contain"
                    src={img}
                    alt={`product-${index}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dots inside — below main image */}
          <div className="product-custom-pagination" />

          {/* Thumbnails horizontal scrollable strip */}
          <Swiper
            className="product-thumbs-swiper"
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={"auto"}
            freeMode
            watchSlidesProgress
          >
            {listOfImages?.map((img, index) => (
              <SwiperSlide key={index} className="product-thumb-slide">
                <div className="product-thumb-item">
                  <img src={img} alt={`thumb-${index}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        /* ===== Hero Swiper (Home) ===== */
        <div className="hero-swiper-wrapper">
          <Swiper
            className="w-full"
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            loop
            pagination={{ clickable: true }}
          >
            {listOfImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-64 overflow-hidden sm:h-80 md:h-96 lg:h-[420px]">
                  <img
                    className="h-full w-full object-cover"
                    src={img}
                    alt={`slide-${index}`}
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00C950dd] to-[#05DF7260]" />
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-lg">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-100 sm:text-sm">
                        Limited Time Offer
                      </p>
                      <h4 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                        Fresh Products Delivered to your Door
                      </h4>
                      <p className="mt-2 text-sm font-medium text-green-100 sm:text-base">
                        Get 20% off your first order
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button className="rounded-lg border-2 border-white bg-white px-5 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50 sm:text-base">
                          Shop now
                        </button>
                        <button className="rounded-lg border-2 border-white/60 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base">
                          View deals
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}