import type { PrismaClient } from "@/generated/prisma/client";
import type {
  IContactMessageRepository,
  ListMessagesParams,
} from "@/domain/repositories";
import type { ContactMessage } from "@/domain/entities";
import type { ContactStatus } from "@/domain/enums";

export class PrismaContactMessageRepository
  implements IContactMessageRepository
{
  constructor(private readonly db: PrismaClient) {}

  async findAll(params: ListMessagesParams): Promise<ContactMessage[]> {
    const { status, limit, offset } = params;

    const messages = await this.db.contactMessage.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return messages as unknown as ContactMessage[];
  }

  async findById(id: string): Promise<ContactMessage | null> {
    const message = await this.db.contactMessage.findUnique({
      where: { id },
    });

    return message as unknown as ContactMessage | null;
  }

  async create(
    data: Omit<ContactMessage, "id" | "createdAt" | "readAt">,
  ): Promise<ContactMessage> {
    const message = await this.db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: data.status,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });

    return message as unknown as ContactMessage;
  }

  async updateStatus(
    id: string,
    status: ContactStatus,
  ): Promise<ContactMessage> {
    const message = await this.db.contactMessage.update({
      where: { id },
      data: {
        status,
        ...(status === "READ" && { readAt: new Date() }),
      },
    });

    return message as unknown as ContactMessage;
  }

  async delete(id: string): Promise<void> {
    await this.db.contactMessage.delete({ where: { id } });
  }

  async count(status?: ContactStatus): Promise<number> {
    return this.db.contactMessage.count({
      where: status ? { status } : undefined,
    });
  }
}
