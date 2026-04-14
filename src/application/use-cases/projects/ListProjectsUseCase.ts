import type { IProjectRepository, ListProjectsParams } from "@/domain/repositories";
import type { Project } from "@/domain/entities";

export class ListProjectsUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(params: ListProjectsParams): Promise<Project[]> {
    return this.repo.findAll(params);
  }
}
