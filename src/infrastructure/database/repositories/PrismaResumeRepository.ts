import type { PrismaClient } from "@/generated/prisma/client";
import type { IResumeRepository } from "@/domain/repositories";
import type { Resume } from "@/domain/entities";
import type { Locale } from "@/domain/enums";

export class PrismaResumeRepository implements IResumeRepository {
  constructor(private readonly db: PrismaClient) {}

  async findActive(locale: Locale): Promise<Resume | null> {
    const localeMap = { pt: "PT", en: "EN", es: "ES" } as const;
    const prismaLocale = localeMap[locale as keyof typeof localeMap] ?? "PT";

    const resume = await this.db.resume.findFirst({
      where: {
        locale: prismaLocale as "PT" | "EN" | "ES",
        active: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return resume as unknown as Resume | null;
  }

  async findAll(): Promise<Resume[]> {
    const resumes = await this.db.resume.findMany({
      orderBy: { createdAt: "desc" },
    });

    return resumes as unknown as Resume[];
  }

  async create(data: Omit<Resume, "id" | "createdAt">): Promise<Resume> {
    const localeMap = { pt: "PT", en: "EN", es: "ES" } as const;
    const prismaLocale =
      localeMap[data.locale as unknown as keyof typeof localeMap] ?? "PT";

    const resume = await this.db.resume.create({
      data: {
        locale: prismaLocale as "PT" | "EN" | "ES",
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        active: data.active,
      },
    });

    return resume as unknown as Resume;
  }

  async deactivate(id: string): Promise<void> {
    await this.db.resume.update({
      where: { id },
      data: { active: false },
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.resume.delete({ where: { id } });
  }
}
