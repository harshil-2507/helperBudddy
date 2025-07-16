// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { token, password } = await request.json();

  try {
    await connectDB();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });//logic is to find user by that token that is being said to the mail

    if (!user) {
      return NextResponse.json({ message: 'Password reset token is invalid or has expired' }, { status: 400 });
    }
    //and if user found just updated the info as below
    
    const hashedPassword = password;

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}