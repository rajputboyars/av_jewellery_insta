export function Skeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 text-center mb-6 md:mb-20">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill().map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 sm:h-56 bg-gray-200 animate-pulse"></div>
            <div className="p-4 text-center">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4 mx-auto mb-4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}