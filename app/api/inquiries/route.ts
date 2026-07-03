import { NextRequest, NextResponse } from "next/server";
import { createInquiry, getAllInquiries } from "@/lib/data";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const inquiry = await createInquiry(body);
    return NextResponse.json(inquiry, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const inquiries = await getAllInquiries();
  return NextResponse.json(inquiries);
}
