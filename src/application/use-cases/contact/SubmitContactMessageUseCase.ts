import type { IContactMessageRepository } from "@/domain/repositories";
import type { IEmailService } from "@/domain/services";
import type { ContactMessage } from "@/domain/entities";
import { ContactStatus } from "@/domain/enums";

type Input = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
};

export class SubmitContactMessageUseCase {
  constructor(
    private readonly messageRepo: IContactMessageRepository,
    private readonly emailService: IEmailService | null,
  ) {}

  async execute(input: Input): Promise<ContactMessage> {
    const message = await this.messageRepo.create({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      status: ContactStatus.UNREAD,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });

    // Notificar admin por email (nao bloquear se falhar)
    if (this.emailService) {
      const notifyEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
      if (notifyEmail) {
        try {
          await this.emailService.send({
            to: notifyEmail,
            subject: `New contact: ${input.subject || "No subject"}`,
            html: `
              <h2>New message from portfolio</h2>
              <p><strong>Name:</strong> ${input.name}</p>
              <p><strong>Email:</strong> ${input.email}</p>
              <p><strong>Subject:</strong> ${input.subject || "N/A"}</p>
              <hr/>
              <p>${input.message.replace(/\n/g, "<br/>")}</p>
            `,
            replyTo: input.email,
          });
        } catch {
          console.error("Failed to send contact notification email");
        }
      }
    }

    return message;
  }
}
