import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductCard from "@/components/ProductCard";
import cartReducer from "@/slices/cartSlice";
import { Product } from "@/types";

// Mock Next.js components
jest.mock("next/link", () => {
  return function MockLink({ href, children }: { href: string; children: React.ReactNode }) {
    return <a href={href} data-testid="product-link">{children}</a>;
  };
});


jest.mock("next/image", () => {
  return function MockImage(
    props: React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) {
    return <img {...props} alt={props.alt ?? ""} data-testid="product-image" />;
  };
});





// Mock child components
jest.mock("@/components/RatingStars", () => {
  return function MockRatingStars({ rating }: { rating: number }) {
    return <div data-testid="rating-stars">Rating: {rating}</div>;
  };
});

jest.mock("@/components/ProductActionButtons", () => {
  return function MockProductActionButtons({
    onAddToCart,
    // productId,
  }: {
    onAddToCart: (e: React.MouseEvent) => void;
    productId: number;
  }) {
    return (
      <div data-testid="product-action-buttons">
        <button onClick={onAddToCart} data-testid="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    );
  };
});

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 20,
  category: "Electronics",
  thumbnail: "/thumbnail.jpg",
  images: ["/image1.jpg", "/image2.jpg"],
  brand: "Test Brand",
  reviews: [],
  availabilityStatus: "In Stock",
  shippingInformation: "Ships in 2-3 days",
  returnPolicy: "30 day return",
  warrantyInformation: "1 year warranty",
  minimumOrderQuantity: 1,
  dimensions: { width: 10, height: 5, depth: 2 },
} as unknown as Product;

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByTestId("rating-stars")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toBeInTheDocument();
  });

  it("renders product image with correct attributes", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const image = screen.getByTestId("product-image");
    expect(image).toHaveAttribute("src", "/image1.jpg");
    expect(image).toHaveAttribute("alt", "Test Product");
  });

  it("creates correct link to product detail page", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const link = screen.getByTestId("product-link");
    expect(link).toHaveAttribute("href", "/product/1");
  });

  it("passes correct rating to RatingStars component", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Rating: 4.5")).toBeInTheDocument();
  });

  it("handles product with zero rating", () => {
    const productWithNoRating = { ...mockProduct, rating: 0 };
    renderWithProvider(<ProductCard product={productWithNoRating} />);

    expect(screen.getByText("Rating: 0")).toBeInTheDocument();
  });

  it("handles product with no images gracefully", () => {
    const productWithNoImages = { ...mockProduct, images: [] };
    renderWithProvider(<ProductCard product={productWithNoImages} />);

    expect(screen.getByTestId("product-image")).toBeInTheDocument();
  });
});
