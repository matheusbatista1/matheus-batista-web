import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/application/validation/contactSchema";
import { createProjectSchema } from "@/application/validation/projectSchema";

describe("contactFormSchema", () => {
  it("should validate a correct contact form", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Hello",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const data = {
      name: "",
      email: "john@example.com",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const data = {
      name: "John Doe",
      email: "not-an-email",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject short message", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      message: "Short",
    };

    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should allow optional subject", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a valid test message.",
    };

    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject honeypot with content", () => {
    const data = {
      name: "Bot",
      email: "bot@spam.com",
      message: "Buy cheap stuff now!!!!",
      honeypot: "gotcha",
    };

    const result = contactFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe("createProjectSchema", () => {
  it("should validate a correct project", () => {
    const data = {
      slug: "my-project",
      translations: [
        { locale: "PT", title: "Meu Projeto", description: "Descricao do projeto" },
      ],
    };

    const result = createProjectSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject invalid slug format", () => {
    const data = {
      slug: "My Project!",
      translations: [
        { locale: "PT", title: "Meu Projeto", description: "Descricao" },
      ],
    };

    const result = createProjectSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject empty translations", () => {
    const data = {
      slug: "my-project",
      translations: [],
    };

    const result = createProjectSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should accept optional URLs", () => {
    const data = {
      slug: "my-project",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/user/repo",
      translations: [
        { locale: "EN", title: "My Project", description: "Description" },
      ],
    };

    const result = createProjectSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject invalid URLs", () => {
    const data = {
      slug: "my-project",
      liveUrl: "not-a-url",
      translations: [
        { locale: "EN", title: "My Project", description: "Description" },
      ],
    };

    const result = createProjectSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should default featured and published to false", () => {
    const data = {
      slug: "my-project",
      translations: [
        { locale: "PT", title: "Projeto", description: "Descricao" },
      ],
    };

    const result = createProjectSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.featured).toBe(false);
      expect(result.data.published).toBe(false);
    }
  });
});
