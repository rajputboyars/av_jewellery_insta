import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}