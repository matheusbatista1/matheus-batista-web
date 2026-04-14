import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const messagesDir = path.resolve(__dirname, "../../../messages");

function loadMessages(locale: string) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return getKeys(value as Record<string, unknown>, fullKey);
    }
    return [fullKey];
  });
}

describe("Translation files consistency", () => {
  const pt = loadMessages("pt");
  const en = loadMessages("en");
  const es = loadMessages("es");

  const ptKeys = getKeys(pt).sort();
  const enKeys = getKeys(en).sort();
  const esKeys = getKeys(es).sort();

  it("should have the same keys in PT and EN", () => {
    expect(ptKeys).toEqual(enKeys);
  });

  it("should have the same keys in PT and ES", () => {
    expect(ptKeys).toEqual(esKeys);
  });

  it("should not have empty values in PT", () => {
    const emptyKeys = ptKeys.filter((key) => {
      const value = key.split(".").reduce((obj: any, k) => obj?.[k], pt);
      return typeof value === "string" && value.trim() === "";
    });
    expect(emptyKeys).toEqual([]);
  });

  it("should not have empty values in EN", () => {
    const emptyKeys = enKeys.filter((key) => {
      const value = key.split(".").reduce((obj: any, k) => obj?.[k], en);
      return typeof value === "string" && value.trim() === "";
    });
    expect(emptyKeys).toEqual([]);
  });

  it("should not have empty values in ES", () => {
    const emptyKeys = esKeys.filter((key) => {
      const value = key.split(".").reduce((obj: any, k) => obj?.[k], es);
      return typeof value === "string" && value.trim() === "";
    });
    expect(emptyKeys).toEqual([]);
  });

  it("should have metadata.title in all locales", () => {
    expect(pt.metadata.title).toBeDefined();
    expect(en.metadata.title).toBeDefined();
    expect(es.metadata.title).toBeDefined();
  });

  it("should have hero.name consistent across locales", () => {
    expect(pt.hero.name).toBe(en.hero.name);
    expect(en.hero.name).toBe(es.hero.name);
  });

  it("should contain 'Software Engineer' variant in each locale title", () => {
    expect(pt.metadata.title).toContain("Engenheiro de Software");
    expect(en.metadata.title).toContain("Software Engineer");
    expect(es.metadata.title).toContain("Ingeniero de Software");
  });
});
