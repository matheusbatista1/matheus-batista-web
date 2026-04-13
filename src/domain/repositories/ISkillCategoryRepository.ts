import type { SkillCategory } from "../entities";

export interface ISkillCategoryRepository {
  findAll(): Promise<SkillCategory[]>;
  findById(id: string): Promise<SkillCategory | null>;
  create(data: Omit<SkillCategory, "id" | "createdAt" | "updatedAt">): Promise<SkillCategory>;
  update(id: string, data: Partial<SkillCategory>): Promise<SkillCategory>;
  delete(id: string): Promise<void>;
}
