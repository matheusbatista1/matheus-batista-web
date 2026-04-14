import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/application/validation/contactSchema";
import { makeSubmitContactMessage } from "@/infrastructure/container";
import { contactRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (contactRateLimit) {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "anonymous";

      const { success, remaining } = await contactRateLimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: { "X-RateLimit-Remaining": String(remaining) },
          },
        );
      }
    }

    const body = await request.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validacao
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const useCase = makeSubmitContactMessage();
    await useCase.execute({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
