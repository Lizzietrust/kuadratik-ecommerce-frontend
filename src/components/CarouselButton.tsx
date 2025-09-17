import React from "react";

interface CarouselButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  onClick,
}) => {
  const isPrev = direction === "prev";
  const iconPath = isPrev ? "M15.5 5L8.5 12L15.5 19" : "M8.5 5L15.5 12L8.5 19";
  const ariaLabel = isPrev ? "Previous slide" : "Next slide";
  const positionClasses = isPrev
    ? "left-0 -translate-x-1/2"
    : "right-0 translate-x-1/2";

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClasses} top-1/2 transform -translate-y-1/2 bg-[#F3F9FB] text-white p-2 rounded-full transition-all w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] min-[1400px]:w-[86px] min-[1400px]:h-[86px] flex items-center justify-center z-20 border-6 border-white shadow-2xl`}
      aria-label={ariaLabel}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={iconPath}
          stroke="#008ECC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default CarouselButton;
