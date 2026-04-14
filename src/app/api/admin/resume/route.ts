import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getResumeRepository } from "@/infrastructure/container";
import type { Locale } from "@/domain/enums";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const repo = getResumeRepository();
  const resumes = await repo.findAll();

  return NextResponse.json(resumes);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { locale, fileUrl, fileName, fileSize } = body;

    if (!locale || !fileUrl || !fileName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const repo = getResumeRepository();

    // Desativar resumes anteriores do mesmo locale
    const existing = await repo.findAll();
    for (const r of existing) {
      if ((r.locale as string) === locale && r.active) {
        await repo.deactivate(r.id);
      }
    }

    const resume = await repo.create({
      locale: locale as Locale,
      fileUrl,
      fileName,
      fileSize: fileSize || 0,
      mimeType: "application/pdf",
      active: true,
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (err) {
    console.error("Create resume error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
