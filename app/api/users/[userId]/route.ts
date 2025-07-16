import { NextResponse } from "next/server"
import User from "@/models/User"
import mongoose from "mongoose"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    console.log(user);
    return NextResponse.json(user)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    
  }
}