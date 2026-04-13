import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Criar AdminUser
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL environment variable is required for seeding");
  }

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Matheus Batista",
    },
  });
  console.log(`Admin user created/verified: ${adminEmail}`);

  // Criar About Content inicial
  const aboutContent = await prisma.aboutContent.upsert({
    where: { id: "default-about" },
    update: {},
    create: {
      id: "default-about",
      translations: {
        create: [
          {
            locale: "PT",
            title: "Sobre Mim",
            headline: "Engenheiro de Software baseado no Brasil",
            bio: "Projeto e implemento APIs escaláveis e sistemas web, do código à documentação técnica. Já trabalhei com ERPs, sistemas PDV, plataformas de e-commerce e outras aplicações customizadas para empresas de médio e grande porte. Atualmente, estou focado em desenvolvimento backend usando o ecossistema .NET, C#, SQL Server, junto com Angular e Azure.",
          },
          {
            locale: "EN",
            title: "About Me",
            headline: "Software Engineer based in Brazil",
            bio: "I design and implement scalable APIs and web systems, from code to technical documentation. I've worked with ERPs, POS systems, e-commerce platforms, and other custom applications for medium and large companies. Currently, I'm focused on backend development using the .NET ecosystem, C#, SQL Server, along with Angular and Azure.",
          },
          {
            locale: "ES",
            title: "Sobre Mí",
            headline: "Ingeniero de Software basado en Brasil",
            bio: "Diseño e implemento APIs escalables y sistemas web, desde el código hasta la documentación técnica. He trabajado con ERPs, sistemas POS, plataformas de e-commerce y otras aplicaciones personalizadas para empresas medianas y grandes. Actualmente, estoy enfocado en desarrollo backend usando el ecosistema .NET, C#, SQL Server, junto con Angular y Azure.",
          },
        ],
      },
    },
  });
  console.log(`About content created: ${aboutContent.id}`);

  // Criar Skill Categories
  const categories = [
    { id: "cat-frontend", sort: 0, translations: { PT: "Frontend", EN: "Frontend", ES: "Frontend" } },
    { id: "cat-backend", sort: 1, translations: { PT: "Backend", EN: "Backend", ES: "Backend" } },
    { id: "cat-database", sort: 2, translations: { PT: "Banco de Dados", EN: "Database", ES: "Base de Datos" } },
    { id: "cat-devops", sort: 3, translations: { PT: "DevOps", EN: "DevOps", ES: "DevOps" } },
    { id: "cat-tools", sort: 4, translations: { PT: "Ferramentas", EN: "Tools", ES: "Herramientas" } },
  ];

  for (const cat of categories) {
    await prisma.skillCategory.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        sortOrder: cat.sort,
        translations: {
          create: [
            { locale: "PT", name: cat.translations.PT },
            { locale: "EN", name: cat.translations.EN },
            { locale: "ES", name: cat.translations.ES },
          ],
        },
      },
    });
  }
  console.log("Skill categories created");

  // Criar TechItems
  const techItems = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "Angular", "Sass",
    "C#", ".NET", "Node.js", "Python", "Java",
    "SQL Server", "PostgreSQL", "MongoDB", "MySQL", "Redis",
    "Azure", "Docker", "Git", "GitHub Actions", "Kubernetes", "Linux", "Nginx", "Terraform",
    "VS Code", "Figma", "Postman", "Jira", "Notion",
  ];

  for (const name of techItems) {
    await prisma.techItem.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`${techItems.length} tech items created`);

  // Criar Site Settings padroes
  const settings = [
    { key: "social_github", value: "https://github.com/matheusbatista1" },
    { key: "social_linkedin", value: "" },
    { key: "social_behance", value: "" },
    { key: "social_email", value: "matheus.s.batista@gmail.com" },
    { key: "available_for_work", value: "true" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log("Site settings created");

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Seed error:", e);
    prisma.$disconnect();
    process.exit(1);
  });
