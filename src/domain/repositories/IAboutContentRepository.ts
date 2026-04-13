import type { AboutContent } from "../entities";

export interface IAboutContentRepository {
  find(): Promise<AboutContent | null>;
  upsert(data: Partial<AboutContent>): Promise<AboutContent>;
}
