import PageFrame from "../components/PageFrame";
import { HeroSection } from "../sections/HeroSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { CTASection } from "../sections/CTASection";

export default function HomePage() {
  return (
    <PageFrame>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </PageFrame>
  );
}
