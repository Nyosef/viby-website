import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { productSeoEntries } from "@/lib/seo";
import { upFaqs } from "@/lib/viby-up";
import { UpConversation } from "./UpConversation";
import { UpProductSelector } from "./UpProductSelector";
import { UpIcon } from "./UpIcon";

const contactUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח להכיר את Viby UP, לקבל הדגמה והצעת מחיר לעסק שלי.")}`;

function Contact({ location }: { location: "hero" | "final_cta" }) {
  return (
    <a className="up-cta" href={contactUrl} data-analytics-location={location}>
      בואו נכיר לכם את Viby UP <span aria-hidden="true">↗</span>
    </a>
  );
}

export function VibyUpLanding() {
  return (
    <main className="up-page">
      <section className="up-hero">
        <header className="up-header up-shell">
          <Link href="/" aria-label="Viby — דף הבית">
            <Image
              src="/viby-logo-white.png"
              alt="Viby"
              width={138}
              height={92}
              priority
            />
          </Link>
          <div>
            <UpProductSelector compact />
            <a className="up-login" href={siteConfig.businessEntranceUrl}>
              כניסת עסקים ↗
            </a>
          </div>
        </header>
        <div className="up-hero-grid up-shell">
          <div className="up-hero-copy">
            <span className="up-eyebrow">
              <UpIcon /> AI וקשרי לקוחות <span>הכירו את וייבי אפ</span>
            </span>
            <h1>
              <span dir="ltr">Viby UP</span> — הקשר האישי עם הלקוחות,{" "}
              <em>עכשיו חכם יותר.</em>
            </h1>
            <p>
              הלקוח ביקר בעסק? Viby UP יודעת לפנות אליו בזמן הנכון ב־WhatsApp,
              להבין איך הייתה החוויה שלו ולהמשיך את השיחה בהתאם — אוטומטית.
            </p>
            <p className="up-hero-secondary">
              וכשיש משהו שדורש יחס אישי, בעל העסק מקבל עדכון ויכול להיכנס
              לתמונה.
            </p>
            <Contact location="hero" />
            <small className="up-hero-note">
              אתם בוחרים למי ומתי: בעקבות ביקור או רכישה מתועדים, או בבחירה
              יזומה של לקוחות.
            </small>
          </div>
          <UpConversation />
        </div>
        <div className="up-journey up-shell" aria-label="מהביקור לקשר אישי">
          {[
            "ביקור בעסק",
            "WhatsApp",
            "הלקוח עונה",
            "AI מבין",
            "המשך מותאם",
            "העסק נכנס כשצריך",
          ].map((step, index) => (
            <span key={step}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              {step}
              {index < 5 ? <i aria-hidden="true">←</i> : null}
            </span>
          ))}
        </div>
      </section>
      <div className="up-switcher up-shell">
        <UpProductSelector />
      </div>
      <section className="up-section up-intro up-shell">
        <span className="up-kicker">הביקור נגמר. הסיפור ממשיך.</span>
        <h2>
          הלקוחות ממשיכים את היום.
          <br />
          <em>הקשר ממשיך איתם.</em>
        </h2>
        <p>
          אתם יודעים שהלקוח ביקר. אבל איך הוא הרגיש? מה היה מעולה, ומה יכול
          להיות טוב יותר? Viby UP פותחת מקום לשיחה אחרי הביקור — אישית, טבעית
          ובזמן שאתם בוחרים.
        </p>
        <span className="up-text-label">
          קשרי לקוחות ב־WhatsApp · מעקב אחרי חוויית לקוח
        </span>
      </section>
      <section className="up-section up-how">
        <div className="up-shell">
          <span className="up-kicker">פשוט לעסק. אישי ללקוח.</span>
          <h2>איך Viby UP עובדת?</h2>
          <div className="up-steps">
            {[
              [
                "אתם בוחרים מתי ולמי לפנות",
                "בעקבות ביקור או רכישה שתועדו, או בבחירה של לקוחות ומועד הפנייה.",
              ],
              [
                "Viby UP פותחת שיחה אישית ב־WhatsApp",
                "שאלה קטנה אחרי הביקור, בשפה חמה שמזמינה את הלקוח לשתף.",
              ],
              [
                "ה־AI מבין את התגובה וממשיך בהתאם",
                "כשמשהו דורש תשומת לב אישית, בעל העסק מקבל עדכון ויכול להיכנס לתמונה.",
              ],
            ].map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="up-section up-mission up-shell">
        <div className="up-mission-art" aria-hidden="true">
          <div>
            <UpIcon />
            <span dir="ltr">Viby UP</span>
            <small>פעילות + שיחה + קשר</small>
          </div>
          <span className="up-orbit-note">♡ מקשיבים יותר</span>
          <span className="up-orbit-note second">↗ ממשיכים את הקשר</span>
        </div>
        <div>
          <span className="up-kicker">עוד שכבה של קשר. אותה Viby.</span>
          <h2>
            לא רק לדעת מי חזר.
            <br />
            <em>להבין איך היה לו.</em>
          </h2>
          <p>
            Viby UP הופכת ביקור של לקוח להזדמנות להמשיך את הקשר. לשמוע איך היה,
            לזהות חוויה שדורשת תשומת לב ולתת ללקוחות להרגיש שהעסק באמת מקשיב —
            בלי שבעל העסק יצטרך לנהל כל שיחה בעצמו.
          </p>
          <p>
            לצד כלי הפעילות ושימור הלקוחות של Viby, וייבי אפ מוסיפה את השיחה
            שאחרי הביקור.
          </p>
          <div className="up-inline-links">
            <Link href="/">כרטיסייה דיגיטלית לעסק ←</Link>
            <Link href="/smart-wheel">גלגל מזל דיגיטלי לעסקים ←</Link>
          </div>
        </div>
      </section>
      <section className="up-section up-outcomes up-shell">
        <span className="up-kicker">AI לעסקים. עם מקום לאנשים.</span>
        <h2>כל תשובה היא התחלה של קשר.</h2>
        <div>
          <article>
            <span>☺</span>
            <h3>היה מעולה? ממשיכים בחיוך.</h3>
            <p>
              תגובה חמה ואישית נותנת ללקוח להרגיש שהמילים שלו הגיעו למקום הנכון.
            </p>
          </article>
          <article>
            <span>♡</span>
            <h3>משהו הפריע? נותנים לזה מקום.</h3>
            <p>
              Viby UP מבינה שיש צורך בתשומת לב ומעדכנת את בעל העסק, כדי שיוכל
              להמשיך את הטיפול באופן אישי.
            </p>
          </article>
        </div>
      </section>
      <section className="up-section up-faq up-shell">
        <span className="up-kicker">לפני שמתחילים</span>
        <h2>שאלות טובות. תשובות פשוטות.</h2>
        {upFaqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <section className="up-final">
        <div className="up-shell">
          <UpIcon />
          <span className="up-kicker">השיחה הבאה יכולה להתחיל כאן</span>
          <h2>
            פחות לרדוף.
            <br />
            <em>יותר להיות בקשר.</em>
          </h2>
          <p>
            Viby UP זמינה לעסק שלכם. נדגים את החוויה ונבדוק יחד התאמה ומחיר.
          </p>
          <Contact location="final_cta" />
        </div>
      </section>
      <footer className="up-footer up-shell">
        <div>
          <Link href="/" aria-label="Viby — דף הבית">
            <Image
              src="/viby_transparent.png"
              alt="Viby"
              width={100}
              height={67}
            />
          </Link>
          <p>© Viby · הקשר ממשיך.</p>
        </div>
        <nav aria-label="פתרונות Viby">
          {productSeoEntries.map((entry) => (
            <Link
              key={entry.path}
              href={entry.path}
              aria-current={entry.serviceId === "viby-up" ? "page" : undefined}
            >
              {entry.internalLinkLabel}
            </Link>
          ))}
        </nav>
        <nav aria-label="קישורים שימושיים">
          <Link href="/how-it-works">איך Viby עובדת</Link>
          <Link href="/support">תמיכה</Link>
          <Link href="/privacy">מדיניות פרטיות</Link>
          <Link href="/terms">תנאי שימוש</Link>
          <a href={siteConfig.businessEntranceUrl}>כניסת עסקים</a>
        </nav>
      </footer>
    </main>
  );
}
