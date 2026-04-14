import { getAboutContentRepository, getSiteSettingRepository } from "@/infrastructure/container";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  const aboutRepo = getAboutContentRepository();
  const settingRepo = getSiteSettingRepository();

  const [about, settings] = await Promise.all([
    aboutRepo.find(),
    settingRepo.getMany([
      "social_github",
      "social_linkedin",
      "social_behance",
      "social_email",
      "available_for_work",
    ]),
  ]);

  const ptBio = about?.translations.find((t) => t.locale === ("PT" as never));
  const enBio = about?.translations.find((t) => t.locale === ("EN" as never));
  const esBio = about?.translations.find((t) => t.locale === ("ES" as never));

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Settings</h1>
      <SettingsForm
        about={{
          bioPt: ptBio?.bio ?? "",
          bioEn: enBio?.bio ?? "",
          bioEs: esBio?.bio ?? "",
          headlinePt: ptBio?.headline ?? "",
          headlineEn: enBio?.headline ?? "",
          headlineEs: esBio?.headline ?? "",
        }}
        social={{
          github: settings.social_github ?? "",
          linkedin: settings.social_linkedin ?? "",
          behance: settings.social_behance ?? "",
          email: settings.social_email ?? "",
        }}
        available={settings.available_for_work === "true"}
      />
    </div>
  );
}
