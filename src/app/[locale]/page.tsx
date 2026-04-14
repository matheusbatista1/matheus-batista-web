"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactWindow } from "@/components/contact/ContactWindow";

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <ProjectsSection />
        <AboutSection onContactOpen={() => setContactOpen(true)} />
        <SkillsSection />
      </main>
      <Footer />
      <ContactWindow
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
