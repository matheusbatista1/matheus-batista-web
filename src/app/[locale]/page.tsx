import { getSocialLinks, getAvailableForWork } from "@/lib/getSiteSettings";
import { getAboutContentRepository, getProjectRepository } from "@/infrastructure/container";
import { HomePageClient } from "./HomePageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const localeMap: Record<string, string> = { pt: "PT", en: "EN", es: "ES" };
  const dbLocale = localeMap[locale] ?? "PT";

  const [social, available, about, projects] = await Promise.all([
    getSocialLinks(),
    getAvailableForWork(),
    getAboutContentRepository().find(),
    getProjectRepository().findAll({
      locale: dbLocale as never,
      publishedOnly: true,
    }),
  ]);

  const aboutTranslation = about?.translations.find(
    (t) => (t.locale as string) === dbLocale,
  );

  const projectItems = projects.map((p) => {
    const translation = p.translations.find((t) => (t.locale as string) === dbLocale) ?? p.translations[0];
    return {
      slug: p.slug,
      title: translation?.title ?? p.slug,
      description: translation?.description ?? "",
      thumbnailUrl: p.thumbnailUrl,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      techStack: p.techStack.map((ts) => ts.techItem.name),
    };
  });

  return (
    <HomePageClient
      social={social}
      cvUrl={`/api/resume/${locale}`}
      available={available}
      bio={aboutTranslation?.bio}
      projects={projectItems}
    />
  );
}
