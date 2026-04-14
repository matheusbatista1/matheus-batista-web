import type { IProjectRepository } from "@/domain/repositories";
import type { Project } from "@/domain/entities";

export class GetProjectBySlugUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(slug: string): Promise<Project | null> {
    return this.repo.findBySlug(slug);
  }
}
