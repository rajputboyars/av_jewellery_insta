import jwt from 'jsonwebtoken';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function authMiddleware(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    await connectToDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('role');

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: User not found' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Attach user to request for downstream use
    req.user = user;
    return null; // Proceed to next handler
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}