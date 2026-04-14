import { getSocialLinks, getAvailableForWork } from "@/lib/getSiteSettings";
import { getAboutContentRepository } from "@/infrastructure/container";
import { HomePageClient } from "./HomePageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const [social, available, about] = await Promise.all([
    getSocialLinks(),
    getAvailableForWork(),
    getAboutContentRepository().find(),
  ]);

  const localeMap: Record<string, string> = { pt: "PT", en: "EN", es: "ES" };
  const dbLocale = localeMap[locale] ?? "PT";

  const aboutTranslation = about?.translations.find(
    (t) => (t.locale as string) === dbLocale,
  );

  return (
    <HomePageClient
      social={social}
      cvUrl={`/api/resume/${locale}`}
      available={available}
      bio={aboutTranslation?.bio}
    />
  );
}
