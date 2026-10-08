import Image from "next/image";
import Link from "next/link";
import { legalDocuments, type LegalDocument } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";
import { previousLegalDocuments } from "@/lib/legal-history";
import { legalIdentity, missingLegalIdentity } from "@/lib/legal-identity";
import { PrintLegalDocument } from "./PrintLegalDocument";

type LegalDocumentPageProps = {
  documentKey: keyof typeof legalDocuments;
  archivedDocument?: LegalDocument;
};
export function LegalDocumentPage({ documentKey, archivedDocument }: LegalDocumentPageProps) {
  const document: LegalDocument = archivedDocument ?? legalDocuments[documentKey];
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
        <span>עודכן לאחרונה: {document.updated}</span>
        <p className="legal-version">גרסה: <bdi>{document.version}</bdi> · תאריך תחילה: {document.effectiveDate.split("-").reverse().join(".")}</p>
        {archivedDocument ? <p className="legal-status">גרסה שמורה לעיון. <Link href={currentPath}>למסמך העדכני</Link></p> : (
          <p className="legal-status"><Link href={`${currentPath}/versions/${previousLegalDocuments[documentKey].version}`}>לגרסה הקודמת</Link></p>
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
              className="legal-section"
              id={section.id}
              key={section.id}
            >
              <span id={previousLegalDocuments[documentKey].sections.find((old) => old.id === section.id)?.title ?? section.title} aria-hidden="true" />
              <h2>{section.title}</h2>
              <div className="legal-text">
                {section.blocks.map((block, index) => {
                  const key = `${section.id}-${index}`;
                  if (block.type === "heading") return <h3 key={key}>{block.text}</h3>;
                  if (block.type === "paragraph") return <p key={key}>{block.text}</p>;
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
        <a href={`https://wa.me/${siteConfig.whatsappNumber}`} data-analytics-location="support_page">WhatsApp: <bdi>{siteConfig.whatsappDisplay}</bdi></a>
      </nav> : null}

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <Link href="/">בית</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>

        </div>
      </footer>
    </main>
  );
}
