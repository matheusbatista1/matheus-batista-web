import type { Locale } from "../enums";

export interface Resume {
  id: string;
  locale: Locale;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  active: boolean;
  createdAt: Date;
}
