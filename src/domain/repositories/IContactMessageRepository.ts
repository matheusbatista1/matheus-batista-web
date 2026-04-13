import type { ContactMessage } from "../entities";
import type { ContactStatus } from "../enums";

export interface ListMessagesParams {
  status?: ContactStatus;
  limit?: number;
  offset?: number;
}

export interface IContactMessageRepository {
  findAll(params: ListMessagesParams): Promise<ContactMessage[]>;
  findById(id: string): Promise<ContactMessage | null>;
  create(data: Omit<ContactMessage, "id" | "createdAt" | "readAt">): Promise<ContactMessage>;
  updateStatus(id: string, status: ContactStatus): Promise<ContactMessage>;
  delete(id: string): Promise<void>;
  count(status?: ContactStatus): Promise<number>;
}
