"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/slices/favoritesSlice";
import { RootState } from "@/store";
import { useGetProductQuery } from "@/services/products";
import toast from "react-hot-toast";
import { Product } from "@/types";
import {
  ChevronUp,
  ChevronDown,
  ShoppingCart,
  Star,
  ThumbsUp,
  Truck,
  Info,
  Heart,
} from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Reviews } from "@/types";
import RatingBreakdown from "@/components/RatingBreakdown";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery(Number(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("specifications");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = product
    ? favorites.some((item) => item.id === product.id)
    : false;

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product: product as Product, quantity }));
      toast.success(`${quantity} of ${product.title} added to cart!`);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
        toast.success(`${product.title} removed from favorites!`);
      } else {
        dispatch(addToFavorites(product));
        toast.success(`${product.title} added to favorites!`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status" className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 w-full max-w-7xl md:w-[75%] py-8 font-inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {selectedImage && (
            <div className="border rounded-lg p-2 bg-white shadow-sm">
              <Image
                src={selectedImage}
                alt={product.title}
                width={600}
                height={600}
                className="object-contain rounded-md w-full h-auto aspect-square"
              />
            </div>
          )}
          <div className="flex mt-4 gap-3">
            {product.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`p-1 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-md w-20 h-20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold font-hk-grotesk text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-500 mt-3 text-base">{product.description}</p>

          <div className="flex items-center gap-4 my-5">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-700 font-bold ml-1.5">
                {product.rating}
              </span>
              <span className="text-gray-500 text-sm ml-1">
                ({product?.reviews?.length} reviews)
              </span>
            </div>
            <button
              onClick={handleToggleFavorite}
              className={`ml-4 p-2 rounded-full transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 my-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-800">
                $
                {(
                  product.price *
                  (1 - product?.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              {product?.discountPercentage > 0 && (
                <span className="text-xl font-medium text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="mt-1 text-sm font-semibold text-red-600">
                You save {product.discountPercentage}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 my-4">
            <label htmlFor="quantity" className="font-semibold text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center border rounded-lg bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-14 text-center font-semibold border-x"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {product?.stock} available
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.availabilityStatus !== "In Stock"}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200 ">
          <nav className="-mb-px flex gap-8 overflow-x-auto">
            <button
              className={`py-4 px-1 inline-flex items-center gap-2 text-base font-semibold whitespace-nowrap transition-all ${
                activeTab === "specifications"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              <Info className="w-5 h-5" />
              Specifications
            </button>
            <button
              className={`py-4 px-1 inline-flex items-center gap-2 text-base font-semibold whitespace-nowrap transition-all ${
                activeTab === "shipping"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("shipping")}
            >
              <Truck className="w-5 h-5" />
              Shipping & Returns
            </button>
            <button
              className={`py-4 px-1 inline-flex items-center gap-2 text-base font-semibold whitespace-nowrap transition-all ${
                activeTab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              <ThumbsUp className="w-5 h-5" />
              Reviews ({product?.reviews?.length})
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === "specifications" && (
            <div className="text-gray-600">
              <h3 className="text-2xl font-bold font-hk-grotesk text-gray-800 mb-4">
                Product Details
              </h3>
              <ul className="space-y-3">
                <li className="flex">
                  <strong className="w-32">Width:</strong>{" "}
                  {product?.dimensions?.width} cm
                </li>
                <li className="flex">
                  <strong className="w-32">Height:</strong>{" "}
                  {product?.dimensions?.height} cm
                </li>
                <li className="flex">
                  <strong className="w-32">Depth:</strong>{" "}
                  {product?.dimensions?.depth} cm
                </li>
                <li className="flex">
                  <strong className="w-32">Weight:</strong> {product.weight} g
                </li>
                <li className="flex">
                  <strong className="w-32">Minimum Order:</strong>{" "}
                  {product?.minimumOrderQuantity} units
                </li>
              </ul>
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="text-gray-600">
              <h3 className="text-2xl font-bold font-hk-grotesk text-gray-800 mb-4">
                Delivery & Policies
              </h3>
              <p className="mt-2">
                <strong>Shipping:</strong> {product?.shippingInformation}
              </p>
              <p>
                <strong>Returns:</strong> {product?.returnPolicy}
              </p>
              <p>
                <strong>Warranty:</strong> {product?.warrantyInformation}
              </p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              <h3 className="text-2xl font-bold font-hk-grotesk text-gray-800 mb-6">
                Customer Feedback
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h4 className="font-bold text-lg mb-2">Rating Breakdown</h4>
                  <RatingBreakdown reviews={product?.reviews || []} />
                </div>
                <div className="md:col-span-2 space-y-6">
                  {product?.reviews?.map((review: Reviews, index: number) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < (review.rating || 0)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-800 ml-4">
                          {review?.reviewerName}
                        </span>
                      </div>
                      <p className="text-gray-600">{review?.comment}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(review?.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
