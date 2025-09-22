'use client';

import Link from 'next/link';

export default function CategorySection() {
  const categories = [
    {
      name: 'All Products',
      image: '/images/product4.png',
      link: '/products?category=All+Products',
    },
    {
      name: 'Bracelets',
      image: '/images/product7.png',
      link: '/products?category=Bracelet',
    },
    {
      name: 'Chains',
      image: '/images/product9.png',
      link: '/products?category=Chain',
    },
    {
      name: 'Earrings',
      image: '/images/product15.png',
      link: '/products?category=Earring',
    },
    {
      name: 'Hair Accessories Combo',
      image: '/images/hairbowclip.jpg',
      link: '/products?category=Hair+Accessory',
    },
    {
      name: 'Personalized Gift Hamper',
      image: '/images/giftHamper.jpg',
      link: '/products?category=Gift+Hamper',
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.link} className="group">
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="bg-white p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}