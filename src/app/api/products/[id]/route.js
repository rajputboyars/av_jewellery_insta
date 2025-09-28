import { connectToDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';

export async function GET(req, { params }) {
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDB();

  try {
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDB();

  const { name, category, price, discount, images, description } = await req.json();

  try {
    const product = await Product.findByIdAndUpdate(params.id, { name, category, price, discount, images, description }, { new: true });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDB();

  try {
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}