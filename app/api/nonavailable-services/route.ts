// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnect";
// import NonAvailableService from "@/models/NonAvailableService";
// import subservices from "@/models/subservices";

// export async function POST(req: Request) {
//     try {
//         const { serviceName } = await req.json();

//         if (!serviceName) {
//             return NextResponse.json({ error: "Service name is required" }, { status: 400 });
//         }

//         await connectDB();

//         // Check if service already exists
//         const existingService = await subservices.findOne({ serviceName });
//         console.log("existingService", existingService);
//         if (!existingService) {
//             await NonAvailableService.create({ serviceName });
//         }

//         return NextResponse.json({ message: "Service stored successfully" }, { status: 201 });
//     } catch (error) {
//         console.error("Error storing service:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

// export async function GET() {
//     try {
//         await connectDB();
//         const services = await NonAvailableService.find();
//         return NextResponse.json({ services }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching services:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import NonAvailableService from "@/models/NonAvailableService";

export async function POST(req: Request) {
    try {
        const { serviceName } = await req.json();

        if (!serviceName) {
            return NextResponse.json({ error: "Service name is required" }, { status: 400 });
        }

        await connectDB();

        // Check if service already exists
        const existingService = await NonAvailableService.findOne({ serviceName });

        if (existingService) {
            existingService.searchCount += 1;
            await existingService.save();
            console.log("updated existingService", existingService);
        } else {
            // If service does not exist, create a new record
            const newService = await NonAvailableService.create({ 
                serviceName, 
                searchCount: 1  // ✅ Force searchCount insertion
            });
            console.log("New service added:", newService); // Debugging line
        }

        return NextResponse.json({ message: "Service stored successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error storing service:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const services = await NonAvailableService.find().sort({ searchCount: -1 }); // Sort by most searched
        return NextResponse.json({ services }, { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
