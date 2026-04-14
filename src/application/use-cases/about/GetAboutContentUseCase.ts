import type { IAboutContentRepository } from "@/domain/repositories";
import type { AboutContent } from "@/domain/entities";

export class GetAboutContentUseCase {
  constructor(private readonly repo: IAboutContentRepository) {}

  async execute(): Promise<AboutContent | null> {
    return this.repo.find();
  }
}
