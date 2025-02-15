// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email first' }, { status: 400 });
    }

    console.log('User found:', user);
    console.log('Password from request:', password);
    console.log('Hashed password from DB:', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return NextResponse.json({ message: 'Login successful', token, _id: user._id }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}