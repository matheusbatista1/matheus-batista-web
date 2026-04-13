import type { ContactStatus } from "../enums";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: ContactStatus;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  readAt?: Date;
}
