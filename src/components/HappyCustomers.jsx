'use client';

export default function HappyCustomers() {
  const testimonials = [
    {
      name: 'Sarah M.',
      quote: 'I love my AVJewellery bracelet! Its anti-tarnish feature keeps it sparkling, even after months of daily wear. Absolutely stunning!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Priya K.',
      quote: 'The hair accessories from AVJewellery are a game-changer! Trendy, durable, and perfect for any occasion. I get compliments all the time!',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Anita R.',
      quote: 'The personalized gift hamper was a hit at my friend’s wedding! AVJewellery made it so special and unique. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">Happy Customers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s profile`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              </div>
              <p className="text-base text-gray-600">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}