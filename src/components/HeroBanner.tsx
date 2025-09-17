"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { bannerItems } from "@/constants";
import heroBg from "@/assets/backgrounds/hero-bg.png";
import CarouselButton from "./CarouselButton";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerItems.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentSlide((prev) =>
        prev === bannerItems.length - 1 ? 0 : prev + 1
      );
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentSlide((prev) =>
        prev === 0 ? bannerItems.length - 1 : prev - 1
      );
    }
  }, [touchStart, touchEnd]);

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Navigate slides
  const goToNext = () => {
    setCurrentSlide((prev) => (prev === bannerItems.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerItems.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-80 md:h-[316px] rounded-2xl">
      <div className="overflow-hidden h-full w-full rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {bannerItems.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-full h-full ${item.bgColor} flex flex-col md:flex-row items-center justify-between pl-10 md:pl-20 text-white`}
            >
              {/* Text Content */}
              <div className="flex flex-col justify-between w-full h-full md:w-[60%] text-center md:text-left py-10">
                <div>
                  <p className="font-hk-grotesk text-[20px] lg:text-[30px] min-[1400px]:text-[30px] font-semibold tracking-wider leading-[30px]">
                    {item.title}
                  </p>
                  <h2 className="font-hk-grotesk text-[40px] lg:text-[50px] min-[1400px]:text-[63px] font-bold leading-[56px] lg:leading-[63px]">
                    {item.subtitle}
                  </h2>
                  <p className="font-hk-grotesk text-xl lg:text-[25px] min-[1400px]:text-[30px] font-semibold">
                    {item.discount}
                  </p>
                </div>

                {/* Dots Indicator */}
                <div className="transform flex space-x-2">
                  {bannerItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index ? "bg-white w-6" : "bg-white"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Image */}
              <div
                className="w-full md:w-[40%] flex justify-center mt-6 md:mt-0 opacity-90"
                style={{
                  backgroundImage: `url(${heroBg.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative w-48 h-48 md:w-[220px] md:h-[222px] lg:w-[250px] lg:h-[252px]">
                  <Image
                    src={item.image}
                    alt="Smart Watch"
                    fill
                    className="object-cover drop-shadow-2xl w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <CarouselButton direction="prev" onClick={goToPrev} />
        <CarouselButton direction="next" onClick={goToNext} />
      </div>
    </div>
  );
};

export default HeroBanner;
