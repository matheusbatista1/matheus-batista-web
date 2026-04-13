import { prisma } from "../database/prisma";
import { PrismaProjectRepository } from "../database/repositories/PrismaProjectRepository";
import { PrismaContactMessageRepository } from "../database/repositories/PrismaContactMessageRepository";
import { PrismaAboutContentRepository } from "../database/repositories/PrismaAboutContentRepository";
import { PrismaSkillCategoryRepository } from "../database/repositories/PrismaSkillCategoryRepository";
import { PrismaResumeRepository } from "../database/repositories/PrismaResumeRepository";
import { PrismaSiteSettingRepository } from "../database/repositories/PrismaSiteSettingRepository";

// Repository singletons
const projectRepository = new PrismaProjectRepository(prisma);
const contactMessageRepository = new PrismaContactMessageRepository(prisma);
const aboutContentRepository = new PrismaAboutContentRepository(prisma);
const skillCategoryRepository = new PrismaSkillCategoryRepository(prisma);
const resumeRepository = new PrismaResumeRepository(prisma);
const siteSettingRepository = new PrismaSiteSettingRepository(prisma);

export function getProjectRepository() {
  return projectRepository;
}

export function getContactMessageRepository() {
  return contactMessageRepository;
}

export function getAboutContentRepository() {
  return aboutContentRepository;
}

export function getSkillCategoryRepository() {
  return skillCategoryRepository;
}

export function getResumeRepository() {
  return resumeRepository;
}

export function getSiteSettingRepository() {
  return siteSettingRepository;
}
