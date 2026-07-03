import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";

// Demo admin credentials for the sandbox build (mirrors the Admin record created
// by prisma/seed.ts). In production, replace this block with:
//   const admin = await prisma.admin.findUnique({ where: { email } });
//   const valid = admin && (await bcrypt.compare(password, admin.password));
const DEMO_ADMIN = {
  id: "admin-1",
  name: "RS Motors Admin",
  email: "admin@rsmotors.pk",
  password: "RSMotors@2026",
  role: "admin",
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  if (email.toLowerCase() !== DEMO_ADMIN.email || password !== DEMO_ADMIN.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdminToken({
    id: DEMO_ADMIN.id,
    email: DEMO_ADMIN.email,
    name: DEMO_ADMIN.name,
    role: DEMO_ADMIN.role,
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
