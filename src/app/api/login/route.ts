// src/app/api/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

// Dummy user database
const USERS = [
  { email: "admin@example.com", password: "admin123", role: "Teacher" },
  { email: "parent@example.com", password: "parent123", role: "Parent" },
  { email: "child@example.com", password: "child123", role: "Child" },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const dummyToken = "mock.jwt.token"; // later replace with real JWT

    const res = NextResponse.json({ message: "Login successful", role: user.role });

    res.headers.set(
      "Set-Cookie",
      serialize("token", dummyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
