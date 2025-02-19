import connectDB from "@/lib/dbConnect";
import subservices from "@/models/subservices";
import { NextResponse } from "next/server";

// GET /api/services
export async function GET() {
    try {
        await connectDB(); // Connect to MongoDB

        // Fetch all services from the database
        const services = await subservices.find({});
        console.log("services", services);

        return NextResponse.json({ services }, { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { message: "Failed to fetch services" },
            { status: 500 }
        );
    }
}