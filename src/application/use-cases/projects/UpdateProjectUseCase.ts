import type { IProjectRepository } from "@/domain/repositories";
import type { Project } from "@/domain/entities";
import type { UpdateProjectInput } from "@/application/validation/projectSchema";
import { prisma } from "@/infrastructure/database/prisma";

export class UpdateProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(id: string, input: UpdateProjectInput): Promise<Project> {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(input.slug && { slug: input.slug }),
        ...(input.thumbnailUrl !== undefined && { thumbnailUrl: input.thumbnailUrl }),
        ...(input.liveUrl !== undefined && { liveUrl: input.liveUrl }),
        ...(input.repoUrl !== undefined && { repoUrl: input.repoUrl }),
        ...(input.featured !== undefined && { featured: input.featured }),
        ...(input.published !== undefined && { published: input.published }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
    });

    // Atualizar traducoes se fornecidas
    if (input.translations) {
      for (const t of input.translations) {
        await prisma.projectTranslation.upsert({
          where: { projectId_locale: { projectId: id, locale: t.locale as "PT" | "EN" | "ES" } },
          update: { title: t.title, description: t.description, shortDescription: t.shortDescription },
          create: {
            projectId: id,
            locale: t.locale as "PT" | "EN" | "ES",
            title: t.title,
            description: t.description,
            shortDescription: t.shortDescription,
          },
        });
      }
    }

    return project as unknown as Project;
  }
}
