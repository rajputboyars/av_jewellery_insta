"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductGrid({ products, token }) {
  const router = useRouter();

  // ✅ Delete handler on client
  async function handleDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      router.refresh(); // ✅ smoother than window.location.reload()
    } else {
      alert("Failed to delete product");
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-amber-300 p-8">
      {products.map((product) => (
        <div
          key={product._id}
          className="border border-amber-500 rounded p-4 shadow"
        >
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-60 object-cover mb-2"
            />
          )}
          <div className="flex overflow-x-auto gap-2">
            {product.images?.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  alt={product.name+index}
                  className="w-20 h-20 object-cover mb-2"
                />
              );
            })}
          </div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          {product.discount && <p>Discount: ₹{product.discount}</p>}
          <p>{product.description}</p>
          <div className="mt-4 flex justify-between">
            <Link href={`/admin/products/${product._id}`}>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
