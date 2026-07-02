import Image from "next/image";
import Link from "next/link";
import { legalDocuments, type LegalDocument } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

type LegalDocumentPageProps = {
  documentKey: keyof typeof legalDocuments;
};

function isSectionNote(text: string) {
  return text.length <= 42 && !text.endsWith(".") && !text.endsWith(":");
}

export function LegalDocumentPage({ documentKey }: LegalDocumentPageProps) {
  const document: LegalDocument = legalDocuments[documentKey];
  const isTerms = documentKey === "terms";

  return (
    <main>
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
      </section>

      <div className="legal-layout section-shell">
        <aside className="legal-toc" aria-label="תוכן עניינים">
          <strong>תוכן עניינים</strong>
          <nav>
            {document.sections.map((section) => (
              <a key={section.title} href={`#${section.title}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-document">
          {document.sections.map((section) => (
            <section
              className="legal-section"
              id={section.title}
              key={section.title}
            >
              <h2>{section.title}</h2>
              <div className="legal-text">
                {section.paragraphs.map((paragraph, index) =>
                  isSectionNote(paragraph) ? (
                    <h3 key={`${section.title}-${index}`}>{paragraph}</h3>
                  ) : (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </article>
      </div>

      <footer className="site-footer">
        <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} />
        <div>
          <Link href="/">בית</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <a href={siteConfig.businessEntranceUrl}>כניסת עסקים</a>
        </div>
      </footer>
    </main>
  );
}
