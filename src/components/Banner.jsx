'use client';

import Link from 'next/link';

export default function Banner() {
  return (
    <section className="relative bg-gray-100 h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover maxmd:bg-left-bottom md:bg-center"
        style={{
          backgroundImage: "url('/images/homeBanner.png')",
        }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-40"></div> Overlay for readability */}
      </div>

      {/* Content */}
      {/* <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Discover Exquisite Jewelry
        </h1>
        <p className="text-lg sm:text-xl text-white mb-6 max-w-2xl mx-auto">
          Explore our stunning collection of bracelets, chains, earrings, and gift hampers crafted with elegance and care.
        </p>
        <Link
          href="/products"
          className="inline-block bg-amber-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-amber-700 transition-colors"
        >
          Shop Now
        </Link>
      </div> */}
    </section>
  );
}