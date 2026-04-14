import type { IContactMessageRepository } from "@/domain/repositories";
import type { ContactMessage } from "@/domain/entities";
import { ContactStatus } from "@/domain/enums";

export class MarkMessageReadUseCase {
  constructor(private readonly repo: IContactMessageRepository) {}

  async execute(id: string): Promise<ContactMessage> {
    return this.repo.updateStatus(id, ContactStatus.READ);
  }
}
