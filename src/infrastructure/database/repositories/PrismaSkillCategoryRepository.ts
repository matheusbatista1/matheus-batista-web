import type { PrismaClient } from "@/generated/prisma/client";
import type { ISkillCategoryRepository } from "@/domain/repositories";
import type { SkillCategory } from "@/domain/entities";

export class PrismaSkillCategoryRepository
  implements ISkillCategoryRepository
{
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<SkillCategory[]> {
    const categories = await this.db.skillCategory.findMany({
      include: {
        translations: true,
        skills: {
          include: { techItem: true },
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return categories as unknown as SkillCategory[];
  }

  async findById(id: string): Promise<SkillCategory | null> {
    const category = await this.db.skillCategory.findUnique({
      where: { id },
      include: {
        translations: true,
        skills: {
          include: { techItem: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return category as unknown as SkillCategory | null;
  }

  async create(
    data: Omit<SkillCategory, "id" | "createdAt" | "updatedAt">,
  ): Promise<SkillCategory> {
    const category = await this.db.skillCategory.create({
      data: {
        sortOrder: data.sortOrder,
      },
      include: {
        translations: true,
        skills: { include: { techItem: true } },
      },
    });

    return category as unknown as SkillCategory;
  }

  async update(id: string, data: Partial<SkillCategory>): Promise<SkillCategory> {
    const category = await this.db.skillCategory.update({
      where: { id },
      data: {
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
      include: {
        translations: true,
        skills: { include: { techItem: true } },
      },
    });

    return category as unknown as SkillCategory;
  }

  async delete(id: string): Promise<void> {
    await this.db.skillCategory.delete({ where: { id } });
  }
}
