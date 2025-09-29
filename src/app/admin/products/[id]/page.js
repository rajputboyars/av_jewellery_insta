import EditProductForm from "@/components/EditProductForm";
import { protectAdminRoute } from "@/lib/auth";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function EditProduct({ params }) {
  await protectAdminRoute();

  const { id } = await params;
  const cookieStore = await cookies();
  const cookiesData = cookieStore.get('token');
  const token = cookiesData?.value || null;

  const res = await serverFetch(`${process.env.FRONTEND_URL}/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const product = res.ok ? await res.json() : null;

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  async function handleSubmit(payload) {
    'use server';
    try {
      await serverFetch(`${process.env.FRONTEND_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message || 'Failed to update product' };
    }
  }

  return (
    <div className="container mx-auto p-20 max-w-[1080px]">
      <Link href="/admin/products">
        <button className=" text-amber-500 py-2 pb-8 rounded flex cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back To Products
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditProductForm handleSubmit={handleSubmit} product={product} />
    </div>
  );
}
