import type { IResumeRepository } from "@/domain/repositories";
import type { Resume } from "@/domain/entities";
import type { Locale } from "@/domain/enums";

export class GetActiveResumeUseCase {
  constructor(private readonly repo: IResumeRepository) {}

  async execute(locale: Locale): Promise<Resume | null> {
    return this.repo.findActive(locale);
  }
}
