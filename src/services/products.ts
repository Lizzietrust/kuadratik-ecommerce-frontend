import { Product } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      { limit?: number; skip?: number } | void
    >({
      query: (params) =>
        `/products?limit=${params?.limit ?? 30}&skip=${params?.skip ?? 0}`,
      transformResponse: (response: ProductsResponse) => response.products,
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
      transformResponse: (response: ProductsResponse) => response.products,
    }),
    getProductsByBrand: builder.query<Product[], string>({
      query: (brand) => `/products?brand=${brand}`,
      transformResponse: (response: ProductsResponse) => response.products,
    }),
    searchProducts: builder.query<Product[], string>({
      query: (searchQuery) => `/products/search?q=${searchQuery}`,
      transformResponse: (response: ProductsResponse) => response.products,
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByBrandQuery,
  useSearchProductsQuery,
  useGetProductQuery,
} = productsApi;
