import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductGrid from "@/components/ProductGrid";
import cartReducer from "@/slices/cartSlice";
import favoritesReducer from "@/slices/favoritesSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Product } from "@/types";

// ---- Mock ProductCard ----
type MockProduct = {
  id: number;
  title: string;
  price: number;
};

jest.mock("@/components/ProductCard", () => {
  return function MockProductCard({ product }: { product: MockProduct }) {
    return (
      <div data-testid={`product-card-${product.id}`}>
        <h3>{product.title}</h3>
        <span>${product.price}</span>
      </div>
    );
  };
});

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

const mockProducts: MockProduct[] = [
  { id: 1, title: "Product 1", price: 100 },
  { id: 2, title: "Product 2", price: 200 },
];

const defaultProps = {
  products: mockProducts,
  isLoading: false,
  error: undefined,
  currentPage: 1,
  setCurrentPage: jest.fn(),
};

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={mockStore}>{ui}</Provider>);

describe("ProductGrid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    renderWithProvider(
      <ProductGrid {...defaultProps} isLoading={true} products={undefined} />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    const error: FetchBaseQueryError = {
      status: 500,
      data: "Server Error",
    };

    renderWithProvider(
      <ProductGrid {...defaultProps} error={error} products={undefined} />
    );

    expect(screen.getByText(/Failed to load products/i)).toBeInTheDocument();
  });

  it("renders products when loaded", () => {
    renderWithProvider(
      <ProductGrid {...defaultProps} products={mockProducts as Product[]} />
    );

    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
  });

  it("handles sort selection", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <ProductGrid {...defaultProps} products={mockProducts as Product[]} />
    );

    const sortSelect = screen.getByDisplayValue("Most Popular");
    await user.selectOptions(sortSelect, "Price: Low to High");

    expect(sortSelect).toHaveValue("Price: Low to High");
  });

  // ✅ Example for pagination tests
  it("handles page navigation", async () => {
    const user = userEvent.setup();
    const mockSetCurrentPage = jest.fn();

    renderWithProvider(
      <ProductGrid
        {...defaultProps}
        setCurrentPage={mockSetCurrentPage}
        products={mockProducts as Product[]}
      />
    );

    await user.click(screen.getByText("02"));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("disables previous button on first page", () => {
    renderWithProvider(
      <ProductGrid
        {...defaultProps}
        currentPage={1}
        products={mockProducts as Product[]}
      />
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    renderWithProvider(
      <ProductGrid
        {...defaultProps}
        currentPage={6}
        products={mockProducts as Product[]}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("highlights current page correctly", () => {
    renderWithProvider(
      <ProductGrid
        {...defaultProps}
        currentPage={3}
        products={mockProducts as Product[]}
      />
    );
    expect(screen.getByText("03")).toHaveClass("bg-[#22A24F]", "text-white");
  });

  it("renders empty state when no products", () => {
    renderWithProvider(<ProductGrid {...defaultProps} products={[]} />);
    expect(screen.queryByTestId("product-card-1")).not.toBeInTheDocument();
  });
});
