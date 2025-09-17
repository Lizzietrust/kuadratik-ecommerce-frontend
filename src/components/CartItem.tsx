import Image from "next/image";
import React from "react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  handleRemove: (id: number) => void;
  handleQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, handleRemove, handleQuantityChange }) => {
  return (
    <div key={item.id} className="flex items-center gap-4 mb-4">
      <Image
        src={item.product.images[0]}
        alt={item.product.title}
        width={80}
        height={80}
        className="rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-bold">{item.product.title}</h3>
        <p className="text-gray-500">
          ${item.product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              handleQuantityChange(item.id, item.quantity - 1)
            }
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() =>
              handleQuantityChange(item.id, item.quantity + 1)
            }
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => handleRemove(item.id)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
