import { prisma } from "../database/prisma";
import { PrismaProjectRepository } from "../database/repositories/PrismaProjectRepository";
import { PrismaContactMessageRepository } from "../database/repositories/PrismaContactMessageRepository";
import { PrismaAboutContentRepository } from "../database/repositories/PrismaAboutContentRepository";
import { PrismaSkillCategoryRepository } from "../database/repositories/PrismaSkillCategoryRepository";
import { PrismaResumeRepository } from "../database/repositories/PrismaResumeRepository";
import { PrismaSiteSettingRepository } from "../database/repositories/PrismaSiteSettingRepository";
import { ResendEmailService } from "../email/ResendEmailService";

import { SubmitContactMessageUseCase } from "@/application/use-cases/contact/SubmitContactMessageUseCase";
import { ListContactMessagesUseCase } from "@/application/use-cases/contact/ListContactMessagesUseCase";
import { MarkMessageReadUseCase } from "@/application/use-cases/contact/MarkMessageReadUseCase";
import { ListProjectsUseCase } from "@/application/use-cases/projects/ListProjectsUseCase";
import { GetProjectBySlugUseCase } from "@/application/use-cases/projects/GetProjectBySlugUseCase";
import { CreateProjectUseCase } from "@/application/use-cases/projects/CreateProjectUseCase";
import { UpdateProjectUseCase } from "@/application/use-cases/projects/UpdateProjectUseCase";
import { DeleteProjectUseCase } from "@/application/use-cases/projects/DeleteProjectUseCase";
import { GetAboutContentUseCase } from "@/application/use-cases/about/GetAboutContentUseCase";
import { UpdateAboutContentUseCase } from "@/application/use-cases/about/UpdateAboutContentUseCase";
import { ListSkillCategoriesUseCase } from "@/application/use-cases/skills/ListSkillCategoriesUseCase";
import { GetActiveResumeUseCase } from "@/application/use-cases/resume/GetActiveResumeUseCase";

// Repositories
const projectRepo = new PrismaProjectRepository(prisma);
const contactRepo = new PrismaContactMessageRepository(prisma);
const aboutRepo = new PrismaAboutContentRepository(prisma);
const skillRepo = new PrismaSkillCategoryRepository(prisma);
const resumeRepo = new PrismaResumeRepository(prisma);
const settingRepo = new PrismaSiteSettingRepository(prisma);

// Services
const emailService = process.env.RESEND_API_KEY
  ? new ResendEmailService()
  : null;

// Use case factories
export const makeSubmitContactMessage = () =>
  new SubmitContactMessageUseCase(contactRepo, emailService);

export const makeListContactMessages = () =>
  new ListContactMessagesUseCase(contactRepo);

export const makeMarkMessageRead = () =>
  new MarkMessageReadUseCase(contactRepo);

export const makeListProjects = () =>
  new ListProjectsUseCase(projectRepo);

export const makeGetProjectBySlug = () =>
  new GetProjectBySlugUseCase(projectRepo);

export const makeCreateProject = () =>
  new CreateProjectUseCase(projectRepo);

export const makeUpdateProject = () =>
  new UpdateProjectUseCase(projectRepo);

export const makeDeleteProject = () =>
  new DeleteProjectUseCase(projectRepo);

export const makeGetAboutContent = () =>
  new GetAboutContentUseCase(aboutRepo);

export const makeUpdateAboutContent = () =>
  new UpdateAboutContentUseCase(aboutRepo);

export const makeListSkillCategories = () =>
  new ListSkillCategoriesUseCase(skillRepo);

export const makeGetActiveResume = () =>
  new GetActiveResumeUseCase(resumeRepo);

// Direct repository access (para admin)
export function getProjectRepository() { return projectRepo; }
export function getContactMessageRepository() { return contactRepo; }
export function getAboutContentRepository() { return aboutRepo; }
export function getSkillCategoryRepository() { return skillRepo; }
export function getResumeRepository() { return resumeRepo; }
export function getSiteSettingRepository() { return settingRepo; }
