import React from "react";

interface ProductActionButtonProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  bgColor?: string;
}

const ProductActionButton: React.FC<ProductActionButtonProps> = ({
  icon,
  onClick,
  bgColor = "bg-white",
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 min-[1400px]:w-12 min-[1400px]:h-12 ${bgColor} rounded-full flex items-center justify-center transition-colors`}
    >
      {icon}
    </button>
  );
};

export default ProductActionButton;
