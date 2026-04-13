export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface IEmailService {
  send(payload: EmailPayload): Promise<{ id: string }>;
}
