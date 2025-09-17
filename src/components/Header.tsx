"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import LocationIcon from "@/assets/svgs/location";
import DropdownIcon from "@/assets/svgs/dropdown";
import SearchIcon from "@/assets/svgs/search";
import { setSearchQuery } from "@/slices/searchSlice";
import UserIcon from "@/assets/svgs/user";
import LikeIcon from "@/assets/svgs/like";
import CartIcon from "@/assets/svgs/cart";
import { navLinks } from "@/constants";
import MenuIcon from "@/assets/svgs/menu";
import { useState, useEffect } from "react";
import CartModal from "./CartModal";
import FavoritesModal from "./FavoritesModal";
import SearchInput from "./SearchInput";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector((s: RootState) =>
    s.cart.items.reduce((acc, i) => acc + i.quantity, 0)
  );
  const favoritesCount = useSelector(
    (s: RootState) => s.favorites.items.length
  );
  const searchQuery = useSelector((state: RootState) => state?.search?.query);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 right-0 bg-white shadow-md z-30">
      <div className="w-full max-w-7xl md:w-[75%] px-4 sm:px-6 lg:px-8 mx-auto h-[77px] bg-transparent flex justify-between items-center gap-4 sm:gap-6 lg:gap-10 min-[1400px]:gap-12 min-[1400px]:h-[88px]">
        <div className="flex items-center gap-4 min-[1400px]:gap-6">
          <Link href="/" className="text-2xl font-bold hidden md:block">
            <Image
              src="/images/Logo.svg"
              alt="Kuadratik Logo"
              width={150}
              height={40}
            />
          </Link>

          <Link href="/" className="text-2xl font-bold block md:hidden">
            <Image
              src="/images/Logo.svg"
              alt="Kuadratik Logo"
              width={100}
              height={30}
            />
          </Link>

          <div className="hidden md:flex items-center gap-2 min-[1400px]:gap-4">
            <LocationIcon />
            <div className="font-inter font-medium text-[#111111] text-sm min-[1400px]:text-base text-nowrap">
              61 Hopper Street..
            </div>
            <DropdownIcon />
          </div>
        </div>

        {/* Desktop Search Input */}
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <div className="flex items-center gap-2 sm:gap-4 min-[1400px]:gap-6">
          <button
            className="w-11 h-10 rounded-lg p-2.5 flex items-center justify-center bg-[#F5F5F5] block sm:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <SearchIcon />
          </button>
          <button className="w-[72px] h-[40px] rounded-lg p-[10px] md:flex items-center gap-[10px] bg-[#F5F5F5] hidden">
            <span className="font-inter font-medium text-[#111111]">EN</span>
            <DropdownIcon />
          </button>
          <button className="w-11 h-10 rounded-lg p-2.5 flex items-center justify-center bg-[#F5F5F5]">
            <UserIcon />
          </button>
          <button
            className="w-11 h-10 rounded-lg p-2.5 flex items-center justify-center bg-[#F5F5F5] relative"
            onClick={() => setIsFavoritesOpen(true)}
          >
            <LikeIcon />
            {isClient && favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            className="w-11 h-10 rounded-lg p-2.5 flex items-center justify-center bg-[#F5F5F5] relative"
            onClick={() => setIsCartOpen(true)}
          >
            <CartIcon />
            {isClient && count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      {showMobileSearch && (
        <div className="w-full px-4 py-3 bg-white shadow-md sm:hidden">
          {/* Mobile Search Input */}
          <SearchInput
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            isMobile
          />
        </div>
      )}
      <div className="w-full h-[58px] bg-[#F9F9F9] shadow shadow-[#00000014] hidden md:block">
        <div className="w-full max-w-7xl md:w-[75%] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide hover:scrollbar-default">
          <div className="flex items-center gap-2 hover:text-blue-600 whitespace-nowrap flex-shrink-0">
            <span className="text-gray-500">
              <MenuIcon />
            </span>
            <div className="font-medium font-inter text-[#111111] text-sm min-[1400px]:text-base text-nowrap">
              All Categories
            </div>

            <button>
              <DropdownIcon />
            </button>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center gap-1 hover:text-blue-600 whitespace-nowrap"
              >
                {link.icon && (
                  <span className="text-gray-500">{link.icon}</span>
                )}
                <div className="font-medium font-inter text-[#111111] text-sm min-[1400px]:text-base text-nowrap">
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      {isFavoritesOpen && (
        <FavoritesModal onClose={() => setIsFavoritesOpen(false)} />
      )}{" "}
      {/* Render FavoritesModal */}
    </header>
  );
};

export default Header;
