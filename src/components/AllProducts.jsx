"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductModal from "@/components/ProductModal";

export default function AllProducts({products}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Products";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "All Products",
    "Bracelet",
    "Chain",
    "Earring",
    "Hair Accessory",
    "Gift Hamper",
  ];

  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Below 150", min: 0, max: 150 },
    { label: "Below 200", min: 0, max: 200 },
    { label: "Below 250", min: 0, max: 250 },
    { label: "Above 300", min: 300, max: Infinity },
  ];

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;
    const selectedPriceRange = priceRanges.find(
      (range) => range.label === priceRange
    );
    const matchesPrice =
      product.price >= selectedPriceRange.min &&
      product.price < selectedPriceRange.max;
    return matchesCategory && matchesPrice;
  });

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen max-md:pt-10">
      <main className="flex-grow bg-gray-50 py-12 pt-16 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 text-center mb-6 md:mb-20">
            All Products
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 border-b pb-4 border-gray-300">
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    selectedCategory === category
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Price Range Dropdown */}
            <div className="flex justify-center sm:justify-end">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-md:px-8 max-sm:place-items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id} // Use unique id instead of name
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden max-sm:w-[350px] sm:max-w-[350px]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[400px] object-cover rounded-lg shadow-md"
                  />
                  <div className="p-4 text-left">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <div className="w-full flex justify-between items-center ">
                      <p className="text-base text-gray-600">
                        {product.category}
                      </p>
                      <p className="text-base  text-gray-800 mt-2">
                        Rs- {product.discount}{" "}
                        <span className="text-sm text-gray-400 line-through">
                          {product.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="inline-block w-full mt-4 bg-amber-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No products found for the selected filters.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
}
