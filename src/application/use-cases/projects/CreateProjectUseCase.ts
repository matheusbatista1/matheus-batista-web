import type { IProjectRepository } from "@/domain/repositories";
import type { Project } from "@/domain/entities";
import type { CreateProjectInput } from "@/application/validation/projectSchema";
import { prisma } from "@/infrastructure/database/prisma";

export class CreateProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(input: CreateProjectInput): Promise<Project> {
    // Criar projeto com traducoes, tags e tech stack numa transacao
    const project = await prisma.project.create({
      data: {
        slug: input.slug,
        thumbnailUrl: input.thumbnailUrl,
        liveUrl: input.liveUrl,
        repoUrl: input.repoUrl,
        featured: input.featured,
        published: input.published,
        sortOrder: input.sortOrder,
        translations: {
          create: input.translations.map((t) => ({
            locale: t.locale as "PT" | "EN" | "ES",
            title: t.title,
            description: t.description,
            shortDescription: t.shortDescription,
          })),
        },
        ...(input.tagIds && {
          tags: {
            create: input.tagIds.map((tagId) => ({ tagId })),
          },
        }),
        ...(input.techItemIds && {
          techStack: {
            create: input.techItemIds.map((techItemId) => ({ techItemId })),
          },
        }),
      },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
    });

    return project as unknown as Project;
  }
}
