import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types'

export interface FavoriteItem {
  id: number
  product: Product
}

interface FavoritesState {
  items: FavoriteItem[]
}

const initialState: FavoritesState = {
  items: []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Product>) {
      const product = action.payload
      const found = state.items.find((i) => i.id === product.id)
      if (!found) {
        state.items.push({ id: product.id, product })
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
  },
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer