import { NextResponse } from "next/server"
import { connect } from "@/lib/mongodb"
import Worker from "@/app/models/Worker"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body

    await connect()

    const user = await Worker.findById(userId)

    if (!user) {
      return NextResponse.json(
        { message: "Worker not found" },
        { status: 404 }
      )
    }

    // Send verification email
    await sendEmail({
      to: user.email,
      subject: "Your account has been verified",
      text: `Dear ${user.fullName},\n\nYour account has been verified. You can now access all features of our platform.\n\nBest regards,\nThe Admin Team`,
    })

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}