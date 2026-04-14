import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/auth/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type Props = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-full">
      <AdminSidebar user={session.user ?? { name: null, email: null, image: null }} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
