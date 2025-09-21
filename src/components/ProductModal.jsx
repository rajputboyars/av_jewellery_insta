'use client';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in purchasing the ${product.name} (${product.category}) priced at $${product.price.toFixed(2)}. Can you provide more details?`
  );
  const whatsappLink = `https://wa.me/918864910917?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 sm:mx-6">
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
          <p className="text-lg font-semibold text-gray-800 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-base text-gray-600 text-center mb-6">{product.description}</p>
          <div className="flex gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
              aria-label={`Buy ${product.name} via WhatsApp`}
            >
              Buy Now
            </a>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              aria-label="Close modal"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}