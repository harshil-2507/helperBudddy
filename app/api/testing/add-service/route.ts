// app/api/gwoc/add-service/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import ServiceRequest from '../../../../models/ServiceRequest';
import Worker from '../../../../models/Worker';
import sendEmail from '../../../../lib/sendEmail';

export async function POST(request: Request) {
  const { userId, category, dateTime, duration } = await request.json();

  try {
    await connectDB();

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const existingRequest = await ServiceRequest.findOne({ userId, category, status: 'pending' });
    if (existingRequest) return NextResponse.json({ message: 'Service request already exists' }, { status: 400 });

    const serviceRequest = new ServiceRequest({
      userId,
      category,
      dateTime,
      duration,
    });
    await serviceRequest.save();

    // Notify service providers
    const workers = await Worker.find({ isApproved: true, 'services.category': category });

    workers.forEach(async (worker) => {
      const notificationUrl = `${process.env.NEXTAUTH_URL}/gwoc-career/notifications`;
      await sendEmail({
        to: worker.email,
        subject: 'Service Booking Confirmed - HelperBuddy',
text: `Dear ${user.username},\n\nThank you for booking a service with HelperBudyy! Your request has been successfully confirmed.\n\n🛠 Service Category: ${serviceRequest.category}\n📍 Location: ${user.area}\n📝 \n\nOur service provider will reach out to you soon. If you have any questions or need to modify your booking, please contact our support team.\n\nWe appreciate your trust in Helper Buddy and look forward to serving you!\n\nBest regards,\nHelperBuddy Team\nhelperbuddy.gwoc@gmail.com`,
      });
    });

    return NextResponse.json({ message: 'Service request created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}