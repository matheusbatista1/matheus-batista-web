"use client";

import { useRouter } from "next/navigation";
import { markMessageReadAction, archiveMessageAction, deleteMessageAction } from "@/actions/messages";
import { Check, Archive, Trash2, Reply } from "lucide-react";

type Props = {
  id: string;
  status: string;
  email: string;
};

export function MessageActions({ id, status, email }: Props) {
  const router = useRouter();

  async function handleMarkRead() {
    await markMessageReadAction(id);
    router.refresh();
  }

  async function handleArchive() {
    await archiveMessageAction(id);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this message?")) return;
    await deleteMessageAction(id);
    router.push("/admin/messages");
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-2 rounded-lg bg-[#2997ff] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#40a9ff]"
      >
        <Reply size={14} />
        Reply
      </a>

      {status === "UNREAD" && (
        <button
          type="button"
          onClick={handleMarkRead}
          className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-[13px] text-[#a1a1a6] transition-colors hover:bg-white/10"
        >
          <Check size={14} />
          Mark as read
        </button>
      )}

      <button
        type="button"
        onClick={handleArchive}
        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-[13px] text-[#a1a1a6] transition-colors hover:bg-white/10"
      >
        <Archive size={14} />
        Archive
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-[13px] text-[#ff453a] transition-colors hover:bg-[#ff453a]/10"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}
