export const SITE_CONFIG = {
  name: "Matheus Batista",
  title: "Matheus Batista | Software Engineer",
  description: {
    pt: "Engenheiro de Software baseado no Brasil. Projetando e implementando APIs escalaveis e sistemas web.",
    en: "Software Engineer based in Brazil. Designing and implementing scalable APIs and web systems.",
    es: "Ingeniero de Software basado en Brasil. Disenando e implementando APIs escalables y sistemas web.",
  },
  url: "https://matheusbatistadev.com",
  locale: {
    default: "pt" as const,
    available: ["pt", "en", "es"] as const,
  },
} as const;
