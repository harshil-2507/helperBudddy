import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import ServiceRequest from '@/models/ServiceRequest';
import subservices from '@/models/subservices';
import User from '@/models/User';

export async function POST(request: Request) {
  const { services, userId, address, area } = await request.json();

  try {
    await connectDB();

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    if (!address || !area) return NextResponse.json({ message: 'Address and area are required' }, { status: 400 });

    const serviceRequests = [];
    for (const { serviceId, dateTime, duration } of services) {
      console.log('serviceId:', serviceId);
      const subService = await subservices.findById(serviceId);
      if (!subService) return NextResponse.json({ message: 'Service not found' }, { status: 404 });

      const serviceRequest = new ServiceRequest({
        userId,
        serviceId,
        category: subService.category, // Fetch category from subservices
        dateTime: new Date(dateTime),
        duration,
        address,
        area,
      });
      serviceRequests.push(serviceRequest);
    }

    await ServiceRequest.insertMany(serviceRequests);

    // Update user's address if not already set
    user.address = address || user.address;
    user.area = area || user.area;
    await user.save();

    // Simulate a successful payment
    return NextResponse.json({ message: 'Payment successful', data: serviceRequests }, { status: 201 });
  } catch (error) {
    console.error('Error during checkout:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}