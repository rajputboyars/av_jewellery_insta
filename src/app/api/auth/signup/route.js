import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = new User({ email, password });
    await user.save();

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}