"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/infrastructure/auth/auth";
import { makeUpdateAboutContent } from "@/infrastructure/container";

type TranslationInput = {
  locale: "PT" | "EN" | "ES";
  title: string;
  bio: string;
  headline?: string;
};

export async function updateAboutAction(input: {
  photoUrl?: string;
  translations: TranslationInput[];
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const useCase = makeUpdateAboutContent();
  await useCase.execute(input);

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
