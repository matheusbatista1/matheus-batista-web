import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { makeListSkillCategories } from "@/infrastructure/container";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const useCase = makeListSkillCategories();
  const categories = await useCase.execute();

  return NextResponse.json(categories);
}
