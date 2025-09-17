import ZapIcon from "../assets/svgs/zap";
import StarIcon from "../assets/svgs/star";
import PercentIcon from "../assets/svgs/percent";
import PromotionIcon from "../assets/svgs/promotion";
import GiftIcon from "../assets/svgs/gift";
import StoreIcon from "../assets/svgs/store";
import HeadPhones from "../assets/svgs/headphones";
import { BannerItem } from "@/types";

export const navLinks = [
  //   { label: "All Categories", icon: <MenuIcon />, href: "#" },
  { label: "Today's Deals", icon: <ZapIcon />, href: "#" },
  { label: "New Arrivals", icon: <StarIcon />, href: "#" },
  { label: "Clearance Deals", icon: <PercentIcon />, href: "#" },
  { label: "Promotions", icon: <PromotionIcon />, href: "#" },
  { label: "Gift Cards", icon: <GiftIcon />, href: "#" },
  { label: "Sell on BAZAR", icon: <StoreIcon />, href: "#" },
  { label: "Customer Service", icon: <HeadPhones />, href: "#" },
];

export const PRODUCTS_PER_PAGE = 12;

export const bannerItems: BannerItem[] = [
  {
    id: 1,
    title: "Best Deal Online on smart watches",
    subtitle: "SMART WEARABLE",
    discount: "UP to 80% OFF",
    image: "/images/smart-watch.png",
    ctaText: "Shop Now",
    bgColor: "bg-gradient-to-r from-[#212844] via-[#212844] to-[#3C466B]",
  },
  {
    id: 2,
    title: "Latest Smart Watch Collection",
    subtitle: "NEW ARRIVALS",
    discount: "UP to 70% OFF",
    image: "/images/smart-watch.png",
    ctaText: "Discover",
    bgColor: "bg-gradient-to-r from-[#212844] via-[#212844] to-[#3C466B]",
  },
  {
    id: 3,
    title: "Premium Smart Watches",
    subtitle: "LUXURY COLLECTION",
    discount: "UP to 60% OFF",
    image: "/images/smart-watch.png",
    ctaText: "Explore",
    bgColor: "bg-gradient-to-r from-[#212844] via-[#212844] to-[#3C466B]",
  },
];

export const categories = [
  "Electronic Devices",
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
  "TV & Home Appliances",
  "Watches & Accessories",
  "GPS & Navigation",
  "Wearable Technology",
];

export const priceRanges = [
  "All Price",
  "Under $20",
  "$25 to $100",
  "$100 to $300",
  "$300 to $500",
  "$500 to $1,000",
  "$1,000 to $10,000",
];

export const brands = [
  "Apple",
  "Google",
  "Microsoft",
  "Samsung",
  "Dell",
  "HP",
  "Symphony",
  "Xiaomi",
  "Sony",
  "Panasonic",
  "LG",
  "Intel",
  "One Plus",
];

export const tags = [
  "Game",
  "iPhone",
  "TV",
  "Asus Laptops",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Power Bank",
  "Smart TV",
  "Speaker",
  "Tablet",
  "Microwave",
  "Samsung",
];

export const footerData = {
  company: {
    name: "Company",
    description:
      "BAZAR brings everything you need in one place from daily essentials to luxury.",
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { name: "Shop", href: "#" },
      { name: "Categories", href: "#" },
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  customerService: {
    title: "Customer Service",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "FAQs", href: "#" },
    ],
  },
  followUs: {
    title: "Follow Us",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "FAQs", href: "#" },
    ],
  },
};
