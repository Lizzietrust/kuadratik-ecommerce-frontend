import React from "react";
import CartIcon from "@/assets/svgs/cart";
import EyeIcon from "@/assets/svgs/eye";
import LikeIcon from "@/assets/svgs/like";

interface ProductActionButtonsProps {
  onAddToCart: (e: React.MouseEvent) => void;
  productId: number;
}

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({
  onAddToCart,
  // productId,
}) => {
  return (
    <div className="w-full h-[150px] flex items-center justify-center bg-[#00000033] gap-2 opacity-0 group-hover:opacity-80 transition-opacity rounded-none">
      <button
        onClick={onAddToCart}
        className="w-8 h-8 min-[1400px]:w-12 min-[1400px]:h-12 bg-white rounded-full flex items-center justify-center transition-colors"
      >
        <LikeIcon />
      </button>
      <button
        onClick={onAddToCart}
        className="w-8 h-8 min-[1400px]:w-12 min-[1400px]:h-12 bg-white rounded-full flex items-center justify-center transition-colors"
      >
        <CartIcon />
      </button>
      <button className="w-8 h-8 min-[1400px]:w-12 min-[1400px]:h-12 bg-[#22A24F] rounded-full flex items-center justify-center transition-colors">
        <EyeIcon />
      </button>
    </div>
  );
};

export default ProductActionButtons;
