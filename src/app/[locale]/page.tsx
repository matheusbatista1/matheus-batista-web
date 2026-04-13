import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-bg-primary">
      <div className="text-center">
        <p className="text-text-secondary text-lg">{t("greeting")}</p>
        <h1 className="text-text-primary text-6xl font-bold tracking-tight mt-2">
          {t("name")}
        </h1>
        <p className="text-text-secondary text-xl mt-4">{t("role")}</p>
      </div>
    </main>
  );
}
