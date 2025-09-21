'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductModal from '@/components/ProductModal';

export default function AllProducts() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Products';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: 'Diamond Glow Bracelet',
      category: 'Bracelet',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1608043152291-373c027021a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'A stunning anti-tarnish bracelet with sparkling diamond accents, perfect for any occasion.',
    },
    {
      name: 'Silver Chain Necklace',
      category: 'Chain',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1606760227091-3dd44d7f7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Elegant silver chain necklace, designed to stay tarnish-free and complement any outfit.',
    },
    {
      name: 'Pearl Drop Earrings',
      category: 'Earring',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1611651557475-3b35532bed90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Classic pearl drop earrings with anti-tarnish technology, adding sophistication to your look.',
    },
    {
      name: 'Velvet Hair Scrunchie',
      category: 'Hair Accessory',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1598961941859-70599bf5b7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Trendy velvet scrunchie, perfect for elevating your hairstyle with a touch of elegance.',
    },
    {
      name: 'Personalized Gift Hamper',
      category: 'Gift Hamper',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'A customizable gift hamper filled with AVJewellery’s finest pieces, ideal for special occasions.',
    },
    {
      name: 'Gold Hoop Earrings',
      category: 'Earring',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1611651557475-3b35532bed90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Sleek gold hoop earrings with anti-tarnish finish, versatile for daily wear or events.',
    },
  ];

  const categories = ['All Products', 'Bracelet', 'Chain', 'Earring', 'Hair Accessory', 'Gift Hamper'];

  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Below $99', min: 0, max: 99 },
    { label: 'Below $199', min: 0, max: 199 },
    { label: 'Below $299', min: 0, max: 299 },
    { label: 'Above $299', min: 299, max: Infinity },
  ];

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const selectedPriceRange = priceRanges.find((range) => range.label === priceRange);
    const matchesPrice =
      product.price >= selectedPriceRange.min && product.price < selectedPriceRange.max;
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
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 text-center mb-6 md:mb-20">All Products</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 border-b pb-4 border-gray-300">
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
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
                  key={product.name}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-base font-bold text-gray-800 mt-2">${product.price.toFixed(2)}</p>
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
              <p className="text-center text-gray-600 col-span-full">No products found for the selected filters.</p>
            )}
          </div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />

      
    </div>
  );
}