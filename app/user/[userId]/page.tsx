import { notFound } from "next/navigation"
import { UserDashboard } from "@/app/(components)/user/user-dashboard"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import mongoose from "mongoose"

interface UserType {
  _id: string;
  username: string;
  email: string;
  area: string;
  address: string;
  isVerified: boolean;
  interestedCategory?: string[];
  walletCoins: number;
  referralCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

async function getUser(userId: string): Promise<UserType | null> {
  try {
    await connectToDatabase()
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null
    }
    
    const user = await User.findById(userId).select("-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires")
    if (!user) {
      return null
    }
    
    // Convert mongoose document to plain object
    return user.toObject() as UserType
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export default async function UserPage({ 
  params 
}: { 
  params: Promise<{ userId: string }> 
}) {
  const { userId } = await params
  const user = await getUser(userId)
  
  if (!user) {
    notFound()
  }
  
  return <UserDashboard user={user} />
}