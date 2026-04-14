import { NextRequest, NextResponse } from "next/server";
import { makeGetActiveResume } from "@/infrastructure/container";
import { Locale } from "@/domain/enums";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  try {
    const { locale } = await params;

    const validLocales: Record<string, Locale> = {
      pt: Locale.PT,
      en: Locale.EN,
      es: Locale.ES,
    };

    const mappedLocale = validLocales[locale];
    if (!mappedLocale) {
      return NextResponse.json(
        { error: "Invalid locale" },
        { status: 400 },
      );
    }

    const useCase = makeGetActiveResume();
    const resume = await useCase.execute(mappedLocale);

    if (!resume) {
      return NextResponse.json(
        { error: "No active resume for this locale" },
        { status: 404 },
      );
    }

    return NextResponse.redirect(resume.fileUrl);
  } catch (error) {
    console.error("Resume API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
