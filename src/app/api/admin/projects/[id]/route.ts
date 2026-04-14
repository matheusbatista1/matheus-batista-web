import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { makeUpdateProject, makeDeleteProject } from "@/infrastructure/container";
import { getProjectRepository } from "@/infrastructure/container";
import { updateProjectSchema } from "@/application/validation/projectSchema";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const repo = getProjectRepository();
  const project = await repo.findById(id);

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
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
    const parsed = updateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const useCase = makeUpdateProject();
    const project = await useCase.execute(id, parsed.data);

    return NextResponse.json(project);
  } catch (err) {
    console.error("Update project error:", err);
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
    const useCase = makeDeleteProject();
    await useCase.execute(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete project error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
