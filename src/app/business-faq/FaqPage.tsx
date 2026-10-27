import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { siteConfig } from "@/lib/site";
import type { ReactNode } from "react";
import type { FaqAnswer } from "./content";
import styles from "./faq.module.css";

const hubPath = "/business-faq";

export function FaqFrame({ path, title, description, children }: {
  path: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name: title,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={108} height={72} priority /></Link>
        <Link href={hubPath}>שאלות נפוצות לעסקים</Link>
      </header>
      {children}
      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/">כרטיסייה דיגיטלית לעסק</Link>
        <nav aria-label="קישורים שימושיים">
          <Link href="/support">תמיכה</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <PrivacyPreferencesButton />
        </nav>
      </footer>
    </main>
  );
}

function AnswerVisual({ variant }: { variant: FaqAnswer["visual"] }) {
  const comparison = variant === "comparison";
  return (
    <figure className={styles.visual}>
      <div className={styles.photoFrame}>
        <Image
          src={comparison ? "/phase3_new.jpg" : "/phase_1.jpg"}
          alt={comparison
            ? "המחשה של כרטיסיית Viby דיגיטלית בטלפון לצד שלט QR"
            : "המחשה של סריקת שלט Viby ליד דלפק עסק"}
          fill
          sizes="(max-width: 800px) calc(100vw - 2rem), 37vw"
          loading="eager"
          className={styles.photo}
          data-faq-image
        />
        {comparison ? <div className={styles.paperCue} aria-hidden="true"><strong>כרטיסיית נייר</strong><span>● ● ● ○ ○</span></div> : null}
      </div>
      <figcaption>המחשה בלבד</figcaption>
    </figure>
  );
}

export function FaqAnswerPage({ faq }: { faq: FaqAnswer }) {
  return (
    <FaqFrame path={faq.path} title={faq.metadataTitle} description={faq.description}>
      <div className={`${styles.shell} ${styles.answerShell}`}>
        <nav className={styles.breadcrumbs} aria-label="פירורי לחם"><Link href="/">בית</Link><span aria-hidden="true">/</span><Link href={hubPath}>שאלות נפוצות</Link></nav>
        <div className={styles.answerGrid}>
          <article className={styles.answerArticle}>
            <p className={styles.eyebrow}>תשובה קצרה לבעלי עסקים</p>
            <h1>{faq.title}</h1>
            <section className={styles.answerBody} data-faq-answer aria-label="התשובה">
              {faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
            <div className={styles.ctaBlock}>
              <h2>{faq.ctaHeading}</h2>
              <Link className={styles.primaryLink} href="/">{faq.ctaLabel}<span aria-hidden="true">←</span></Link>
            </div>
          </article>
          <AnswerVisual variant={faq.visual} />
        </div>
        <nav className={styles.related} aria-label="שאלות נוספות">
          <span>שאלות נוספות</span>
          <Link href={faq.relatedPath}>{faq.relatedLabel}<span aria-hidden="true">←</span></Link>
          <Link href={hubPath}>חזרה לכל השאלות</Link>
        </nav>
      </div>
    </FaqFrame>
  );
}
