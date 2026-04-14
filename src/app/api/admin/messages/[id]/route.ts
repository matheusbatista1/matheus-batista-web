import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { makeMarkMessageRead, getContactMessageRepository } from "@/infrastructure/container";
import { ContactStatus } from "@/domain/enums";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const repo = getContactMessageRepository();
  const message = await repo.findById(id);

  if (!message) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(message);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const status = body.status as ContactStatus;

    if (!Object.values(ContactStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 },
      );
    }

    const repo = getContactMessageRepository();
    const message = await repo.updateStatus(id, status);

    return NextResponse.json(message);
  } catch (err) {
    console.error("Update message error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const repo = getContactMessageRepository();
    await repo.delete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete message error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
