import type { PrismaClient } from "@/generated/prisma/client";
import type {
  IProjectRepository,
  ListProjectsParams,
} from "@/domain/repositories";
import type { Project } from "@/domain/entities";
import type { Locale } from "@/domain/enums";

export class PrismaProjectRepository implements IProjectRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(params: ListProjectsParams): Promise<Project[]> {
    const { publishedOnly, featured, limit, offset } = params;

    const projects = await this.db.project.findMany({
      where: {
        ...(publishedOnly && { published: true }),
        ...(featured !== undefined && { featured }),
      },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
      orderBy: { sortOrder: "asc" },
      take: limit,
      skip: offset,
    });

    return projects as unknown as Project[];
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const project = await this.db.project.findUnique({
      where: { slug },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
    });

    return project as unknown as Project | null;
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.db.project.findUnique({
      where: { id },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
    });

    return project as unknown as Project | null;
  }

  async create(
    data: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ): Promise<Project> {
    const project = await this.db.project.create({
      data: {
        slug: data.slug,
        thumbnailUrl: data.thumbnailUrl,
        liveUrl: data.liveUrl,
        repoUrl: data.repoUrl,
        featured: data.featured,
        published: data.published,
        sortOrder: data.sortOrder,
      },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
    });

    return project as unknown as Project;
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const project = await this.db.project.update({
      where: { id },
      data: {
        ...(data.slug && { slug: data.slug }),
        ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl }),
        ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl }),
        ...(data.repoUrl !== undefined && { repoUrl: data.repoUrl }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.published !== undefined && { published: data.published }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
      include: {
        translations: true,
        tags: { include: { tag: true } },
        techStack: { include: { techItem: true } },
      },
    });

    return project as unknown as Project;
  }

  async delete(id: string): Promise<void> {
    await this.db.project.delete({ where: { id } });
  }

  async count(publishedOnly?: boolean): Promise<number> {
    return this.db.project.count({
      where: publishedOnly ? { published: true } : undefined,
    });
  }
}
