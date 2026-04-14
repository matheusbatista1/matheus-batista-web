import type { ISkillCategoryRepository } from "@/domain/repositories";
import type { SkillCategory } from "@/domain/entities";

export class ListSkillCategoriesUseCase {
  constructor(private readonly repo: ISkillCategoryRepository) {}

  async execute(): Promise<SkillCategory[]> {
    return this.repo.findAll();
  }
}
