import React from "react";
import { BannerItem } from "@/types";

interface CarouselDotsProps {
  bannerItems: BannerItem[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  bannerItems,
  currentSlide,
  goToSlide,
}) => {
  return (
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
  );
};

export default CarouselDots;