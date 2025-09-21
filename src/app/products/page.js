import { Suspense } from 'react';
import AllProducts from '@/components/AllProducts';
import { Skeleton } from '@/components/Skeleton'; // Optional: Create a skeleton component for fallback

export default function ProductsPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <AllProducts />
    </Suspense>
  );
}