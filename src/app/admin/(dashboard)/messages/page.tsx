import Link from "next/link";
import { getContactMessageRepository } from "@/infrastructure/container";
import { MessageSquare } from "lucide-react";

export default async function AdminMessagesPage() {
  const repo = getContactMessageRepository();
  const messages = await repo.findAll({ limit: 100 });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Messages</h1>
        <span className="text-[13px] text-[#6e6e73]">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl bg-[#1a1a1a] p-16 text-center">
          <MessageSquare size={48} className="mx-auto mb-4 text-[#6e6e73]" />
          <p className="text-[16px] text-[#6e6e73]">No messages yet</p>
          <p className="mt-1 text-[13px] text-[#4a4a4e]">
            Messages from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-[#1a1a1a]">
          {messages.map((msg, i) => (
            <Link
              key={msg.id}
              href={`/admin/messages/${msg.id}`}
              className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/5 ${
                i > 0 ? "border-t border-white/5" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {msg.status === "UNREAD" && (
                    <span className="size-2 flex-shrink-0 rounded-full bg-[#2997ff]" />
                  )}
                  <p className={`truncate text-[13px] ${
                    msg.status === "UNREAD" ? "font-semibold text-[#f5f5f7]" : "text-[#a1a1a6]"
                  }`}>
                    {msg.name}
                  </p>
                  <span className="flex-shrink-0 text-[11px] text-[#6e6e73]">
                    {msg.email}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[12px] text-[#8c8c8c]">
                  {msg.subject ? `${msg.subject} — ` : ""}
                  {msg.message.slice(0, 80)}
                </p>
              </div>
              <div className="ml-4 flex flex-col items-end gap-1">
                <span className="text-[11px] text-[#6e6e73]">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
                <span className={`rounded px-1.5 py-0.5 text-[10px] ${
                  msg.status === "UNREAD"
                    ? "bg-[#2997ff]/15 text-[#2997ff]"
                    : msg.status === "ARCHIVED"
                      ? "bg-white/5 text-[#6e6e73]"
                      : "bg-[#30d158]/15 text-[#30d158]"
                }`}>
                  {msg.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
