import { Resend } from "resend";
import type { IEmailService, EmailPayload } from "@/domain/services";

export class ResendEmailService implements IEmailService {
  private getClient() {
    return new Resend(process.env.RESEND_API_KEY);
  }

  async send(payload: EmailPayload): Promise<{ id: string }> {
    const resend = this.getClient();

    const { data, error } = await resend.emails.send({
      from: "Portfolio <noreply@matheusbatistadev.com>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { id: data?.id ?? "unknown" };
  }
}
