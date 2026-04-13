export enum Locale {
  PT = "pt",
  EN = "en",
  ES = "es",
}

export const LOCALES = [Locale.PT, Locale.EN, Locale.ES] as const;
export const DEFAULT_LOCALE = Locale.PT;
