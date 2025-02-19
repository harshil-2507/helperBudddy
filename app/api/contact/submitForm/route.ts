import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import FormSubmission from "@/models/ContactForm";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json(); // Parse JSON body
    const { firstName, lastName, email, message } = body;

    const newSubmission = new FormSubmission({
      firstName,
      lastName,
      email,
      message,
    });

    await newSubmission.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving form submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
