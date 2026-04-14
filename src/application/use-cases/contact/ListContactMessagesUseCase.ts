import type { IContactMessageRepository, ListMessagesParams } from "@/domain/repositories";
import type { ContactMessage } from "@/domain/entities";

export class ListContactMessagesUseCase {
  constructor(private readonly repo: IContactMessageRepository) {}

  async execute(params: ListMessagesParams): Promise<{
    messages: ContactMessage[];
    total: number;
  }> {
    const [messages, total] = await Promise.all([
      this.repo.findAll(params),
      this.repo.count(params.status),
    ]);

    return { messages, total };
  }
}
