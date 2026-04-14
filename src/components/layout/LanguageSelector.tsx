"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

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
    <div className="flex items-center gap-[17px]">
      {locales.map((locale, index) => (
        <div key={locale.code} className="flex items-center gap-[17px]">
          <button
            type="button"
            onClick={() => handleLocaleChange(locale.code)}
            className={`text-[20px] font-normal uppercase leading-[1.75] tracking-[0.8px] transition-colors ${
              currentLocale === locale.code
                ? "text-text-primary"
                : "text-[#8c8c8c] hover:text-text-secondary"
            }`}
          >
            {locale.label}
          </button>
          {index < locales.length - 1 && (
            <span className="size-[5px] rounded-full bg-[#8c8c8c]" />
          )}
        </div>
      ))}
    </div>
  );
}
