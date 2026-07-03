import { NextRequest, NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/lib/data";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone || !body.carId || !body.date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const booking = await createBooking(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const bookings = await getAllBookings();
  return NextResponse.json(bookings);
}
