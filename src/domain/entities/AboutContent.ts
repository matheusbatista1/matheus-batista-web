import type { Locale } from "../enums";

export interface AboutContentTranslation {
  id: string;
  aboutContentId: string;
  locale: Locale;
  title: string;
  bio: string;
  headline?: string;
}

export interface AboutContent {
  id: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  translations: AboutContentTranslation[];
}
