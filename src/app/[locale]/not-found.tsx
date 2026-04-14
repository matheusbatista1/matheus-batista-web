import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

export default function NotFoundPage() {
  const t = useTranslations("error");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6">
      <h1 className="text-[200px] font-bold leading-none text-text-primary/10 md:text-[400px]">
        404
      </h1>
      <p className="mt-[-40px] text-2xl font-light uppercase tracking-wider text-text-secondary md:mt-[-80px] md:text-4xl">
        {t("notFound")}
      </p>
      <Link
        href="/"
        className="mt-12 flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm uppercase tracking-wider text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
      >
        <ArrowUpRight size={18} />
        {t("goHome")}
      </Link>
    </main>
  );
}
