"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const locales = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const;

export function LanguageSelector() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(locale: string) {
    router.replace(pathname, { locale });
  }

  return (
    <div className="flex items-center gap-4">
      {locales.map((locale, index) => (
        <div key={locale.code} className="flex items-center gap-4">
          <button
            onClick={() => handleLocaleChange(locale.code)}
            className={cn(
              "text-xl uppercase tracking-[0.8px] transition-colors",
              currentLocale === locale.code
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
            )}
          >
            {locale.label}
          </button>
          {index < locales.length - 1 && (
            <span className="size-[5px] rounded-full bg-text-tertiary" />
          )}
        </div>
      ))}
    </div>
  );
}
