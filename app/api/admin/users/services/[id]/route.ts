import { NextResponse } from "next/server"
import { connect } from "@/lib/mongodb"
import Service from "@/app/models/services"


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
    console.log(id)
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    await connect()

    const services = await Service.find({ workerId: id })
    if (!services || services.length === 0) {
      return NextResponse.json({ error: "No services found" }, { status: 404 })
    }
    
    // Transform the data to match the frontend interface
    const transformedServices = services.map(service => ({
      _id: service._id.toString(),
      name: service.title,
      description: service.description,
      images: service.images,
      isApproved: service.isApproved
    }))
    
    return NextResponse.json(transformedServices)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await connect()
      const body = await request.json()
  
      const updatedUser = await Service.findByIdAndUpdate(
        params.id,
        body,
        { new: true, runValidators: true }
      )
  
      if (!updatedUser) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        )
      }
      await updatedUser.save()
      return NextResponse.json(updatedUser)
    } catch (error: any) {
      if (error.name === 'ValidationError') {
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