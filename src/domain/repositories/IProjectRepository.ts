import type { Project } from "../entities";
import type { Locale } from "../enums";

export interface ListProjectsParams {
  locale: Locale;
  publishedOnly?: boolean;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface IProjectRepository {
  findAll(params: ListProjectsParams): Promise<Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
  findById(id: string): Promise<Project | null>;
  create(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
  count(publishedOnly?: boolean): Promise<number>;
}
