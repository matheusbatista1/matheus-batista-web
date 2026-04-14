"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

const skillCategories = [
  {
    key: "frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Angular", "Sass"],
  },
  {
    key: "backend",
    items: ["C#", ".NET", "Node.js", "Python", "Java"],
  },
  {
    key: "database",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    key: "devops",
    items: [
      "Azure", "Docker", "Git", "GitHub Actions",
      "Kubernetes", "Linux", "Nginx", "Terraform",
    ],
  },
  {
    key: "tools",
    items: ["VS Code", "Figma", "Postman", "Jira", "Notion"],
  },
];

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="relative bg-bg-primary py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[3px] text-text-tertiary">
            / {t("sectionTitle")}
          </span>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: catIndex * 0.1 }}
              className={
                category.key === "tools"
                  ? "md:col-span-2 flex flex-col items-center"
                  : ""
              }
            >
              <h3 className="mb-8 text-xl font-medium text-text-primary">
                {t(category.key as "frontend" | "backend" | "database" | "devops" | "tools")}
              </h3>

              <div className="flex flex-wrap gap-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + itemIndex * 0.03 }}
                    className="flex size-[100px] flex-col items-center justify-center rounded-xl bg-bg-secondary transition-colors hover:bg-bg-tertiary"
                  >
                    <span className="text-xs text-text-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dividers between rows */}
        <div className="mt-16 h-px w-full bg-border" />
      </div>
    </section>
  );
}
