import { notFound } from "next/navigation";
import { getContactMessageRepository } from "@/infrastructure/container";
import { MessageActions } from "./MessageActions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MessageDetailPage({ params }: Props) {
  const { id } = await params;
  const repo = getContactMessageRepository();
  const message = await repo.findById(id);

  if (!message) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold">{message.name}</h1>
        <p className="mt-1 text-[13px] text-[#6e6e73]">{message.email}</p>
      </div>

      <div className="rounded-xl bg-[#1a1a1a] p-6">
        {/* Meta info */}
        <div className="mb-6 flex flex-wrap gap-4 text-[12px] text-[#6e6e73]">
          <span>
            Date: {new Date(message.createdAt).toLocaleString()}
          </span>
          {message.subject && <span>Subject: {message.subject}</span>}
          <span className={`rounded px-1.5 py-0.5 ${
            message.status === "UNREAD"
              ? "bg-[#2997ff]/15 text-[#2997ff]"
              : "bg-[#30d158]/15 text-[#30d158]"
          }`}>
            {message.status}
          </span>
        </div>

        {/* Message body */}
        <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#a1a1a6]">
          {message.message}
        </div>

        {/* IP/UA info */}
        {(message.ipAddress || message.userAgent) && (
          <div className="mt-6 border-t border-white/5 pt-4 text-[11px] text-[#4a4a4e]">
            {message.ipAddress && <p>IP: {message.ipAddress}</p>}
            {message.userAgent && (
              <p className="mt-1 truncate">UA: {message.userAgent}</p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <MessageActions id={message.id} status={message.status} email={message.email} />
    </div>
  );
}
