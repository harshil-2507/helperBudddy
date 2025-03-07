// app/api/subservices/route.ts
import { NextResponse } from 'next/server'
import  {connect}  from '@/lib/mongodb'
import subService from '@/app/models/subservices'
import { Error as MongooseError } from 'mongoose'
// GET /api/subservices
export async function GET() {
  try {
    await connect()
    const services = await subService.find({})
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
    console.log(error)
  }
}

// POST /api/subservices
export async function POST(request: Request) {
  try {
    await connect()
    const {name, category, price} = await request.json()
    
    if (!name || !category || !price) {
        return NextResponse.json(
          { success: false, message: 'Name, Category and Price all are required' },
          { status: 400 }
        );
      }

      const newService = new subService({
        name,
        category,
        price
      });
    await newService.save();
    
    return NextResponse.json({success: true, message: 'subService created successfully'})
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}