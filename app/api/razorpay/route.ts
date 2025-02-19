import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/dbConnect';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use your test key_id
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Use your test key_secret
});

export async function POST(request: Request) {
  try {
    await connectDB();

    const { amount, currency, receipt } = await request.json();

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt,
    };

    const order = await instance.orders.create(options);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}