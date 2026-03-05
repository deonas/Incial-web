import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();
    const adminSecret = process.env.ADMIN_SECRET || "incial-admin-2024";

    if (secret !== adminSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
