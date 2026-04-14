"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/infrastructure/auth/auth";
import { makeCreateProject, makeUpdateProject, makeDeleteProject } from "@/infrastructure/container";
import { createProjectSchema, updateProjectSchema } from "@/application/validation/projectSchema";

export async function createProjectAction(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const raw = Object.fromEntries(formData);
  const data = {
    ...raw,
    featured: raw.featured === "true",
    published: raw.published === "true",
    sortOrder: Number(raw.sortOrder) || 0,
    translations: JSON.parse(raw.translations as string),
    tagIds: raw.tagIds ? JSON.parse(raw.tagIds as string) : undefined,
    techItemIds: raw.techItemIds ? JSON.parse(raw.techItemIds as string) : undefined,
  };

  const parsed = createProjectSchema.parse(data);
  const useCase = makeCreateProject();
  await useCase.execute(parsed);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const raw = Object.fromEntries(formData);
  const data = {
    ...raw,
    featured: raw.featured === "true",
    published: raw.published === "true",
    sortOrder: Number(raw.sortOrder) || 0,
    translations: raw.translations ? JSON.parse(raw.translations as string) : undefined,
    tagIds: raw.tagIds ? JSON.parse(raw.tagIds as string) : undefined,
    techItemIds: raw.techItemIds ? JSON.parse(raw.techItemIds as string) : undefined,
  };

  const parsed = updateProjectSchema.parse(data);
  const useCase = makeUpdateProject();
  await useCase.execute(id, parsed);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const useCase = makeDeleteProject();
  await useCase.execute(id);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
