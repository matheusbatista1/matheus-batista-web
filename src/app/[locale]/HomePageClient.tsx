"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactWindow } from "@/components/contact/ContactWindow";
import type { SocialLinks } from "@/lib/getSiteSettings";

type Props = {
  social: SocialLinks;
  cvUrl: string;
  available: boolean;
};

export function HomePageClient({ social, cvUrl, available }: Props) {
  const [contactOpen, setContactOpen] = useState(false);
  const locale = useLocale();

  const localeCvUrl = `/api/resume/${locale}`;

  return (
    <>
      <Header />
      <main className="relative z-10 flex-1">
        <HeroSection
          github={social.github}
          linkedin={social.linkedin}
          email={social.email}
          cvUrl={localeCvUrl}
          available={available}
        />
        <ProjectsSection />
        <AboutSection onContactOpen={() => setContactOpen(true)} />
        <SkillsSection />
      </main>
      <Footer
        github={social.github}
        linkedin={social.linkedin}
        behance={social.behance}
        email={social.email}
        cvUrl={localeCvUrl}
        available={available}
      />
      <ContactWindow
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
