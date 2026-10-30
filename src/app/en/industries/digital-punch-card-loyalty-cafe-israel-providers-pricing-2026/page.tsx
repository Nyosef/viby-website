import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { commercialTerms, monthlyPrice } from "@/lib/commercial";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "@/app/industries/industry.module.css";
import { DocumentLocale } from "./DocumentLocale";

const path = "/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026";
const hebrewPath = "/industries/cafes";
const title = "Digital punch card loyalty for cafes in Israel: providers and pricing (2026)";
const description =
  "Compare digital punch card loyalty for cafes in Israel. See how Viby handles QR signup, staff-controlled stamps, wallet cards, example rewards, and starting pricing.";

const baseMetadata = createPageMetadata({ path, title, description });

export const metadata = {
  ...baseMetadata,
  alternates: {
    canonical: path,
    languages: { en: path, "he-IL": hebrewPath },
  },
  openGraph: {
    ...baseMetadata.openGraph,
    locale: "en_US",
  },
};

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi, I would like to learn how a Viby digital punch card could work for my cafe.")}`;
const monthlyPriceLabel = `₪${monthlyPrice("punch-card")}`;
const initialCommitment = `an initial ${commercialTerms.initialMonths}-month commitment`;

export default function EnglishCafePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name: `${title} | Viby`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className={`${styles.page} ${styles.englishCafe}`} lang="en" dir="ltr">
      <DocumentLocale />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="Viby homepage"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} priority /></Link>
        <div className={styles.headerLinks}>
          <Link className={styles.homeLink} href={hebrewPath} lang="he" dir="rtl">עברית</Link>
          <Link className={styles.homeLink} href="/">Digital punch cards</Link>
        </div>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="english-cafe-title">
        <div>
          <p className={styles.eyebrow}>For cafes and coffee carts in Israel</p>
          <h1 id="english-cafe-title">Digital punch card loyalty for cafes in Israel: providers and pricing in 2026</h1>
          <p className={styles.lead}>Compare a digital punch card for your cafe by looking at how customers join, who awards stamps, where the card lives, and what the provider charges. With Viby, customers scan a QR code and save their card in Apple Wallet or Google Wallet. Your staff controls eligible stamps.</p>
          <a className={styles.action} href={whatsappUrl} data-analytics-location="hero">Ask about a cafe loyalty card</a>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.photo}>
            <Image src="/industries/cafe-counter-illustrative.webp" alt="Illustrative cafe counter with coffee, pastries, and a Viby tabletop sign" fill sizes="(max-width: 800px) 85vw, 45vw" priority />
            <span className={styles.photoCaption}>Illustrative cafe scene</span>
          </div>
          <div className={styles.demoCard} aria-label="Illustrative digital punch card for a cafe">
            <span className={styles.demoLabel}>Illustrative example</span>
            <div className={styles.demoTop}><strong>My coffee card</strong><span aria-hidden="true">☕</span></div>
            <div className={styles.stamps} aria-label="Six out of ten stamps">
              {Array.from({ length: 10 }, (_, index) => <span className={index < 6 ? styles.filled : ""} key={index}>{index < 6 ? "✓" : "·"}</span>)}
            </div>
            <p>Tenth coffee on us</p>
            <small>Example reward only</small>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="english-cafe-reward">
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div>
            <h2 id="english-cafe-reward">Loyalty that fits the morning rush</h2>
            <p>A customer joins from a counter QR code, then keeps their punch card on their phone. After an eligible purchase, an authorized staff member adds a stamp. A free tenth coffee after nine qualifying purchases is one possible reward; your cafe chooses its own rules. The reward and card shown here are illustrative, not a real cafe&apos;s offer.</p>
          </div>
          <div className={styles.reward} aria-label="Example cafe reward"><span aria-hidden="true">☕</span><strong>Tenth coffee free</strong><small>Illustrative reward</small></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.concern}`} aria-labelledby="english-cafe-pricing">
        <div className={`${styles.shell} ${styles.concernInner}`}>
          <div className={styles.concernNumber} aria-hidden="true">₪</div>
          <div>
            <h2 id="english-cafe-pricing">Compare providers and pricing</h2>
            <p>Check whether a provider includes staff-controlled stamps, wallet cards, setup, signage, and clear reward rules. Viby&apos;s digital punch card starts at {monthlyPriceLabel} per month, with {initialCommitment}. Delivery and approved extras are priced separately. The final scope and price belong in the approved order. <Link href="/customer-retention#pricing-title">Read the full pricing terms (Hebrew)</Link>.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.finalSection} ${styles.shell}`} aria-labelledby="english-cafe-contact">
        <h2 id="english-cafe-contact">See how Viby could work in your cafe</h2>
        <p>Tell us how your team handles busy hours and which purchases should earn a stamp. We can show a coffee loyalty card and discuss a reward that fits your service flow.</p>
        <a className={styles.action} href={whatsappUrl} data-analytics-location="final_cta">Talk to Viby about your cafe</a>
      </section>

      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="Viby homepage"><Image src="/viby_transparent.png" alt="Viby" width={92} height={62} /></Link>
        <nav aria-label="Useful links">
          <Link href="/how-it-works">How Viby works (Hebrew)</Link>
          <Link href="/support">Support (Hebrew)</Link>
          <Link href="/terms">Terms (Hebrew)</Link>
          <Link href="/privacy">Privacy policy (Hebrew)</Link>
          <PrivacyPreferencesButton label="Privacy settings" />
        </nav>
      </footer>
    </main>
  );
}
