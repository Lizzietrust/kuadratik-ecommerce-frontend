import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
