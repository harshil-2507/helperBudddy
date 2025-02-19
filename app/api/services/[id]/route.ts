// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Service from '@/models/services';

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   await dbConnect();

//   try {
//     console.log('params', params.id);
//     const service = await Service.findById(params.id);
//     console.log('service', service);
//     if (!service) {
//       return NextResponse.json({ message: 'Service not found' }, { status: 404 });
//     }
//     return NextResponse.json(service);
//   } catch (error) {
//     return NextResponse.json({ message: (error as Error).message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/subservices';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect(); // Ensure the database connection is established

  try {
    // Log the ID for debugging
    console.log('Fetching service with ID:', params.id);

    // Fetch the service from the database
    const service = await Service.findById(params.id);

    // If the service is not found, return a 404 response
    if (!service) {
      console.log('Service not found for ID:', params.id);
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    // Log the fetched service for debugging
    console.log('Fetched service:', service);

    // Return the service as a JSON response
    return NextResponse.json(service);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching service:', error);

    // Return a 500 response with the error message
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}