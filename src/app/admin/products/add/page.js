import { protectAdminRoute } from '@/lib/auth';
import { cookies } from 'next/headers';
import { serverFetch } from '@/lib/serverFetch';
import axios from 'axios';
import AddProductForm from '@/components/AddProductForm';
import Link from 'next/link';
// import AddProductForm from './AddProductForm';

export default async function AddProduct() {
  await protectAdminRoute(); // Server-side protection

  const cookieStore = await cookies().get('token');
  const token = await cookieStore?.value;

  async function handleSubmit(formData) {
    'use server';
    try {
      const name = formData.get('name');
      const category = formData.get('category');
      const price = Number(formData.get('price'));
      const discount = Number(formData.get('discount')) || undefined;
      const description = formData.get('description');
      const files = formData.getAll('images');

      const uploadedUrls = [];
      for (const file of files) {
        const formDataToUpload = new FormData();
        formDataToUpload.append('file', file);
        formDataToUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formDataToUpload,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        uploadedUrls.push(res.data.secure_url);
      }

      await serverFetch(`${process.env.FRONTEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, category, price, discount, images: uploadedUrls, description }),
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, error: error.message || 'Failed to add product' };
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
      <h1 className="text-2xl font-bold mb-4 max-w-[1080px] mx-auto text-amber-500">Add New Product</h1>
      <AddProductForm handleSubmit={handleSubmit} />
    </div>
  );
}