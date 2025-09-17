"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateQuantity } from "@/slices/cartSlice";
import { X } from "lucide-react";
import CartItem from "./CartItem";

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className="fixed top-0 inset-0 bg-white/50 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-lg flex flex-col absolute md:right-[15%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleRemove={handleRemove}
                handleQuantityChange={handleQuantityChange}
              />
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
