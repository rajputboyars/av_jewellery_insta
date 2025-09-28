import { connectToDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';

export async function GET(req) {
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDB();

  try {
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDB();

  const { name, category, price, discount, images, description } = await req.json();

  try {
    const product = new Product({ name, category, price, discount, images, description });
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}