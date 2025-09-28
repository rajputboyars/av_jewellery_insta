import { Suspense } from 'react';
import AllProducts from '@/components/AllProducts';
import { Skeleton } from '@/components/Skeleton'; // Optional: Create a skeleton component for fallback
import { cookies } from 'next/headers';
import { serverFetch } from '@/lib/serverFetch';

export default async function ProductsPage() {

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const res = await serverFetch(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const products = res.ok ? await res.json() : [];


  return (
    <Suspense fallback={<Skeleton />}>
      <AllProducts products={products} />
    </Suspense>
  );
}