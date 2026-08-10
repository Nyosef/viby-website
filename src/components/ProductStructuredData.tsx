import { services, type ServiceId } from "@/lib/services";
import { productSeoByService } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function ProductStructuredData({ serviceId }: { serviceId: ServiceId }) {
  const service = services[serviceId];
  const seo = productSeoByService[serviceId];
  const pageUrl = `${siteConfig.url}${seo.path === "/" ? "" : seo.path}`;
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressCountry: "IL",
      },
      areaServed: { "@type": "Country", name: "ישראל" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.whatsappNumber}`,
        contactType: "sales",
        areaServed: "IL",
        availableLanguage: [siteConfig.availableLanguage],
      },
      sameAs: [siteConfig.instagramUrl],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: siteConfig.language,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebApplication",
      "@id": `${siteConfig.url}/#web-application`,
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Viby עוזרת לעסקים להחזיר לקוחות, לבנות מאגר לקוחות ולשמור על קשר איתם בלי אפליקציה.",
      url: siteConfig.url,
      inLanguage: siteConfig.language,
      areaServed: { "@type": "Country", name: "ישראל" },
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/#${seo.schemaId}`,
      name: service.label,
      description: service.hero.text,
      url: pageUrl,
      inLanguage: siteConfig.language,
      areaServed: { "@type": "Country", name: "ישראל" },
      provider: { "@id": organizationId },
      mainEntityOfPage: pageUrl,
    },
  ];

  if (serviceId === "punch-card") {
    graph.push({
      "@type": "ItemList",
      name: "פתרונות Viby לעסקים",
      itemListElement: Object.values(services).map((item, index) => {
        const itemSeo = productSeoByService[item.id];
        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          description: item.hero.text,
          url: `${siteConfig.url}${itemSeo.path === "/" ? "" : itemSeo.path}`,
        };
      }),
    });
  }

  const structuredData = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
