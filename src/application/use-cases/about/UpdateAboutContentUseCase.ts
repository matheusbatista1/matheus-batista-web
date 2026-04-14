import type { IAboutContentRepository } from "@/domain/repositories";
import type { AboutContent } from "@/domain/entities";
import { prisma } from "@/infrastructure/database/prisma";

type Input = {
  photoUrl?: string;
  translations: Array<{
    locale: "PT" | "EN" | "ES";
    title: string;
    bio: string;
    headline?: string;
  }>;
};

export class UpdateAboutContentUseCase {
  constructor(private readonly repo: IAboutContentRepository) {}

  async execute(input: Input): Promise<AboutContent> {
    const existing = await this.repo.find();

    if (!existing) {
      throw new Error("About content not found. Run seed first.");
    }

    // Atualizar foto se fornecida
    if (input.photoUrl !== undefined) {
      await prisma.aboutContent.update({
        where: { id: existing.id },
        data: { photoUrl: input.photoUrl },
      });
    }

    // Atualizar traducoes
    for (const t of input.translations) {
      await prisma.aboutContentTranslation.upsert({
        where: {
          aboutContentId_locale: {
            aboutContentId: existing.id,
            locale: t.locale,
          },
        },
        update: { title: t.title, bio: t.bio, headline: t.headline },
        create: {
          aboutContentId: existing.id,
          locale: t.locale,
          title: t.title,
          bio: t.bio,
          headline: t.headline,
        },
      });
    }

    return (await this.repo.find())!;
  }
}
