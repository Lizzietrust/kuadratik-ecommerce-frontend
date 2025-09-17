import Link from "next/link";
import React from "react";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinkSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-inter font-bold text-base mb-4">
        {title}
      </h4>
      <ul className="space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="font-inter text-white hover:text-white text-sm transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
