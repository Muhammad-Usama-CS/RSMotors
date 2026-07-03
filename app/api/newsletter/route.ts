import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  // In production this would write to the NewsletterSubscriber table via Prisma.
  return NextResponse.json({ success: true });
}
