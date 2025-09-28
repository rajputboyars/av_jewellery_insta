import EditProductForm from "@/components/EditProductForm";
import { protectAdminRoute } from "@/lib/auth";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";

export default async function EditProduct({ params }) {
  await protectAdminRoute();

  const { id } = await params;
  const cookieStore = await cookies();
  const cookiesData = cookieStore.get('token');
  const token = cookiesData?.value || null;

  const res = await serverFetch(`http://localhost:3000/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const product = res.ok ? await res.json() : null;

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  async function handleSubmit(payload) {
    'use server';
    try {
      await serverFetch(`http://localhost:3000/api/products/${id}`, {
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
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditProductForm handleSubmit={handleSubmit} product={product} />
    </div>
  );
}
