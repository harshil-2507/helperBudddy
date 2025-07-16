import { NextResponse } from 'next/server'
import {connect} from '@/lib/mongodb'
import Worker from '@/app/models/Worker'
import { Error as MongooseError } from 'mongoose'
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await connect()
      const body = await request.json()
  
      const updatedUser = await Worker.findByIdAndUpdate(
        params.id,
        body,
        { new: true, runValidators: true }
      )
  
      if (!updatedUser) {
        return NextResponse.json(
          { error: 'Worker not found' },
          { status: 404 }
        )
      }
  
      return NextResponse.json(updatedUser)
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }
  }
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect()
    const deletedService = await Worker.findByIdAndDelete(params.id)
    
    if (!deletedService) {
      return NextResponse.json(
        { error: 'Worker not found' },
        { status: 404 }
      )
    }
    
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
    console.log(error);
  }
}