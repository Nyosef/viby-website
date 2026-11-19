import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { editorialStructuredData, type EditorialArticle as ArticleDetails } from "@/lib/editorial";
import styles from "./EditorialArticle.module.css";

const dateFormatter = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jerusalem",
});
const formatDate = (date: string) => dateFormatter.format(new Date(`${date}T12:00:00+02:00`));

export function EditorialArticle({ article, children, transition, afterCta, showDivider = false }: {
  article: ArticleDetails;
  children: ReactNode;
  transition: string;
  afterCta?: string;
  showDivider?: boolean;
}) {
  const schema = editorialStructuredData(article);
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={108} height={72} priority /></Link>
        <Link href="/business-faq">מדריכים לבעלי עסקים</Link>
      </header>
      <div className={`${styles.shell} ${styles.articleShell}`}>
        <nav className={styles.breadcrumbs} aria-label="פירורי לחם">
          <Link href="/">בית</Link><span aria-hidden="true">/</span><Link href="/business-faq">מדריכים לעסקים</Link>
        </nav>
        <article className={styles.article}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>מדריך לבעלי עסקים</p>
            <h1>{article.heading}</h1>
            <p className={styles.subtitle}>{article.subtitle}</p>
            <p className={styles.byline}>
              {article.byline} (<bdi dir="ltr">Viby</bdi>) <span aria-hidden="true">·</span> <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
              {article.modifiedDate !== article.publishedDate ? <> <span aria-hidden="true">·</span> עודכן <time dateTime={article.modifiedDate}>{formatDate(article.modifiedDate)}</time></> : null}
            </p>
          </header>
          <div className={styles.body} data-article-body>{children}</div>
          {showDivider ? <hr className={styles.divider} /> : null}
          <aside className={styles.cta} aria-labelledby="editorial-cta-title">
            <p>{transition}</p>
            <h2 id="editorial-cta-title"><bdi dir="ltr">Viby UP</bdi> — הפתרון המלא לנוכחות העסק בגוגל וב־<bdi dir="ltr">AI</bdi></h2>
            <Link href="/viby-up" className={styles.ctaLink}>הכירו את Viby UP <span aria-hidden="true">←</span></Link>
          </aside>
          {afterCta ? <p className={styles.publicationNote}><em>{afterCta}</em></p> : null}
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
