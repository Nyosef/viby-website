import { serviceCatalog, serviceIds, services, type ServiceId } from "@/lib/services";
import { productSeoByService, type ProductSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { commercialTerms, monthlyPrice, subscriptionPriceNotice } from "@/lib/commercial";
import { generalVibyFaqs, punchCardSeoFaqs, punchCardTypesFaq } from "@/lib/faq";

export function ProductStructuredData({ serviceId }: { serviceId: ServiceId }) {
  const service = serviceCatalog[serviceId];
  const seo: ProductSeo = productSeoByService[serviceId];
  const pageUrl = `${siteConfig.url}${seo.path === "/" ? "" : seo.path}`;
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      alternateName: siteConfig.nameHebrew,
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
      sameAs: [siteConfig.instagramUrl, siteConfig.linkedinUrl],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      alternateName: siteConfig.nameHebrew,
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
      name: seo.schemaName ?? seo.title,
      ...(seo.schemaAlternateNames
        ? { alternateName: seo.schemaAlternateNames }
        : service.label !== seo.title
          ? { alternateName: service.label }
          : {}),
      description: seo.description,
      url: pageUrl,
      inLanguage: siteConfig.language,
      areaServed: { "@type": "Country", name: "ישראל" },
      provider: { "@id": organizationId },
      mainEntityOfPage: pageUrl,
    },
  ];

  if (serviceId === "punch-card") {
    const monthly = monthlyPrice("punch-card")!;
    const serviceNode = graph.find((node) => node["@type"] === "Service")!;
    serviceNode.offers = {
      "@type": "Offer",
      url: pageUrl,
      price: monthly,
      priceCurrency: "ILS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: monthly,
        priceCurrency: "ILS",
        billingDuration: "P1M",
      },
      description: `${subscriptionPriceNotice("punch-card")} ${commercialTerms.commitment} ${commercialTerms.vatNotice} ${commercialTerms.delivery}`,
    };

    const visibleFaqs = [
      ...services["punch-card"].buyingGuide.faqs,
      ...generalVibyFaqs,
      punchCardTypesFaq,
      ...punchCardSeoFaqs,
    ];
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      mainEntity: visibleFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });

    graph.push({
      "@type": "ItemList",
      name: "פתרונות Viby לעסקים",
      itemListElement: serviceIds.map((id, index) => {
        const itemSeo = productSeoByService[id];
        return {
          "@type": "ListItem",
          position: index + 1,
          name: itemSeo.internalLinkLabel,
          description: itemSeo.description,
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
