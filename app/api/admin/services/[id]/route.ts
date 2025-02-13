import { NextResponse } from "next/server"
import { connect } from "@/lib/mongodb"
import Service from "@/app/models/services"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

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
      isVerified: service.isApproved
    }))
    
    return NextResponse.json(transformedServices)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
