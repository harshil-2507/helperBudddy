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

    // const existingRequest = await ServiceRequest.findOne({ userId, category, status: 'pending' });
    // if (existingRequest) return NextResponse.json({ message: 'Service request already exists' }, { status: 400 });

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
        subject: 'New Service Request',
        text: `You have a new service request for ${category}. Please check it out: ${notificationUrl}`,
      });
    });

    return NextResponse.json({ message: 'Service request created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}