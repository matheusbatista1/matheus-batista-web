export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

export interface ISiteSettingRepository {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  getMany(keys: string[]): Promise<Record<string, string>>;
  getAll(): Promise<SiteSetting[]>;
}
