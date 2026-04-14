import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { makeListProjects, makeCreateProject } from "@/infrastructure/container";
import { createProjectSchema } from "@/application/validation/projectSchema";
import { Locale } from "@/domain/enums";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const useCase = makeListProjects();
  const projects = await useCase.execute({
    locale: Locale.PT,
    publishedOnly: false,
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const useCase = makeCreateProject();
    const project = await useCase.execute(parsed.data);

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
