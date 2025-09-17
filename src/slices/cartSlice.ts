import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types'

export interface CartItem {
  id: number
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload
      const found = state.items.find((i) => i.id === product.id)
      if (found) {
        found.quantity += quantity
      } else {
        state.items.push({ id: product.id, product, quantity })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) item.quantity = action.payload.quantity
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer