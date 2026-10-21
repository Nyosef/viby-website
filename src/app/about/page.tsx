import Image from "next/image";
import Link from "next/link";
import { PrivacyPreferencesButton } from "@/components/PrivacyPreferencesButton";
import { ServiceIllustration } from "@/components/ServiceIllustration";
import { PhoneIcon } from "@/components/PhoneIcon";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "./about.module.css";

const aboutSeo = {
  path: "/about" as const,
  title: "אודות וייבי",
  description:
    "הכירו את וייבי (Viby), מערכת ישראלית שמנגישה טכנולוגיה מתקדמת לעסקים קטנים ובינוניים. כרטיסיות דיגיטליות, גלגל מזל, כרטיסי מתנה, NFC וקשרי לקוחות.",
};

export const metadata = createPageMetadata(aboutSeo);

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
const phoneUrl = `tel:+${siteConfig.whatsappNumber}`;

const solutions = [
  {
    href: "/",
    service: "punch-card",
    title: "כרטיסיות דיגיטליות",
    description: (
      <>הלקוחות מצטרפים בסריקה, צוברים ניקובים והטבות ושומרים את הכרטיסייה ב־<bdi dir="ltr">Apple Wallet</bdi> או ב־<bdi dir="ltr">Google Wallet</bdi>. כך קל להמשיך את הקשר גם אחרי הביקור.</>
    ),
  },
  {
    href: "/smart-wheel",
    service: "smart-wheel",
    title: "גלגל מזל חכם",
    description: "משחק פרסים דיגיטלי שמוסיף רגע של הפתעה אחרי הקנייה, עם הטבות שהעסק מגדיר וסיבה לחזור ולממש אותן.",
  },
  {
    href: "/digital-wallet",
    service: "wallet",
    title: "כרטיסי מתנה דיגיטליים",
    description: "כרטיסי מתנה ויתרות דיגיטליות שניתן לרכוש, לשמור בארנק שבטלפון ולממש בעסק.",
  },
  {
    href: "/viby-tap",
    service: "viby-tap",
    title: <bdi dir="ltr">Viby Tap</bdi>,
    description: <>שלט או מדבקה עם <bdi dir="ltr">NFC</bdi> ו־<bdi dir="ltr">QR</bdi> שפותחים עמוד אחד עם הקישורים החשובים של העסק: ביקורות, רשתות חברתיות, <bdi dir="ltr">WhatsApp</bdi>, ניווט ועוד.</>,
  },
  {
    href: "/viby-rate",
    service: "viby-rate",
    title: <bdi dir="ltr">Viby Rate</bdi>,
    description: <>פתרון <bdi dir="ltr">NFC</bdi> ו־<bdi dir="ltr">QR</bdi> שמקל על לקוחות להגיע לעמוד הביקורות של העסק ב־<bdi dir="ltr">Google</bdi> ולשתף את החוויה האמיתית שלהם.</>,
  },
  {
    href: "/viby-up",
    service: "viby-up",
    title: <bdi dir="ltr">Viby UP</bdi>,
    description: <>כלי לתקשורת עם לקוחות ב־<bdi dir="ltr">WhatsApp</bdi> בעזרת <bdi dir="ltr">AI</bdi>, בכפוף להרשאות המתאימות, שמסייע להקשיב למשוב, לזהות מצבים שדורשים תשומת לב ולהמשיך את השיחה אחרי הביקור.</>,
  },
] as const;

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.url}/about#webpage`,
    url: `${siteConfig.url}/about`,
    name: "אודות וייבי (Viby)",
    inLanguage: siteConfig.language,
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: { "@id": `${siteConfig.url}/#organization` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className={`${styles.header} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית">
          <Image src="/viby_transparent.png" alt="Viby" width={130} height={87} priority />
        </Link>
      </header>

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>אודות וייבי (<bdi dir="ltr">Viby</bdi>)</p>
          <h1 id="about-title">טכנולוגיה של הגדולים. בשביל כולם.</h1>
          <p className={styles.lead}>נעים להכיר, אנחנו וייבי (<bdi dir="ltr">Viby</bdi>). אנחנו עוזרים לעסקים קטנים ובינוניים בישראל ליהנות מטכנולוגיה מתקדמת לשימור לקוחות, לנאמנות ולחוויות שכיף לחזור אליהן — בדרך פשוטה, נגישה ועם אנשים אמיתיים שמלווים אתכם.</p>
          <p>אנחנו מאמינים שכל עסק, לא משנה מה הגודל שלו, צריך לקבל הזדמנות ליצור קשר טוב יותר עם הלקוחות שלו. בלי מערכות מסובכות ובלי להפוך את הטכנולוגיה לעוד משימה ברשימה.</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={whatsappUrl} data-analytics-location="hero">דברו איתנו ב־<bdi dir="ltr">WhatsApp</bdi></a>
            <a className={styles.secondaryAction} href="#solutions">הכירו את הפתרונות שלנו</a>
          </div>
        </div>
        <div className={styles.heroArtwork} aria-hidden="true">
          <div className={styles.artworkCard}><ServiceIllustration service="punch-card" /></div>
          <div className={styles.artworkCardSecondary}><ServiceIllustration service="smart-wheel" /></div>
          <div className={styles.artworkCardTertiary}><ServiceIllustration service="viby-tap" /></div>
          <div className={styles.artworkAccent} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell} ${styles.whatSection}`} aria-labelledby="what-title">
        <div className={styles.sectionHeading}><span className={styles.sectionNumber}>01</span><h2 id="what-title">מה זה וייבי?</h2></div>
        <div className={styles.prose}>
          <p>וייבי (<bdi dir="ltr">Viby</bdi>) היא מערכת ישראלית לעסקים שרוצים לשמור על קשר עם הלקוחות שלהם ולתת להם סיבה לחזור. אנחנו יוצרים כלים דיגיטליים לנאמנות לקוחות, כרטיסיות ניקוב, הטבות ומשחקי פרסים, כרטיסי מתנה, פתרונות <bdi dir="ltr">NFC</bdi> ו־<bdi dir="ltr">QR</bdi> וכלים חכמים לתקשורת עם לקוחות.</p>
          <p>הפתרונות שלנו מיועדים לעסקים קטנים ובינוניים ממגוון תחומים — מבתי קפה, מסעדות וחנויות ועד מספרות, קליניקות, סטודיואים ועסקי שירות. כל עסק בוחר את הכלים שמתאימים לו וללקוחות שלו.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.storySection}`} aria-labelledby="story-title">
        <div className={`${styles.shell} ${styles.storyGrid}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>02</span><h2 id="story-title">רצינו להביא לעסקים בישראל משהו אחר.</h2>
            <div className={styles.storyArtwork} aria-hidden="true">
              <div className={styles.storyArtworkWheel}><ServiceIllustration service="smart-wheel" /></div>
              <div className={styles.storyArtworkWallet}><ServiceIllustration service="wallet" /></div>
            </div>
          </div>
          <div className={styles.prose}>
            <p>הסיפור שלנו התחיל מתוך סקרנות ואהבה לטכנולוגיה. במהלך מסעות בעולם הכרנו חוויות ורעיונות שהפכו פעולות יומיומיות לפשוטות, חכמות ומהנות יותר. כשחזרנו לישראל, רצינו שגם העסקים המקומיים יוכלו ליהנות מהאפשרויות האלה.</p>
            <p>בסוף 2025 הקמנו את וייבי בהרצליה, עם מטרה אחת ברורה: להפוך טכנולוגיה מתקדמת לנגישה גם לעסקים שאין להם מחלקת טכנולוגיה או תקציב ענק. להוריד את המורכבות, להוסיף קצת יותר כיף ולהפוך כל מפגש עם לקוח להזדמנות לקשר מתמשך.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell}`} aria-labelledby="values-title">
        <div className={styles.sectionHeading}><span className={styles.sectionNumber}>03</span><h2 id="values-title">טכנולוגיה טובה צריכה לעבוד בשבילכם.</h2></div>
        <div className={styles.valueGrid}>
          <article><h3>מתקדמת, אבל פשוטה.</h3><p>אנחנו בונים חוויות דיגיטליות שקל ללקוחות להשתמש בהן ולעסקים לנהל אותן.</p></article>
          <article><h3>נגישה גם לעסקים קטנים.</h3><p>אנחנו שואפים להציע פתרונות במחיר ברור ונגיש, כדי שעסק לא יצטרך להיות רשת גדולה כדי להשתמש בטכנולוגיה איכותית. העלות והתנאים תלויים בשירות שבוחרים.</p></article>
          <article><h3>עם אנשים שאכפת להם.</h3><p>מבחינתנו השירות לא מסתיים בהקמה. אנחנו מלווים את העסק, עונים על שאלות ומסייעים גם בהמשך הדרך.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.solutionsSection}`} id="solutions" aria-labelledby="solutions-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span className={styles.sectionNumber}>04</span><h2 id="solutions-title">הפתרונות של וייבי</h2></div>
          <p className={styles.sectionIntro}>אין דרך אחת שמתאימה לכל עסק. לכן בנינו כמה כלים שונים, שכל אחד מהם פותר צורך אחר.</p>
          <p className={styles.sectionIntro}>מתלבטים בין הדרכים ליצור קשר חוזר עם לקוחות? <Link href="/customer-retention">המדריך לבחירת מועדון לקוחות דיגיטלי לעסק</Link> משווה בין כרטיסיות, פרסים וכרטיסי מתנה.</p>
          <div className={styles.solutionGrid}>
            {solutions.map((solution) => (
              <Link className={styles.solutionCard} href={solution.href} key={solution.href} data-about-solution>
                <span className={styles.solutionArt}><ServiceIllustration service={solution.service} /></span>
                <span className={styles.solutionBody}>
                  <h3>{solution.title}</h3>
                  <span>{solution.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell}`} aria-labelledby="process-title">
        <div className={styles.sectionHeading}><span className={styles.sectionNumber}>05</span><h2 id="process-title">אתם מתמקדים בעסק. אנחנו עוזרים בכל השאר.</h2></div>
        <div className={styles.stepGrid}>
          <article><h3>01 — מכירים את העסק.</h3><p>אנחנו מקשיבים לצרכים שלכם ובוחרים יחד את הפתרון המתאים.</p></article>
          <article><h3>02 — מקימים ומגדירים.</h3><p>הצוות שלנו מלווה את ההקמה וההתאמה לעסק, כדי שתוכלו להתחיל להשתמש בכלים בצורה ברורה ופשוטה.</p></article>
          <article><h3>03 — נשארים בקשר.</h3><p>גם אחרי ההפעלה אנחנו כאן לשאלות, לתמיכה טכנית ולסיוע בשינויים שצריך לעשות לאורך הדרך.</p></article>
        </div>
        <p className={styles.disclosure}>אופן ההקמה, הציוד הפיזי, המשלוח, תנאי המנוי ומאפייני השימוש תלויים בשירות ובהזמנה שאושרה. לפרטים המלאים אפשר לעיין ב<Link href="/terms">תנאי ההצטרפות</Link> או לדבר איתנו.</p>
      </section>

      <section className={`${styles.section} ${styles.peopleSection}`} aria-labelledby="people-title">
        <div className={`${styles.shell} ${styles.peopleGrid}`}>
          <div className={styles.sectionHeading}><span className={styles.sectionNumber}>06</span><h2 id="people-title">מאחורי הטכנולוגיה יש אנשים.</h2></div>
          <div className={styles.prose}>
            <p>מאחורי וייבי עומד צוות ישראלי של ארבעה אנשים, בהם שני מייסדים, עם ניסיון מקצועי בחברות טכנולוגיה מובילות כמו <bdi dir="ltr">Microsoft</bdi>, <bdi dir="ltr">Wix</bdi>, <bdi dir="ltr">Unity</bdi> ו־<bdi dir="ltr">Mastercard</bdi>. חלק מחברי הצוות גם משרתים במילואים. אנחנו מביאים לעסק קטן את הידע, הניסיון ותשומת הלב שהיינו רוצים לקבל בעצמנו.</p>
            <p>אנחנו פועלים מהרצליה ומלווים עסקים ברחבי ישראל — מרמת הגולן ועד אילת. מבחינתנו, גם אם הטכנולוגיה מתקדמת, השירות צריך להישאר נגיש, אישי ואנושי.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shell} ${styles.contactSection}`} aria-labelledby="contact-title">
        <div className={styles.sectionHeading}><span className={styles.sectionNumber}>07</span><h2 id="contact-title">יש עם מי לדבר.</h2></div>
        <div className={styles.prose}>
          <p>רוצים לשמוע איך זה יכול לעבוד בעסק שלכם? אנחנו זמינים לשיחה, לשאלות ולעזרה בבחירת פתרון מתאים. ואם אתם כבר משתמשים בוייבי — התמיכה שלנו כאן גם בשבילכם.</p>
          <p className={styles.companyFacts}>וייבי (<bdi dir="ltr">Viby</bdi>)<span aria-hidden="true"> | </span>הרצליה, ישראל<span aria-hidden="true"> | </span>שירות לעסקים ברחבי ישראל<span aria-hidden="true"> | </span>האתר הרשמי: <a href={siteConfig.url}><bdi dir="ltr">joinviby.co.il</bdi></a></p>
          <nav className={styles.contactLinks} aria-label="קישורי קשר ומידע">
            <a className={styles.callLink} href={phoneUrl} data-analytics-location="footer" aria-label={`התקשרו ל־Viby במספר ${siteConfig.whatsappDisplay}`}><PhoneIcon /><bdi dir="ltr">{siteConfig.whatsappDisplay}</bdi></a>
            <a href={whatsappUrl} data-analytics-location="footer"><bdi dir="ltr">WhatsApp</bdi></a>
            <Link href="/support">תמיכה</Link>
            <a href={siteConfig.instagramUrl}><bdi dir="ltr">Instagram</bdi></a>
            <Link href="/privacy">מדיניות פרטיות</Link>
            <Link href="/terms">תנאי שימוש</Link>
          </nav>
        </div>
      </section>

      <section className={`${styles.finalSection} ${styles.shell}`} aria-labelledby="final-title">
        <div>
          <h2 id="final-title">רוצים להכניס קצת יותר וייב לעסק?</h2>
          <p>בואו נספר לכם מה אפשר לעשות, נשמע מה חשוב לכם ונעזור לבחור את הכלים שמתאימים לעסק שלכם. בלי לסבך את הדברים — ועם אנשים שבאמת אכפת להם.</p>
          <div className={styles.finalActions}>
            <a className={styles.primaryAction} href={whatsappUrl} data-analytics-location="final_cta">דברו איתנו ב־<bdi dir="ltr">WhatsApp</bdi></a>
            <a className={styles.callAction} href={phoneUrl} data-analytics-location="final_cta" aria-label={`התקשרו ל־Viby במספר ${siteConfig.whatsappDisplay}`}><PhoneIcon /><bdi dir="ltr">{siteConfig.whatsappDisplay}</bdi></a>
          </div>
        </div>
      </section>

      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="וייבי — דף הבית"><Image src="/viby_transparent.png" alt="Viby" width={96} height={64} /></Link>
        <nav aria-label="ניווט תחתון">
          <Link href="/support">תמיכה</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <PrivacyPreferencesButton />
        </nav>
      </footer>
    </main>
  );
}
