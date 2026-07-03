import { NextRequest, NextResponse } from "next/server";
import { createCar, getAllCars } from "@/lib/data";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const cars = await getAllCars();
  return NextResponse.json(cars);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const car = await createCar(body);
  return NextResponse.json(car, { status: 201 });
}
