import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { blackFridayPath } from "@/lib/black-friday";
import { productSeoEntries } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { ServiceId } from "@/lib/services";

export function SiteFooter({ activeServiceId }: { activeServiceId?: ServiceId }) {
  return (
    <footer className="v2-footer">
      <div className="v2-shell">
        <div className="v2-footer-brand">
          <Image
            src="/viby_transparent.png"
            alt="Viby"
            width={140}
            height={94}
          />
          <p>© {new Date().getFullYear()} וייבי (<bdi>Viby</bdi>). כל הזכויות שמורות.</p>
        </div>

        <nav className="v2-footer-group" aria-label="פתרונות Viby">
          <strong>פתרונות Viby</strong>
          <div>
            {productSeoEntries.map((entry) => (
              <Link
                href={entry.path}
                aria-current={entry.serviceId === activeServiceId ? "page" : undefined}
                key={entry.serviceId}
              >
                {entry.internalLinkLabel}
              </Link>
            ))}
          </div>
        </nav>

        <nav className="v2-footer-group" aria-label="פתרונות לפי סוג העסק">
          <strong>פתרונות לפי סוג העסק</strong>
          <div>
            <Link href="/industries/cafes">כרטיסייה דיגיטלית לבתי קפה</Link>
            <Link href="/industries/car-washes">כרטיסיית ניקוב דיגיטלית לשטיפת רכב</Link>
            <Link href="/industries/bakeries">כרטיסייה דיגיטלית למאפיות</Link>
            <Link href="/industries/hair-salons">כרטיסייה דיגיטלית למספרות</Link>
            <Link href="/en/industries/digital-punch-card-loyalty-cafe-israel-providers-pricing-2026" lang="en" dir="ltr">Digital punch cards for cafes (English)</Link>
          </div>
        </nav>

        <nav className="v2-footer-group" aria-label="קישורים שימושיים">
          <strong>קישורים שימושיים</strong>
          <div>
            <Link href="/how-it-works">איך Viby עובדת</Link>
            <Link href="/about">אודות וייבי</Link>
            <Link href="/customer-retention">מועדון לקוחות דיגיטלי לעסקים</Link>
            <Link href={blackFridayPath}>מבצעי בלאק פריידי לכרטיסיות ניקוב דיגיטליות</Link>
            <Link href="/business-faq">שאלות נפוצות לעסקים</Link>
            <Link href="/support">תמיכה</Link>
            <a
              className="v2-instagram-link"
              href={siteConfig.instagramUrl}
              aria-label="Viby באינסטגרם"
            >
              <Image
                className="v2-instagram-image"
                src="/insta_logo.png"
                alt=""
                width={72}
                height={72}
              />
              <span>Instagram</span>
            </a>
            <a href={siteConfig.linkedinUrl}>LinkedIn</a>
            <Link href="/terms">תנאי שימוש</Link>
            <Link href="/privacy">מדיניות פרטיות</Link>
            <PrivacyPreferencesButton />
          </div>
        </nav>
      </div>
    </footer>
  );
}
