// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import crypto from 'crypto';
import sendEmail from '../../../../lib/sendEmail';

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');//new token
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
subject: 'Password Reset Request - HelperBuddy',
text: `Dear ${user.username},\n\nWe received a request to reset your password for your HelperBuddy account. If you made this request, please click the secure link below to reset your password:\n\n🔗 Reset Password: ${resetUrl}\n\nThis link is valid for 1hr and will expire after that for security reasons.\n\nIf you did not request this password reset, please ignore this email, and your password will remain unchanged. If you need any assistance, please contact our support team.\n\nBest regards,\nHelperBuddy Team\nhelperbuddy.gwoc@gmail.com`

    });

    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}