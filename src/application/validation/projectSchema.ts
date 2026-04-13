import { z } from "zod/v4";

export const projectTranslationSchema = z.object({
  locale: z.enum(["PT", "EN", "ES"]),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().max(300).optional(),
});

export const createProjectSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  thumbnailUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  translations: z.array(projectTranslationSchema).min(1),
  tagIds: z.array(z.string()).optional(),
  techItemIds: z.array(z.string()).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
