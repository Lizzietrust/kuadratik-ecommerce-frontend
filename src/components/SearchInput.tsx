import React from "react";
import SearchIcon from "@/assets/svgs/search";

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  handleSearchChange,
  isMobile = false,
}) => {
  return (
    <div
      className={`flex-1 h-[40px] rounded-lg border border-[#E0E0E0] px-4 flex items-center gap-2 bg-[#F9F9F9] ${
        isMobile ? "" : "hidden md:flex sm:max-w-xs"
      }`}
    >
      <button>
        <SearchIcon />
      </button>

      <input
        type="text"
        placeholder="Search for products…"
        className="flex-1 bg-transparent outline-none h-full font-inter font-medium text-[#555555] text-sm"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
