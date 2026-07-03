import { NextRequest, NextResponse } from "next/server";
import { createTradeIn, getAllTradeIns } from "@/lib/data";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone || !body.brand || !body.model) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Simple heuristic valuation for demo purposes
    const baseValue = 3000000;
    const ageDiscount = Math.max(0, (2026 - body.year) * 150000);
    const mileageDiscount = Math.round((body.mileageKm || 0) / 10) * 100;
    const estimatedValue = Math.max(300000, baseValue - ageDiscount - mileageDiscount);

    const tradeIn = await createTradeIn({ ...body, estimatedValue });
    return NextResponse.json(tradeIn, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to submit trade-in request" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tradeins = await getAllTradeIns();
  return NextResponse.json(tradeins);
}
