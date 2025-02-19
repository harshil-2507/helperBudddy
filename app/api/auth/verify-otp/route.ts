// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { email, otp, referralCode }: { email: string; otp: string; referralCode?: string } = await request.json();

  try {
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    // Check OTP validity
    if (user.otp !== otp || user.otpExpires! < new Date()) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
          },
        });
    
        const mailOptions = {
          from: process.env.EMAIL_USER!,
          to: user.email,
subject: 'Registration Successful - HelperBuddy',
text: `Dear ${user.username},\n\nCongratulations! You have successfully verified your OTP and completed your registration with HelperBuddy.\n\nWe're excited to have you on board! You can now log in and start exploring our services.\n\nIf you did not register or need any assistance, please contact our support team immediately.\n\nBest regards,\nHelperBudyy Team\nhelperbuddy.gwoc@gmail.com`

        };
    
        await transporter.sendMail(mailOptions);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    // If referral code is provided, add bonus coins to the referee
    if (referralCode) {
      const referee = await User.findOne({ referralCode });
      if (referee) {
        referee.walletCoins += 30; // Add bonus coins
        await referee.save();
      }
    }

    return NextResponse.json({ message: 'Email verified successfully', token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}