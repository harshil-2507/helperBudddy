import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const db = await connectToDatabase()
    const services = await db
      .collection("services")
      .find({
        $or: [{ name: { $regex: query, $options: "i" } }, { category: { $regex: query, $options: "i" } }],
      })
      .limit(10)
      .toArray()

    return NextResponse.json(services)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

