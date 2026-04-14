import { describe, it, expect } from "vitest";
import { SITE_CONFIG } from "@/lib/constants";

describe("SITE_CONFIG", () => {
  it("should have correct site name", () => {
    expect(SITE_CONFIG.name).toBe("Matheus Batista");
  });

  it("should have correct title", () => {
    expect(SITE_CONFIG.title).toBe("Matheus Batista | Software Engineer");
  });

  it("should have descriptions for all locales", () => {
    expect(SITE_CONFIG.description.pt).toBeDefined();
    expect(SITE_CONFIG.description.en).toBeDefined();
    expect(SITE_CONFIG.description.es).toBeDefined();
  });

  it("should have correct default locale", () => {
    expect(SITE_CONFIG.locale.default).toBe("pt");
  });

  it("should support 3 locales", () => {
    expect(SITE_CONFIG.locale.available).toHaveLength(3);
    expect(SITE_CONFIG.locale.available).toContain("pt");
    expect(SITE_CONFIG.locale.available).toContain("en");
    expect(SITE_CONFIG.locale.available).toContain("es");
  });

  it("should have correct URL", () => {
    expect(SITE_CONFIG.url).toBe("https://matheusbatistadev.com");
  });
});
