import { NextResponse } from "next/server"
import { connect } from "@/lib/mongodb"
import Worker from "@/app/models/Worker"
import Service from "@/app/models/services"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { serviceId, WorkerId } = body

    await connect()

    const worker = await Worker.findById(WorkerId)
    const service = await Service.findById(serviceId)

    if (!worker || !service) {
      return NextResponse.json(
        { message: "Worker or Service not found" },
        { status: 404 }
      )
    }

    // Send verification email
    await sendEmail({
      to: worker.email,
      subject: "Your service has been verified",
      text: `Dear ${worker.fullName},\n\nYour service "${service.name}" has been verified. You can now start providing this service through our platform.\n\nBest regards,\nThe Admin Team`,
    })

    return NextResponse.json(
      { message: "Service verification email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending service verification email:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}