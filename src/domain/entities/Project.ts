import type { Locale } from "../enums";

export interface ProjectTranslation {
  id: string;
  projectId: string;
  locale: Locale;
  title: string;
  description: string;
  shortDescription?: string;
}

export interface ProjectTechStack {
  projectId: string;
  techItemId: string;
  techItem: TechItem;
}

export interface TechItem {
  id: string;
  name: string;
  iconUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  thumbnailUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  translations: ProjectTranslation[];
  techStack: ProjectTechStack[];
  tags: ProjectTag[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface ProjectTag {
  projectId: string;
  tagId: string;
  tag: Tag;
}
