import type { PrismaClient } from "@/generated/prisma/client";
import type {
  ISiteSettingRepository,
  SiteSetting,
} from "@/domain/repositories";

export class PrismaSiteSettingRepository implements ISiteSettingRepository {
  constructor(private readonly db: PrismaClient) {}

  async get(key: string): Promise<string | null> {
    const setting = await this.db.siteSetting.findUnique({
      where: { key },
    });

    return setting?.value ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    await this.db.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  async getMany(keys: string[]): Promise<Record<string, string>> {
    const settings = await this.db.siteSetting.findMany({
      where: { key: { in: keys } },
    });

    return Object.fromEntries(settings.map((s) => [s.key, s.value]));
  }

  async getAll(): Promise<SiteSetting[]> {
    return this.db.siteSetting.findMany();
  }
}
