import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { uploadRateLimit } from "@/lib/rateLimit";
import { R2FileStorageService } from "@/infrastructure/storage/R2FileStorageService";
import { createId } from "@paralleldrive/cuid2";
import path from "path";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];
const ALLOWED_PDF_TYPES = ["application/pdf"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  // Rate limit uploads
  if (uploadRateLimit) {
    const { success } = await uploadRateLimit.limit(session?.user?.id ?? "admin");
    if (!success) {
      return NextResponse.json(
        { error: "Upload rate limit exceeded" },
        { status: 429 },
      );
    }
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "misc";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const contentType = file.type;
    const isImage = ALLOWED_IMAGE_TYPES.includes(contentType);
    const isPdf = ALLOWED_PDF_TYPES.includes(contentType);

    if (!isImage && !isPdf) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, SVG, PDF" },
        { status: 400 },
      );
    }

    const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Max: ${maxSize / 1024 / 1024}MB` },
        { status: 400 },
      );
    }

    const ext = path.extname(file.name) || (isPdf ? ".pdf" : ".webp");
    const key = `${category}/${createId()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const storage = new R2FileStorageService();
    const result = await storage.upload(buffer, key, contentType);

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
