import type { Resume } from "../entities";
import type { Locale } from "../enums";

export interface IResumeRepository {
  findActive(locale: Locale): Promise<Resume | null>;
  findAll(): Promise<Resume[]>;
  create(data: Omit<Resume, "id" | "createdAt">): Promise<Resume>;
  deactivate(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
