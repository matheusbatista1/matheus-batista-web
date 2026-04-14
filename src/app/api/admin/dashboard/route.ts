import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getProjectRepository, getContactMessageRepository } from "@/infrastructure/container";
import { ContactStatus } from "@/domain/enums";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const projectRepo = getProjectRepository();
  const messageRepo = getContactMessageRepository();

  const [projectCount, publishedCount, totalMessages, unreadMessages, recentMessages] =
    await Promise.all([
      projectRepo.count(),
      projectRepo.count(true),
      messageRepo.count(),
      messageRepo.count(ContactStatus.UNREAD),
      messageRepo.findAll({ limit: 5 }),
    ]);

  return NextResponse.json({
    stats: {
      projectCount,
      publishedCount,
      totalMessages,
      unreadMessages,
    },
    recentMessages: recentMessages.map((msg) => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      status: msg.status,
      createdAt: new Date(msg.createdAt).toISOString(),
    })),
  });
}
