import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import RatingStars from "./RatingStars";
import ProductActionButtons from "./ProductActionButtons";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ product }));
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div
        key={product.id}
        className="bg-white border border-[#E4E7E9] rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative mb-4">
          <div
            className={`aspect-square rounded-lg  flex items-center justify-center relative overflow-hidden`}
          >
            <Image
              src={product?.images[0]}
              alt={product?.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover h-full md:h-[150px] w-full hover:opacity-40 transition-opacity duration-300"
            />

            {/* Action buttons */}
            <ProductActionButtons
              onAddToCart={handleAddToCart}
              productId={product.id}
            />
          </div>
        </div>

        {/* Rating */}
        <RatingStars rating={product?.rating || 0} />

        {/* Product Name */}
        <h3 className="font-public-sans text-sm text-[#191C1F] mb-1 line-clamp-2 leading-[20px]">
          {product?.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-public-sans text-sm font-semibold text-[#22A24F]">
            ${product?.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
