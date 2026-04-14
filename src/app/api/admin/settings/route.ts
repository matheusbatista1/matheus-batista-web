import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getSiteSettingRepository } from "@/infrastructure/container";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const repo = getSiteSettingRepository();
  const settings = await repo.getAll();

  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const repo = getSiteSettingRepository();

    for (const [key, value] of Object.entries(body)) {
      await repo.set(key, String(value));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update settings error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
