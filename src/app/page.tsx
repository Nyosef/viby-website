import { MultiServiceLanding } from "@/components/MultiServiceLanding";
import { isServiceId, services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const requestedService = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialService = isServiceId(requestedService)
    ? requestedService
    : "punch-card";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.ogImage}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressCountry: siteConfig.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${siteConfig.whatsappNumber}`,
          contactType: "sales",
          areaServed: siteConfig.areaServed,
          availableLanguage: ["he"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Viby עוזרת לעסקים להחזיר לקוחות, לבנות מאגר לקוחות ולשמור על קשר איתם בלי אפליקציה.",
        url: siteConfig.url,
        areaServed: siteConfig.areaServed,
        featureList: Object.values(services).map((service) => service.label),
      },
      {
        "@type": "ItemList",
        name: "פתרונות Viby לעסקים",
        itemListElement: Object.values(services).map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.label,
          description: service.hero.text,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MultiServiceLanding initialService={initialService} />
    </>
  );
}
