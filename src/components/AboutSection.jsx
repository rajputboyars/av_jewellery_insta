'use client';

export default function AboutSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">About AVJewellery</h2>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="AVJewellery collection"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              At <span className="font-semibold text-amber-600">AVJewellery</span>, we craft <span className="italic">anti-tarnish</span> jewelry that shines forever. Our bracelets, chains, and earrings blend trend with timeless style.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              We also offer <span className="italic">trending hair accessories</span> to elevate your look and <span className="italic">personalized gift hampers</span> for unforgettable moments.
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              AVJewellery is about quality, creativity, and connection. Join us to embrace lasting beauty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}