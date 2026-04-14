import { NextResponse } from "next/server";
import { auth } from "@/infrastructure/auth/auth";
import { adminApiRateLimit } from "./rateLimit";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }

  // Rate limit admin API
  if (adminApiRateLimit) {
    const { success } = await adminApiRateLimit.limit(session.user.id ?? "admin");
    if (!success) {
      return {
        error: NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 }),
        session: null,
      };
    }
  }

  return { error: null, session };
}
