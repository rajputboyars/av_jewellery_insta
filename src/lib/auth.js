import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';

export async function protectAdminRoute() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    await connectToDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('role');

    if (!user || user.role !== 'admin') {
      redirect('/login');
    }

    return user; // Return user for potential use
  } catch (error) {
    redirect('/login');
  }
}