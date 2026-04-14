"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { MbLogo } from "@/components/portfolio/MbLogo";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/resume", label: "Resume / CV", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ user }: Props) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-full w-[240px] flex-shrink-0 flex-col border-r border-white/5 bg-[#111]">
      {/* Logo */}
      <div className="flex h-[64px] items-center gap-2 px-6">
        <Link href="/admin" className="flex items-center">
          <MbLogo className="h-[32px] w-auto" />
        </Link>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-[#6e6e73]">
          admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                  isActive(item.href)
                    ? "bg-white/10 text-[#f5f5f7]"
                    : "text-[#8c8c8c] hover:bg-white/5 hover:text-[#f5f5f7]"
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info + logout */}
      <div className="border-t border-white/5 p-4">
        <div className="mb-3 flex items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[12px] text-[#f5f5f7]">
              {(user.name || user.email || "A").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-[#f5f5f7]">
              {user.name || "Admin"}
            </p>
            <p className="truncate text-[11px] text-[#6e6e73]">
              {user.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-[#8c8c8c] transition-colors hover:bg-white/5 hover:text-[#f5f5f7]"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
