import { NextRequest, NextResponse } from "next/server";
import { createReservation, getAllReservations } from "@/lib/data";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone || !body.carId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const reservation = await createReservation(body);
    return NextResponse.json(reservation, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reservations = await getAllReservations();
  return NextResponse.json(reservations);
}
