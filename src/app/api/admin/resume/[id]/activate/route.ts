import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getResumeRepository } from "@/infrastructure/container";

export async function PUT(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const repo = getResumeRepository();

    // Buscar o resume para saber o locale
    const allResumes = await repo.findAll();
    const target = allResumes.find((r) => r.id === id);

    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Desativar outros do mesmo locale
    for (const r of allResumes) {
      if ((r.locale as string) === (target.locale as string) && r.active && r.id !== id) {
        await repo.deactivate(r.id);
      }
    }

    // Ativar este (usando update direto via prisma)
    const { prisma } = await import("@/infrastructure/database/prisma");
    await prisma.resume.update({
      where: { id },
      data: { active: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Activate resume error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
