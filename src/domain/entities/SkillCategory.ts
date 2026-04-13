import type { Locale } from "../enums";
import type { TechItem } from "./Project";

export interface SkillCategoryTranslation {
  id: string;
  skillCategoryId: string;
  locale: Locale;
  name: string;
  description?: string;
}

export interface TechSkill {
  id: string;
  techItemId: string;
  skillCategoryId: string;
  proficiency: number;
  sortOrder: number;
  techItem: TechItem;
}

export interface SkillCategory {
  id: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  translations: SkillCategoryTranslation[];
  skills: TechSkill[];
}
