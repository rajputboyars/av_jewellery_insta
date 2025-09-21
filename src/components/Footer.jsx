'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <span className="text-lg sm:text-xl font-bold">Jewelry</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center space-y-3 md:flex-row md:space-y-0 md:space-x-6 md:items-start">
            <Link href="/products" className="text-sm sm:text-base hover:text-gray-300 transition-colors py-1">
              All Products
            </Link>
            <Link href="/bracelets" className="text-sm sm:text-base hover:text-gray-300 transition-colors py-1">
              Bracelets
            </Link>
            <Link href="/chains" className="text-sm sm:text-base hover:text-gray-300 transition-colors py-1">
              Chains
            </Link>
            <Link href="/earrings" className="text-sm sm:text-base hover:text-gray-300 transition-colors py-1">
              Earrings
            </Link>
            <Link href="/gift-hamper" className="text-sm sm:text-base hover:text-gray-300 transition-colors py-1">
              Gift Hamper
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}