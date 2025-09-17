import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "@/app/page";
import { useGetProductsQuery } from "@/services/products";
import cartReducer from "@/slices/cartSlice";
import favoritesReducer from "@/slices/favoritesSlice";
import productReducer from "@/slices/productSlice";
import searchReducer from "@/slices/searchSlice";

// =======================
// Types
// =======================
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: unknown[];
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  minimumOrderQuantity: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
  error?: unknown;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// =======================
// Mocks
// =======================

// Mock the Redux Toolkit Query hook
jest.mock("@/services/products", () => ({
  useGetProductsQuery: jest.fn(),
}));

// Mock child components to isolate testing
jest.mock("@/components/HeroBanner", () => {
  return function MockHeroBanner() {
    return <div data-testid="hero-banner">Hero Banner</div>;
  };
});

jest.mock("@/components/Sidebar", () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

jest.mock("@/components/ProductGrid", () => {
  return function MockProductGrid({
    products,
    isLoading,
    error,
  }: ProductGridProps) {
    if (isLoading) return <div data-testid="loading">Loading...</div>;
    if (error) return <div data-testid="error">Error loading products</div>;
    return (
      <div data-testid="product-grid">
        {products?.map((product) => (
          <div key={product.id} data-testid={`product-${product.id}`}>
            {product.title}
          </div>
        ))}
      </div>
    );
  };
});

// Mock constants
jest.mock("@/constants", () => ({
  PRODUCTS_PER_PAGE: 12,
}));

// =======================
// Store setup
// =======================
const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    product: productReducer,
    search: searchReducer,
  },
});

// =======================
// Mock data
// =======================
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    brand: "Brand 1",
    category: "Category 1",
    thumbnail: "/thumbnail1.jpg",
    images: ["/image1.jpg"],
    reviews: [],
    availabilityStatus: "In Stock",
    shippingInformation: "",
    returnPolicy: "",
    warrantyInformation: "",
    minimumOrderQuantity: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    price: 200,
    discountPercentage: 5,
    rating: 3.8,
    stock: 5,
    brand: "Brand 2",
    category: "Category 2",
    thumbnail: "/thumbnail2.jpg",
    images: ["/image2.jpg"],
    reviews: [],
    availabilityStatus: "In Stock",
    shippingInformation: "",
    returnPolicy: "",
    warrantyInformation: "",
    minimumOrderQuantity: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
  },
];

// =======================
// Hook mock
// =======================
const mockedUseGetProductsQuery = useGetProductsQuery as jest.MockedFunction<
  typeof useGetProductsQuery
>;

// =======================
// Tests
// =======================
describe("Home Page", () => {
  beforeEach(() => {
    mockedUseGetProductsQuery.mockReset();
  });

  it("renders all main sections", () => {
    mockedUseGetProductsQuery.mockReturnValue({
      data: mockProducts,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("hero-banner")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("product-grid")).toBeInTheDocument();
  });

  it("passes correct props to ProductGrid", () => {
    mockedUseGetProductsQuery.mockReturnValue({
      data: mockProducts,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("product-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-2")).toBeInTheDocument();
  });

  it("handles loading state", () => {
    mockedUseGetProductsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("handles error state", () => {
    mockedUseGetProductsQuery.mockReturnValue({
      data: undefined,
      error: { status: 500, data: "Internal Server Error" } as unknown,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: true,
      refetch: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("calls useGetProductsQuery with correct parameters", () => {
    mockedUseGetProductsQuery.mockReturnValue({
      data: mockProducts,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    expect(useGetProductsQuery).toHaveBeenCalledWith({
      limit: 12,
      skip: 0,
    });
  });
});
