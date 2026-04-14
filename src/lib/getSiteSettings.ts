import { getSiteSettingRepository } from "@/infrastructure/container";

export type SocialLinks = {
  github: string;
  linkedin: string;
  behance: string;
  email: string;
};

export async function getSocialLinks(): Promise<SocialLinks> {
  const repo = getSiteSettingRepository();
  const settings = await repo.getMany([
    "social_github",
    "social_linkedin",
    "social_behance",
    "social_email",
  ]);

  return {
    github: settings.social_github ?? "",
    linkedin: settings.social_linkedin ?? "",
    behance: settings.social_behance ?? "",
    email: settings.social_email ?? "",
  };
}

export async function getAvailableForWork(): Promise<boolean> {
  const repo = getSiteSettingRepository();
  const value = await repo.get("available_for_work");
  return value === "true";
}
