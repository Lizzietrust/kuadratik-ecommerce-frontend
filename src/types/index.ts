export interface Dimension {
  width: number;
  height: number;
  depth: number;
}

export type Product = {
  id: number;
  price: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  reviews?: { rating?: number; comment: string; reviewerName: string; date: string; }[];
  title: string;
  thumbnail: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: Dimension;
  weight: number;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
};

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export type User = {
  id: string;
  name: string;
  email: string;
};

export interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  ctaText: string;
  bgColor: string;
}


export interface ErrorResponse {
  error?: string;
  status?: string;
  message?: string;
}

export interface Reviews {
  rating?: number;
  comment: string;
  reviewerName: string;
  date: string;
}