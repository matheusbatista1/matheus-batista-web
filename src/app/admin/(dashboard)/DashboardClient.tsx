"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FolderOpen, MessageSquare, Eye, Mail, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Stats = {
  projectCount: number;
  publishedCount: number;
  totalMessages: number;
  unreadMessages: number;
};

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

type DashboardData = {
  stats: Stats;
  recentMessages: Message[];
};

type Props = {
  initialData: DashboardData;
};

const POLL_INTERVAL = 10_000; // 10 segundos

const statConfig = [
  { key: "projectCount" as const, label: "Total Projects", icon: FolderOpen, color: "text-[#2997ff]" },
  { key: "publishedCount" as const, label: "Published", icon: Eye, color: "text-[#30d158]" },
  { key: "totalMessages" as const, label: "Total Messages", icon: MessageSquare, color: "text-[#ff9f0a]" },
  { key: "unreadMessages" as const, label: "Unread", icon: Mail, color: "text-[#ff453a]" },
];

export function DashboardClient({ initialData }: Props) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const newData = await res.json();
        setData(newData);
        setLastUpdate(new Date());
      }
    } catch {
      // Silenciar erros de polling
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Polling automatico
  useEffect(() => {
    const interval = setInterval(() => fetchData(), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Visibility API — atualizar quando a aba fica visivel
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === "visible") {
        fetchData();
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [fetchData]);

  return (
    <div>
      {/* Header com indicador de update */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#4a4a4e]" suppressHydrationWarning>
            Updated {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            type="button"
            onClick={() => fetchData(true)}
            className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-[#6e6e73] transition-colors hover:bg-white/10 hover:text-[#f5f5f7]"
            aria-label="Refresh"
          >
            <RefreshCw
              size={14}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statConfig.map((stat) => (
          <div key={stat.key} className="rounded-xl bg-[#1a1a1a] p-6">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6e6e73]">{stat.label}</span>
              <stat.icon size={18} className={stat.color} strokeWidth={1.5} />
            </div>
            <motion.p
              key={data.stats[stat.key]}
              initial={{ opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-[32px] font-bold text-[#f5f5f7]"
            >
              {data.stats[stat.key]}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Recent messages */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-[#f5f5f7]">
            Recent Messages
          </h2>
          {data.recentMessages.length > 0 && (
            <Link
              href="/admin/messages"
              className="text-[12px] text-[#2997ff] hover:underline"
            >
              View all
            </Link>
          )}
        </div>

        {data.recentMessages.length === 0 ? (
          <div className="rounded-xl bg-[#1a1a1a] p-8 text-center">
            <MessageSquare size={32} className="mx-auto mb-3 text-[#6e6e73]" />
            <p className="text-[14px] text-[#6e6e73]">No messages yet</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-[#1a1a1a]">
            <AnimatePresence mode="popLayout">
              {data.recentMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link
                    href={`/admin/messages/${msg.id}`}
                    className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/3 ${
                      i > 0 ? "border-t border-white/5" : ""
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {msg.status === "UNREAD" && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="size-2 flex-shrink-0 rounded-full bg-[#2997ff]"
                          />
                        )}
                        <p className="truncate text-[13px] font-medium text-[#f5f5f7]">
                          {msg.name}
                        </p>
                        <span className="text-[11px] text-[#6e6e73]">
                          {msg.email}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[12px] text-[#8c8c8c]">
                        {msg.subject || msg.message.slice(0, 60)}
                      </p>
                    </div>
                    <span className="ml-4 text-[11px] text-[#6e6e73]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
