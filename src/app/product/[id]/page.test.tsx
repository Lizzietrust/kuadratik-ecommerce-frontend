import { render, screen } from "@testing-library/react";
import ProductDetailPage from "./page";
import { useGetProductQuery, productsApi } from "@/services/products";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/slices/cartSlice";
import favoritesReducer from "@/slices/favoritesSlice";
import productReducer from "@/slices/productSlice";
import searchReducer from "@/slices/searchSlice";
import * as nextNavigation from "next/navigation";

// Mock Redux Toolkit Query hook
jest.mock("@/services/products", () => ({
  useGetProductQuery: jest.fn(),
  productsApi: {
    reducerPath: "productsApi",
    reducer: () => ({}), // Provide a mock reducer function
  },
}));

// Mock next/navigation's useParams
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    product: productReducer,
    search: searchReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
});

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description.",
  price: 99.99,
  discountPercentage: 10,
  rating: 4.2,
  stock: 50,
  brand: "TestBrand",
  category: "Electronics",
  thumbnail: "/test-thumbnail.jpg",
  images: ["/test-image1.jpg", "/test-image2.jpg"],
  reviews: [
    { rating: 5, comment: "Great product!", date: "2023-01-01", reviewerName: "John Doe", reviewerEmail: "john@example.com" },
  ],
  availabilityStatus: "In Stock",
  shippingInformation: "Ships in 1-2 business days",
  returnPolicy: "30-day return policy",
  warrantyInformation: "1-year warranty",
  minimumOrderQuantity: 1,
  dimensions: { width: 10, height: 20, depth: 5 },
};

describe("Product Detail Page", () => {
  beforeEach(() => {
    (useGetProductQuery as jest.Mock).mockReset();
    (nextNavigation.useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("renders loading state initially", () => {
    (useGetProductQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(
      <Provider store={mockStore}>
        <ProductDetailPage />
      </Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument(); // Check for spinner
  });

  it("renders product details after loading", async () => {
    (useGetProductQuery as jest.Mock).mockReturnValue({
      data: mockProduct,
      error: undefined,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <ProductDetailPage />
      </Provider>
    );

    expect(screen.getByRole("heading", { name: /Test Product/i })).toBeInTheDocument();
    expect(screen.getByText(/This is a test product description./i)).toBeInTheDocument();
    expect(screen.getByText(/99.99/i)).toBeInTheDocument();
  });

  it("renders product not found message if product is undefined", () => {
    (useGetProductQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <ProductDetailPage />
      </Provider>
    );

    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it("renders error message if query fails", () => {
    (useGetProductQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { status: 500, data: "Internal Server Error" },
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <ProductDetailPage />
      </Provider>
    );

    expect(screen.getByText(/Product not found/i)).toBeInTheDocument(); // The component renders "Product not found" on error as well
  });
});
