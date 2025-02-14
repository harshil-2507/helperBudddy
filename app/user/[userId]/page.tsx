import { notFound } from "next/navigation"
import { UserDashboard } from "@/app/(components)/user/user-dashboard"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import mongoose from "mongoose"

async function getUser(userId: string) {
  try {
    await connectToDatabase()

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null
    }

    const user = await User.findById(userId).select("-password")
    if (!user) {
      return null
    }

    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export default async function UserPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const user = await getUser(userId)

  if (!user) {
    notFound()
  }

  return <UserDashboard user={user} />
}