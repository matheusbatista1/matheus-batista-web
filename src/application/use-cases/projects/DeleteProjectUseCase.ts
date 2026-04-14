import type { IProjectRepository } from "@/domain/repositories";

export class DeleteProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
