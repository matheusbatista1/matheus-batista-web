import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { makeGetAboutContent, makeUpdateAboutContent } from "@/infrastructure/container";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const useCase = makeGetAboutContent();
  const about = await useCase.execute();

  return NextResponse.json(about);
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const useCase = makeUpdateAboutContent();
    const about = await useCase.execute(body);

    return NextResponse.json(about);
  } catch (err) {
    console.error("Update about error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
