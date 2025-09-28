import { protectAdminRoute } from '@/lib/auth';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { serverFetch } from '@/lib/serverFetch';
import ProductGrid from '@/components/ProductGrid';

export default async function AdminProducts() {
  await protectAdminRoute(); // ✅ Server-side protection

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const res = await serverFetch('http://localhost:3000/api/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const products = res.ok ? await res.json() : [];

  return (
    <div className="container mx-auto p-8 pb-40">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-amber-500 font-bold">Products</h1>
        <Link href="/admin/products/add">
          <button className="bg-amber-500 text-white px-4 py-2 rounded cursor-pointer">
            Add New Product
          </button>
        </Link>
      </div>

      {res.ok ? null : (
        <p className="text-red-500 mb-4">Failed to load products</p>
      )}

      {/* ✅ Pass products + token to client component */}
      <ProductGrid products={products} token={token} />
    </div>
  );
}
