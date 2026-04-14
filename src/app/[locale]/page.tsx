import { getSocialLinks } from "@/lib/getSiteSettings";
import { HomePageClient } from "./HomePageClient";

export default async function HomePage() {
  const social = await getSocialLinks();

  return (
    <HomePageClient
      social={social}
      cvUrl="/api/resume/pt"
    />
  );
}
