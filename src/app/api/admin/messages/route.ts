import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { makeListContactMessages } from "@/infrastructure/container";
import type { ContactStatus } from "@/domain/enums";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") as ContactStatus | null;
  const limit = Number(searchParams.get("limit")) || 50;
  const offset = Number(searchParams.get("offset")) || 0;

  const useCase = makeListContactMessages();
  const result = await useCase.execute({
    status: status ?? undefined,
    limit,
    offset,
  });

  return NextResponse.json(result);
}
