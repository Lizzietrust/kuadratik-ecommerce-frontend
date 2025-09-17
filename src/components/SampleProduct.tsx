import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import watches from "@/assets/images/apple-watches.png";
import productDesc from "@/assets/images/desc-image.png";
import Image from "next/image";

export default function SampleProduct() {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    console.log("Added to cart!");
  };

  const handleViewDetails = () => {
    console.log("Viewing details...");
  };

  return (
    <div className="w-full">
      <div
        className="bg-white rounded-2xl border border-[#CACACA] p-6 min-[1400px]:p-8 shadow-sm hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative mb-6 flex justify-center">
          <Image
            src={watches}
            alt="Apple Watch"
            width={180}
            height={180}
            className={`transition-transform duration-300 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        </div>

        <div className="text-center mb-1">
          <Image
            src={productDesc}
            alt="Product Description"
            width={130}
            height={50}
            className="mx-auto"
          />
        </div>

        {/* Product Description */}
        <div className="text-center mb-4">
          <h3 className="text-base lg:text-lg min-[1400px]:text-2xl font-public-sans font-semibold text-gray-900">
            Heavy on Features.
          </h3>
          <p className="text-base lg:text-lg min-[1400px]:text-2xl font-public-sans font-semibold text-gray-900">
            Light on Price.
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-center mb-4 gap-1">
          <p className="font-public-sans text-sm text-[#475156]">Only for:</p>
          <div className="font-public-sans font-semibold text-[#191C1F] h-9 rounded-lg px-2 py-1.5 bg-[#CACACA]">
            $299 USD
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full h-12 bg-[#22A24F] hover:bg-[#1d8140] text-white font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.25 16.375C7.52614 16.375 7.75 16.5989 7.75 16.875C7.75 17.1511 7.52614 17.375 7.25 17.375C6.97386 17.375 6.75 17.1511 6.75 16.875C6.75 16.5989 6.97386 16.375 7.25 16.375Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M15.375 18.125C16.0654 18.125 16.625 17.5654 16.625 16.875C16.625 16.1846 16.0654 15.625 15.375 15.625C14.6846 15.625 14.125 16.1846 14.125 16.875C14.125 17.5654 14.6846 18.125 15.375 18.125Z"
                fill="white"
              />
              <path
                d="M4.30469 5.625H18.3203L16.2578 12.8438C16.1842 13.1057 16.0266 13.3363 15.8093 13.5C15.5919 13.6638 15.3268 13.7516 15.0547 13.75H7.57031C7.29819 13.7516 7.03308 13.6638 6.81572 13.5C6.59836 13.3363 6.44078 13.1057 6.36719 12.8438L3.53906 2.95313C3.50169 2.82246 3.42275 2.70754 3.3142 2.62578C3.20565 2.54401 3.0734 2.49986 2.9375 2.5H1.625"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ADD TO CART
          </button>

          {/* View Details Button */}
          <button
            onClick={handleViewDetails}
            className="w-full h-12 bg-transparent hover:bg-gray-50 text-[#22A24F] font-bold rounded-lg border-2 border-[#22A24F] transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            VIEW DETAILS
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
