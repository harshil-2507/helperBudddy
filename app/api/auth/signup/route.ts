// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { username, email, password, area } = await request.json();

  try {
    await connectDB();//before any queries connecttour datbase first and return a void promise(see dbConnects.ts for more deteils)


    
    const existingUser = await User.findOne({ email });//if already with same email or key:usrname existed then it returns user already existed
    if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 });


    //logic of otp and refrral generation using crypto
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
    // new Date() is a js date object
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes(unit is microseconds)
    // Generate a unique referral code

    const referralCodeGenerated = crypto.randomBytes(10).toString('hex').toUpperCase();//20 character hex ref code

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
    await user.save();//presave bcryptjs based hashing hook executed then saved into user collection

    // Send OTP email using nodmeailer for it
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
      subject: 'Your OTP for Verification – Helper Buddy',
      text: `Dear ${user.username},\n\nThank you for signing up with HelperBuddy! To complete your verification, please use the One-Time Password (OTP) below:\n\n🔐 Your OTP: ${otp}\n\nThis OTP is valid for 10 min and should not be shared with anyone for security reasons.\n\nIf you did not request this verification, please ignore this email or contact our support team immediately.\n\nBest regards,\nHelper Buddy Team\nhelperbuddy.gwoc@gmail.com`
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'OTP sent to email' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}