import { describe, it, expect } from "vitest";
import { Locale, LOCALES, DEFAULT_LOCALE } from "@/domain/enums/Locale";
import { ContactStatus } from "@/domain/enums/ContactStatus";

describe("Locale enum", () => {
  it("should have 3 locales", () => {
    expect(LOCALES).toHaveLength(3);
  });

  it("should contain pt, en, es", () => {
    expect(LOCALES).toContain(Locale.PT);
    expect(LOCALES).toContain(Locale.EN);
    expect(LOCALES).toContain(Locale.ES);
  });

  it("should have pt as default locale", () => {
    expect(DEFAULT_LOCALE).toBe(Locale.PT);
  });

  it("should have correct string values", () => {
    expect(Locale.PT).toBe("pt");
    expect(Locale.EN).toBe("en");
    expect(Locale.ES).toBe("es");
  });
});

describe("ContactStatus enum", () => {
  it("should have 4 statuses", () => {
    const values = Object.values(ContactStatus);
    expect(values).toHaveLength(4);
  });

  it("should contain all expected statuses", () => {
    expect(ContactStatus.UNREAD).toBe("UNREAD");
    expect(ContactStatus.READ).toBe("READ");
    expect(ContactStatus.REPLIED).toBe("REPLIED");
    expect(ContactStatus.ARCHIVED).toBe("ARCHIVED");
  });
});
