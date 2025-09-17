import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFromFavorites } from "@/slices/favoritesSlice";
import Image from "next/image";
import { X } from "lucide-react";

interface FavoritesModalProps {
  onClose: () => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemoveFromFavorites = (productId: number) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div
      className="fixed inset-0 bg-white/50 bg-opacity-50 flex justify-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full shadow-lg flex flex-col absolute md:right-[15%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Favorites</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <p>No items in favorites.</p>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-2 border-b last:border-b-0"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  width={64}
                  height={64}
                  className="object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.product.title}</h3>
                  <p className="text-gray-600 text-xs">${item.product.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromFavorites(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
