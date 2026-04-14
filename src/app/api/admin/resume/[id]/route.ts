import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getResumeRepository } from "@/infrastructure/container";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const repo = getResumeRepository();
    await repo.delete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete resume error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
