import Image from "next/image";
import React from "react";
import { footerData } from "@/constants";
import FooterLinkSection from "./FooterLinkSection"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E1E] text-white">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl md:w-[75%] mx-auto px-3 md:px-0 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/footer-logo.svg"
                alt="footer Logo"
                width={120} 
                height={32} 
                className="object-cover w-auto h-auto" 
              />
            </div>
            <p className="font-inter text-white text-sm leading-relaxed max-w-xs">
              {footerData.company.description}
            </p>
          </div>

          <FooterLinkSection
            title={footerData.quickLinks.title}
            links={footerData.quickLinks.links}
          />

          <FooterLinkSection
            title={footerData.customerService.title}
            links={footerData.customerService.links}
          />

          <FooterLinkSection
            title={footerData.followUs.title}
            links={footerData.followUs.links}
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="font-inter text-[#BBBBBB] text-sm">
              © {currentYear} BAZAR. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}