"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { categories, priceRanges, brands, tags } from "@/constants";
import SampleProduct from "./SampleProduct";
import CustomRadioInput from "./CustomRadioInput";

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] =
    useState("Electronic Devices");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Price");
  const [minPrice, setMinPrice] = useState(250);
  const [maxPrice, setMaxPrice] = useState(750);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      const newBrands = prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];

      return newBrands;
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];

      return newTags;
    });
  };

  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const minPriceLimit = 0;
  const maxPriceLimit = 1000;

  const getPositionFromPrice = (price: number) => {
    return ((price - minPriceLimit) / (maxPriceLimit - minPriceLimit)) * 100;
  };

  const getPriceFromPosition = (position: number) => {
    const price =
      (position / 100) * (maxPriceLimit - minPriceLimit) + minPriceLimit;
    return Math.round(price);
  };

  const handleMouseDown = (handle: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      const newPrice = getPriceFromPosition(
        Math.max(0, Math.min(100, position))
      );

      if (isDragging === "min") {
        setMinPrice(Math.min(newPrice, maxPrice - 10));
      } else {
        setMaxPrice(Math.max(newPrice, minPrice + 10));
      }
    },
    [isDragging, minPrice, maxPrice]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPosition = getPositionFromPrice(minPrice);
  const maxPosition = getPositionFromPrice(maxPrice);

  return (
    <aside className="w-full p-4 text-sm sticky top-0 max-h-screen overflow-y-auto">
      {/* Category */}
      <div className="mb-6 border-b border-[#E4E7E9] pb-6">
        <h3 className="font-public-sans font-medium text-[#191C1F] mb-4 text-base">
          CATEGORY
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <CustomRadioInput
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={handleCategoryChange}
                label={cat}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-[#E4E7E9] pb-6">
        <h3 className="font-public-sans font-medium text-[#191C1F] mb-4 text-base">
          PRICE RANGE
        </h3>

        <div className="relative py-4">
          {/* Track */}
          <div
            ref={sliderRef}
            className="relative h-[2px] bg-[#E4E7E9] rounded-full cursor-pointer"
          >
            {/* Active range */}
            <div
              className="absolute h-full bg-[#22A24F] rounded-full"
              style={{
                left: `${minPosition}%`,
                width: `${maxPosition - minPosition}%`,
              }}
            />

            {/* Min handle */}
            <div
              className={`absolute w-3 h-3 bg-white border-2 border-[#22A24F] rounded-full cursor-grab transform -translate-y-[5px] -translate-x-3 transition-shadow ${
                isDragging === "min"
                  ? "shadow-lg cursor-grabbing"
                  : "hover:shadow-md"
              }`}
              style={{ left: `${minPosition}%` }}
              onMouseDown={handleMouseDown("min")}
            />

            {/* Max handle */}
            <div
              className={`absolute w-3 h-3 bg-white border-2 border-[#22A24F] rounded-full cursor-grab transform -translate-y-[5px] -translate-x-3 transition-shadow ${
                isDragging === "max"
                  ? "shadow-lg cursor-grabbing"
                  : "hover:shadow-md"
              }`}
              style={{ left: `${maxPosition}%` }}
              onMouseDown={handleMouseDown("max")}
            />
          </div>

          {/* Price labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>${minPriceLimit}</span>
            <span>${maxPriceLimit}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 h-10">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-1/2 px-2 h-full py-1 border border-[#E4E7E9] rounded-lg text-[#77878F] text-xs bg-transparent outline-none"
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-1/2 px-2 h-full py-1 border border-[#E4E7E9] rounded-lg text-xs bg-transparent text-[#77878F] outline-none"
          />
        </div>
        <ul className="space-y-2">
          {priceRanges.map((price) => (
            <li key={price}>
              <CustomRadioInput
                name="price"
                value={price}
                checked={selectedPriceRange === price}
                onChange={setSelectedPriceRange}
                label={price}
                labelActiveColor="text-gray-700"
                labelInactiveColor="text-gray-700"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Brands */}
      <div className="mb-6 border-b border-[#E4E7E9] pb-6">
        <h3 className="font-public-sans font-medium text-[#191C1F] mb-4 text-base">
          POPULAR BRANDS
        </h3>
        <ul className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <li key={brand}>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  {/* Hidden native checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="sr-only"
                  />

                  {/* Custom checkbox */}
                  <div
                    className={`w-5 h-5 border rounded-lg transition-all duration-200 flex items-center justify-center ${
                      selectedBrands.includes(brand)
                        ? "bg-[#22A24F] border-[#22A24F]"
                        : "bg-white border-[#C9CFD2] hover:border-[#22A24F]"
                    }`}
                  >
                    {/* Checkmark icon */}
                    {selectedBrands.includes(brand) && (
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8125 1.9375L4.6875 8.0625L1.625 5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <span
                  className={`text-sm ${
                    selectedBrands.includes(brand)
                      ? "text-gray-800 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {brand}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-public-sans font-medium text-[#191C1F] mb-4 text-base">
          POPULAR TAG
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-[#FFF3EB] text-[#22A24F] border-[#22A24F] hover:bg-[#FFF3EB]"
                  : "bg-white text-[#191C1F] border-[#E4E7E9] hover:border-[#22A24F] hover:text-[22A24F]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <SampleProduct />
    </aside>
  );
}