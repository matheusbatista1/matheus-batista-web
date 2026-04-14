import { getSocialLinks, getAvailableForWork } from "@/lib/getSiteSettings";
import { HomePageClient } from "./HomePageClient";

export default async function HomePage() {
  const [social, available] = await Promise.all([
    getSocialLinks(),
    getAvailableForWork(),
  ]);

  return (
    <HomePageClient
      social={social}
      cvUrl="/api/resume/pt"
      available={available}
    />
  );
}
