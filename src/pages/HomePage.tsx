import { Helmet } from "react-helmet-async";
import PageFrame from "../components/PageFrame";
import { HeroSection } from "../sections/HeroSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { CTASection } from "../sections/CTASection";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>
          Dekadents — Eesti kunstikogukond Discordis
        </title>
        <meta
          name="description"
          content="Dekadents on Eesti kunstikogukond Discordis kunstnikele, fotograafidele, luuletajatele ja loomeinimestele. Jaga kunsti, leia inspiratsiooni ja avasta Eesti kunstinäitusi."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Dekadents — Eesti kunstikogukond Discordis"
        />
        <meta
          property="og:description"
          content="Dekadents on Eesti kunstikogukond Discordis kunstnikele, fotograafidele, luuletajatele ja teistele loomeinimestele."
        />
        <meta property="og:url" content="https://dekadents.eu/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="et_EE" />
        <meta property="og:site_name" content="Dekadents" />
        <meta property="og:image" content="https://dekadents.eu/assets/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dekadents — Eesti kunstikogukond Discordis" />
        <meta
          name="twitter:description"
          content="Eesti kunstikogukond Discordis kunstnikele, fotograafidele ja loomeinimestele."
        />
        <meta name="twitter:image" content="https://dekadents.eu/assets/logo.webp" />
        <link rel="canonical" href="https://dekadents.eu/" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dekadents",
              description:
                "Eesti kunstikogukond Discordis kunstnikele, fotograafidele, luuletajatele ja teistele loomeinimestele.",
              url: "https://dekadents.eu",
              logo: "https://dekadents.eu/assets/logo.webp",
              sameAs: ["https://discord.gg/wCykm7AFNE"],
              foundingDate: "2026",
              areaServed: "Estonia",
              inLanguage: "et-EE",
              knowsAbout: [
                "Eesti kunst",
                "kunstikogukond",
                "kunstinäitused",
                "digitaalne kunst",
                "fotograafia",
                "luule",
                "visuaalkunst",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dekadents",
              url: "https://dekadents.eu",
              inLanguage: "et-EE",
              description:
                "Dekadents koondab Eesti kunstihuvilisi, loojaid, galeriid ja kunstinäituste infot.",
              keywords:
                "eesti kunst, kunst, kunstnikud, kunstikogukond, kunstinäitused, fotograafia, Discord",
            },
          ])}
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
