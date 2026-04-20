import { Helmet } from "react-helmet-async";
import PageFrame from "../components/PageFrame";
import { HeroSection } from "../sections/HeroSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { CTASection } from "../sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>
          Dekadents — Discordi kogukond kunstnikele ja loomeinimestele
        </title>
        <meta
          name="description"
          content="Dekadents on kureeritud Discordi kogukond kunstnikele, fotograafidele, luuletajatele ja teistele loomeinimestele. Jaga oma töid, saa inspiratsiooni ja ühine loomingulise kogukonnaga."
        />
        <meta
          property="og:title"
          content="Dekadents — Discordi kogukond kunstnikele ja loomeinimestele"
        />
        <meta
          property="og:description"
          content="Dekadents on kureeritud Discordi kogukond kunstnikele, fotograafidele, luuletajatele ja teistele loomeinimestele."
        />
        <meta property="og:url" content="https://dekadents.eu/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dekadents.eu/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Dekadents",
            description:
              "Kureeritud Discordi kogukond kunstnikele, fotograafidele, luuletajatele ja teistele loomeinimestele",
            url: "https://dekadents.eu",
            sameAs: ["https://discord.gg/wCykm7AFNE"],
            foundingDate: "2024",
            knowsAbout: [
              "Digital Art",
              "Photography",
              "Poetry",
              "Creative Expression",
              "Visual Arts",
            ],
          })}
        </script>
      </Helmet>
      <PageFrame>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </PageFrame>
    </>
  );
}
