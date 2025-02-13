// app/api/services/[id]/route.ts
import { NextResponse } from 'next/server'
import {connect} from '@/lib/mongodb'
import subService from '@/app/models/subservices'

// PATCH /api/services/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect()
    const body = await request.json()
    
    const updatedService = await subService.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!updatedService) {
      return NextResponse.json(
        { error: 'subService not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedService)
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect()
    const deletedService = await subService.findByIdAndDelete(params.id)
    
    if (!deletedService) {
      return NextResponse.json(
        { error: 'subService not found' },
        { status: 404 }
      )
    }
    
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}