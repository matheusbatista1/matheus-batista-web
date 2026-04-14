"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/infrastructure/auth/auth";
import { getContactMessageRepository } from "@/infrastructure/container";
import { ContactStatus } from "@/domain/enums";

export async function markMessageReadAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const repo = getContactMessageRepository();
  await repo.updateStatus(id, ContactStatus.READ);

  revalidatePath("/admin/messages");
}

export async function archiveMessageAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const repo = getContactMessageRepository();
  await repo.updateStatus(id, ContactStatus.ARCHIVED);

  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const repo = getContactMessageRepository();
  await repo.delete(id);

  revalidatePath("/admin/messages");
}
