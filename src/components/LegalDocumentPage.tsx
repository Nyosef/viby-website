import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import Image from "next/image";
import Link from "next/link";
import type { LegalDocument } from "@/lib/legal-content";
import type { LegalDocumentKey } from "@/lib/legal-types";
import { siteConfig } from "@/lib/site";
import { previousLegalDocuments } from "@/lib/legal-history";
import { currentLegalDocument, latestLegalArchive } from "@/lib/legal-versions";
import { legalIdentity, missingLegalIdentity } from "@/lib/legal-identity";
import { PrintLegalDocument } from "./PrintLegalDocument";
import { PhoneIcon } from "./PhoneIcon";

function linkedContactText(text: string) {
  const parts = text.split(siteConfig.whatsappDisplay);
  return parts.flatMap((part, index) =>
    index === parts.length - 1
      ? [part]
      : [part, <a key={index} href={`tel:+${siteConfig.whatsappNumber}`} data-analytics-location="support_page"><bdi dir="ltr">{siteConfig.whatsappDisplay}</bdi></a>],
  );
}

type LegalDocumentPageProps = {
  documentKey: LegalDocumentKey;
  archivedDocument?: LegalDocument;
};
export function LegalDocumentPage({ documentKey, archivedDocument }: LegalDocumentPageProps) {
  const document: LegalDocument = archivedDocument ?? currentLegalDocument(documentKey);
  const isTerms = documentKey === "terms";
  const currentPath = isTerms ? "/terms" : "/privacy";
  const path = archivedDocument ? `${currentPath}/versions/${document.version}` : currentPath;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: document.title,
    description: document.description,
    url: `${siteConfig.url}${path}`,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    dateModified: document.updated.split(".").reverse().join("-"),
  };

  return (
    <main className="legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Viby">
          <Image
            src="/viby_transparent.png"
            alt="Viby"
            width={180}
            height={120}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="ניווט משפטי">
          <Link href="/">בית</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms" aria-current={isTerms ? "page" : undefined}>
            תנאי שימוש
          </Link>
          <Link href="/privacy" aria-current={!isTerms ? "page" : undefined}>
            מדיניות פרטיות
          </Link>
        </nav>
        <Link className="header-cta" href="/support">
          תמיכה
        </Link>
      </header>

      <section className="legal-hero section-shell">
        <p className="eyebrow">מסמכים משפטיים</p>
        <h1>{document.title}</h1>
        <p>{document.description}</p>
        {isTerms && !archivedDocument && document.sections.some((section) => section.id === "terms-8a") ? <Link className="legal-relief-jump" href="#terms-8a">למדיניות הסיוע לעסקים בחירום</Link> : null}
        <span>עודכן לאחרונה: {document.updated}</span>
        <p className="legal-version">גרסה: <bdi>{document.version}</bdi> · תאריך תחילה: {document.effectiveDate.split("-").reverse().join(".")}</p>
        {archivedDocument ? <><p className="legal-status">גרסה שמורה לעיון. <Link href={currentPath}>למסמך העדכני</Link></p>{["2026-10-08", "2026-10-19"].includes(document.version) ? <p className="legal-status">פרטי הקשר בגרסה זו תוקנו ב־21.10.2026 כדי להסיר מספר אישי.</p> : null}</> : (
          <p className="legal-status"><Link href={`${currentPath}/versions/${latestLegalArchive(documentKey).version}`}>לגרסה הקודמת</Link></p>
        )}
        {!archivedDocument && missingLegalIdentity().length ? <p className="legal-draft-notice">טיוטה לתצוגה מקדימה — פרטי העוסק וערוץ הפניות יושלמו לפני פרסום.</p> : null}
        <PrintLegalDocument />
      </section>

      <div className="legal-layout section-shell">
        <aside className="legal-toc" aria-label="תוכן עניינים">
          <strong>תוכן עניינים</strong>
          <nav>
            {document.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-document">
          {document.sections.map((section) => (
            <section
              className={section.id === "terms-8a" ? "legal-section legal-section-relief" : "legal-section"}
              id={section.id}
              key={section.id}
            >
              <span id={previousLegalDocuments[documentKey].sections.find((old) => old.id === section.id)?.title ?? section.title} aria-hidden="true" />
              <h2>{section.title}</h2>
              <div className="legal-text">
                {section.blocks.map((block, index) => {
                  const key = `${section.id}-${index}`;
                  if (block.type === "heading") return <h3 key={key}>{block.text}</h3>;
                  if (block.type === "paragraph") return <p key={key}>{linkedContactText(block.text)}</p>;
                  if (block.type === "link") return <p key={key}><a href={block.href}>{block.text}</a></p>;
                  if (block.type === "list") {
                    const List = block.ordered ? "ol" : "ul";
                    return <List key={key}>{block.items.map((item, i) => <li key={i}>{item}</li>)}</List>;
                  }
                })}
              </div>
            </section>
          ))}
        </article>
      </div>
      {!archivedDocument ? <nav className="legal-contact section-shell" aria-label="פניות משפטיות ופרטיות">
        {legalIdentity.email ? <a href={`mailto:${legalIdentity.email}`}>{legalIdentity.email}</a> : null}
        <a href={`tel:+${siteConfig.whatsappNumber}`} data-analytics-location="support_page" aria-label={`התקשרו ל־Viby במספר ${siteConfig.whatsappDisplay}`}><PhoneIcon /><bdi dir="ltr">{siteConfig.whatsappDisplay}</bdi></a>
        <a href={`https://wa.me/${siteConfig.whatsappNumber}`} data-analytics-location="support_page">WhatsApp: <bdi>{siteConfig.whatsappDisplay}</bdi></a>
      </nav> : null}

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <Link href="/">בית</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <PrivacyPreferencesButton />

        </div>
      </footer>
    </main>
  );
}
