// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { username, email, password, area } = await request.json();

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Generate a unique referral code
    const referralCodeGenerated = crypto.randomBytes(10).toString('hex').toUpperCase();

    // Create user with plain text password; pre-save hook will hash it
    const user = new User({
      username,
      email,
      password, // Plain text password
      area,
      otp,
      otpExpires,
      walletCoins: 20, // Initial wallet coins
      referralCode: referralCodeGenerated,
    });
    await user.save();

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject: 'Verify Your Email - Helper Buddy',
      text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'OTP sent to email' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}