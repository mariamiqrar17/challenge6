// pages/api/dashboard.js

import { connectMongoDB } from "@/lib/mongodb";
import Doctor from "@/models/doctor";
import Patient from "@/models/patient";
import { NextResponse } from "next/server";

export default async function handler(req) {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongoDB();
    console.log("Connected to MongoDB.");

    const doctorsCount = await Doctor.countDocuments();
    const patientsCount = await Patient.countDocuments();

    console.log("Doctors Count:", doctorsCount);
    console.log("Patients Count:", patientsCount);

    return NextResponse.json({ message: "Dashboard data.", doctorsCount, patientsCount }, { status: 200 });
  } catch (error) {
    console.error("Error in dashboard API:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching dashboard data." },
      { status: 500 },
      { error: error.message }
    );
  }
}
