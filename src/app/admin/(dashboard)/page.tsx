import { FolderOpen, MessageSquare, Eye, Mail } from "lucide-react";
import { getProjectRepository, getContactMessageRepository } from "@/infrastructure/container";
import { ContactStatus } from "@/domain/enums";

export default async function AdminDashboard() {
  const projectRepo = getProjectRepository();
  const messageRepo = getContactMessageRepository();

  const [projectCount, publishedCount, totalMessages, unreadMessages] =
    await Promise.all([
      projectRepo.count(),
      projectRepo.count(true),
      messageRepo.count(),
      messageRepo.count(ContactStatus.UNREAD),
    ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectCount,
      icon: FolderOpen,
      color: "text-[#2997ff]",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: Eye,
      color: "text-[#30d158]",
    },
    {
      label: "Total Messages",
      value: totalMessages,
      icon: MessageSquare,
      color: "text-[#ff9f0a]",
    },
    {
      label: "Unread",
      value: unreadMessages,
      icon: Mail,
      color: "text-[#ff453a]",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-[#1a1a1a] p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6e6e73]">{stat.label}</span>
              <stat.icon size={18} className={stat.color} strokeWidth={1.5} />
            </div>
            <p className="mt-2 text-[32px] font-bold text-[#f5f5f7]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent messages */}
      <div className="mt-10">
        <h2 className="mb-4 text-[16px] font-medium text-[#f5f5f7]">
          Recent Messages
        </h2>
        <RecentMessages />
      </div>
    </div>
  );
}

async function RecentMessages() {
  const repo = getContactMessageRepository();
  const messages = await repo.findAll({ limit: 5 });

  if (messages.length === 0) {
    return (
      <div className="rounded-xl bg-[#1a1a1a] p-8 text-center">
        <MessageSquare size={32} className="mx-auto mb-3 text-[#6e6e73]" />
        <p className="text-[14px] text-[#6e6e73]">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-[#1a1a1a]">
      {messages.map((msg, i) => (
        <div
          key={msg.id}
          className={`flex items-center justify-between px-5 py-4 ${
            i > 0 ? "border-t border-white/5" : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {msg.status === "UNREAD" && (
                <span className="size-2 rounded-full bg-[#2997ff]" />
              )}
              <p className="truncate text-[13px] font-medium text-[#f5f5f7]">
                {msg.name}
              </p>
              <span className="text-[11px] text-[#6e6e73]">{msg.email}</span>
            </div>
            <p className="mt-0.5 truncate text-[12px] text-[#8c8c8c]">
              {msg.subject || msg.message.slice(0, 60)}
            </p>
          </div>
          <span className="ml-4 text-[11px] text-[#6e6e73]">
            {new Date(msg.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}
