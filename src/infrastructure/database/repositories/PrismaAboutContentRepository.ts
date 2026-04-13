import type { PrismaClient } from "@/generated/prisma/client";
import type { IAboutContentRepository } from "@/domain/repositories";
import type { AboutContent } from "@/domain/entities";

export class PrismaAboutContentRepository implements IAboutContentRepository {
  constructor(private readonly db: PrismaClient) {}

  async find(): Promise<AboutContent | null> {
    const about = await this.db.aboutContent.findFirst({
      include: { translations: true },
    });

    return about as unknown as AboutContent | null;
  }

  async upsert(data: Partial<AboutContent>): Promise<AboutContent> {
    const existing = await this.db.aboutContent.findFirst();

    if (existing) {
      const updated = await this.db.aboutContent.update({
        where: { id: existing.id },
        data: {
          ...(data.photoUrl !== undefined && { photoUrl: data.photoUrl }),
        },
        include: { translations: true },
      });
      return updated as unknown as AboutContent;
    }

    const created = await this.db.aboutContent.create({
      data: {
        photoUrl: data.photoUrl,
      },
      include: { translations: true },
    });

    return created as unknown as AboutContent;
  }
}
