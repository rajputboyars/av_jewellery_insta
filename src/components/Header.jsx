'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              {/* <span className="text-2xl font-bold text-gray-800">Jewelry</span> */}
              <img src="/images/logo.png" alt="AVJewellery Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/products?category=All+Products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/products?category=Bracelet"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Bracelets
            </Link>
            <Link
              href="/products?category=Chain"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Chains
            </Link>
            <Link
              href="/products?category=Earring"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Earrings
            </Link>
            <Link
              href="/products?category=Gift+Hamper"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Gift Hamper
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden">
            <div className="flex flex-col space-y-2 pb-4 pt-2 px-4">
              <Link
                href="/products?category=All+Products"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={toggleMenu}
              >
                All Products
              </Link>
              <Link
                href="/products?category=Bracelet"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={toggleMenu}
              >
                Bracelets
              </Link>
              <Link
                href="/products?category=Chain"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={toggleMenu}
              >
                Chains
              </Link>
              <Link
                href="/products?category=Earring"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={toggleMenu}
              >
                Earrings
              </Link>
              <Link
                href="/products?category=Gift+Hamper"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={toggleMenu}
              >
                Gift Hamper
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}