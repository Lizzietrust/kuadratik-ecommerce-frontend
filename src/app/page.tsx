"use client";

import { useGetProductsQuery } from "@/services/products";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { PRODUCTS_PER_PAGE } from "@/constants";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({
    limit: PRODUCTS_PER_PAGE,
    skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
  });

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl md:w-[75%] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <HeroBanner />
      <main className="flex flex-col md:flex-row flex-1 py-5 gap-6">
        <aside className="w-full md:w-1/4 h-fit">
          <Sidebar />
        </aside>
        <section className="w-full md:w-3/4">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>
    </div>
  );
}
