"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import CardDesign from "../_components/CardDesign";
import { ProdectType } from "@/types/types";

interface SearchProductsClientProps {
  allProducts: ProdectType[];
}

export default function SearchProductsClient({
  allProducts,
}: SearchProductsClientProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    if (!searchValue) {
      return allProducts;
    }

    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
  }, [allProducts, query]);

  return (
    <>
      <div className="relative z-50 w-1/2 m-auto mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products by name..."
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-5 pr-11 text-sm transition focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button
          type="button"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-1.5 text-white transition hover:bg-green-600"
        >
          <SearchIcon size={15} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center my-7">
        {filteredProducts.map((prodect) => (
          <CardDesign key={prodect._id} prodect={prodect} />
        ))}
      </div>
    </>
  );
}
