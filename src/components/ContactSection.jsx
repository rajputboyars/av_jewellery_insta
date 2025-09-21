'use client';

export default function ContactSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">Contact AVJewellery</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Description */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
              Reach out to <span className="font-semibold text-amber-600">AVJewellery</span> for inquiries about our <span className="italic">anti-tarnish jewelry</span>, <span className="italic">trending hair accessories</span>, or <span className="italic">personalized gift hampers</span>. We’re here to make your experience sparkle!
            </p>
          </div>
          {/* Contact Details */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-gray-600 font-semibold">Address:</span>
                <span className="text-gray-600">123 Sparkle Lane, Mumbai, India</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-gray-600 font-semibold">Email:</span>
                <a href="mailto:info@avjewellery.com" className="text-amber-600 hover:text-amber-700">
                  info@avjewellery.com
                </a>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-gray-600 font-semibold">WhatsApp:</span>
                <a href="https://wa.me/919876543210" className="text-amber-600 hover:text-amber-700">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-gray-600 font-semibold">Instagram:</span>
                <a href="https://instagram.com/avjewellery" className="text-amber-600 hover:text-amber-700">
                  @avjewellery
                </a>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-gray-600 font-semibold">Facebook:</span>
                <a href="https://facebook.com/avjewellery" className="text-amber-600 hover:text-amber-700">
                  AVJewellery
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}