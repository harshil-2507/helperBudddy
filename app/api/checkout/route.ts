import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import ServiceRequest from '@/models/ServiceRequest';
import User from '@/models/User';
import SubService from '@/models/subservices'; // Import the subservices model

export async function POST(request: Request) {
  const { services, userId, address, area } = await request.json();

  try {
    await connectDB();

    const user = await User.findById(userId);
    console.log('User:', user);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    if (!address || !area) return NextResponse.json({ message: 'Address and area are required' }, { status: 400 });

    const serviceRequests = [];
    for (const { serviceId, dateTime, duration } of services) {
      const subService = await SubService.findById(serviceId);
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

    return NextResponse.json({ message: 'Service requests created successfully', data: serviceRequests }, { status: 201 });
  } catch (error) {
    console.error('Error during checkout:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}