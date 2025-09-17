import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  error,
  currentPage,
  setCurrentPage,
}) => {
  const [sortBy, setSortBy] = useState("Most Popular");
  const [activeFilters, setActiveFilters] = useState([
    "Electronics Devices",
    "5 Star Rating",
  ]);

  const sortOptions = [
    "Most Popular",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Best Rating",
  ];

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const totalPages = 6;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status" className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div>Failed to load products.</div>;
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-inter text-sm text-[#191C1F]">Sort by:</span>
            <div className="relative w-[180px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 border border-[#E4E7E9] rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 6L8 11L3 6"
                    stroke="#ADB7BC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-11 rounded-lg hidden md:flex items-center justify-between px-6 mb-4 bg-[#F9F9F9]">
        <div className="flex items-center gap-3">
          <span className="font-public-sans text-sm text-[#5F6C72]">
            Active Filters:
          </span>
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-2.5 text-sm text-[#191C1F] font-public-sans"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.375 2.625L2.625 9.375"
                    stroke="#929FA5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.375 9.375L2.625 2.625"
                    stroke="#929FA5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="text-sm text-[#5F6C72] font-public-sans">
          <span className="font-semibold text-gray-900 teext-[#191C1F]">
            69,867
          </span>{" "}
          Results found.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </div>

      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full border-[1.5] flex items-center justify-center transition-all duration-200 ${
              currentPage === 1
                ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-[#22A24F] text-[#22A24F] hover:bg-green-50"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.25 12H3.75"
                stroke="#22A24F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5 5.25L3.75 12L10.5 18.75"
                stroke="#22A24F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-200 ${
                currentPage === page
                  ? "bg-[#22A24F] text-white"
                  : "bg-transparent text-[#191C1F] hover:bg-gray-200 border border-[#E4E7E9]"
              }`}
            >
              {page.toString().padStart(2, "0")}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-green-500 text-green-500 hover:bg-green-50"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#22A24F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 5.25L20.25 12L13.5 18.75"
                stroke="#22A24F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
