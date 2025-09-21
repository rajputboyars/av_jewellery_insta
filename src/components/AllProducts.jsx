"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductModal from "@/components/ProductModal";

export default function AllProducts() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Products";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: "1",
      name: "Butterfly Korean Earring",
      category: "Earring",
      price: 250,
      discount: 149,
      image: "/images/product1.png",
      description:
        "A stunning anti-tarnish bracelet with sparkling diamond accents, perfect for any occasion.",
    },
    {
      id: "2",
      name: "Silver Chain Necklace",
      category: "Earring",
      price: 250,
      discount: 149,
      image: "/images/product2.png",
      description:
        "Elegant silver chain necklace, designed to stay tarnish-free and complement any outfit.",
    },
    {
      id: "3",
      name: "Pearl Drop Earrings",
      category: "Earring",
      price: 250,
      discount: 199,
      image: "/images/product3.png",
      description:
        "Classic pearl drop earrings with anti-tarnish technology, adding sophistication to your look.",
    },
    {
      id: "4",
      name: "Velvet Hair Scrunchie",
      category: "Earring",
      price: 300,
      discount: 215,
      image: "/images/product4.png",
      description:
        "Trendy velvet scrunchie, perfect for elevating your hairstyle with a touch of elegance.",
    },
    {
      id: "5",
      name: "Personalized Gift Hamper",
      category: "Bracelet",
      price: 250,
      discount: 185,
      image: "/images/product5.png",
      description:
        "A customizable gift hamper filled with AVJewellery’s finest pieces, ideal for special occasions.",
    },
    {
      id: "6",
      name: "Gold Hoop Earrings Small",
      category: "Bracelet",
      price: 350,
      discount: 275,
      image: "/images/product6.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "7",
      name: "Gold Hoop Earrings Medium",
      category: "Bracelet",
      price: 350,
      discount: 299,
      image: "/images/product7.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "8",
      name: "Gold Hoop Earrings Large",
      category: "Chain",
      price: 350,
      discount: 230,
      image: "/images/product8.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "9",
      name: "Gold Hoop Earrings Classic",
      category: "Chain",
      price: 350,
      discount: 230,
      image: "/images/product9.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "10",
      name: "Gold Hoop Earrings Modern",
      category: "Chain",
      price: 350,
      discount: 230,
      image: "/images/product10.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "11",
      name: "Gold Hoop Earrings Elegant",
      category: "Chain",
      price: 450,
      discount: 355,
      image: "/images/product11.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "12",
      name: "Gold Hoop Earrings Bold",
      category: "Chain",
      price: 199,
      discount: 149,
      image: "/images/product12.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "13",
      name: "Gold Hoop Earrings Minimal",
      category: "Chain",
      price: 350,
      discount: 299,
      image: "/images/product13.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
    {
      id: "14",
      name: "Gold Hoop Earrings Statement",
      category: "Bracelet",
      price: 250,
      discount: 149,
      image: "/images/product14.png",
      description:
        "Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.",
    },
  ];

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
    <div className="flex flex-col min-h-screen">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id} // Use unique id instead of name
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-base  text-gray-800 mt-2">
                      Rs- {product.discount}{" "}
                      <span className="text-sm text-gray-400 line-through">
                        {product.price.toFixed(2)}
                      </span>
                    </p>
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="inline-block mt-4 bg-amber-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
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
