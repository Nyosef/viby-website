import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { productSeoEntries } from "@/lib/seo";
import { upFaqs } from "@/lib/viby-up";
import { UpConversation } from "./UpConversation";
import { UpProductSelector } from "./UpProductSelector";
import { UpIcon } from "./UpIcon";

const contactUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("היי, אשמח להכיר את Viby UP, לקבל הדגמה והצעת מחיר לעסק שלי.")}`;

function ActionArrow() {
  return (
    <svg className="up-action-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Contact({ location }: { location: "hero" | "final_cta" }) {
  return (
    <a className="up-cta" href={contactUrl} data-analytics-location={location}>
      בואו נכיר לכם את Viby UP <ActionArrow />
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
          </div>
        </header>
        <div className="up-hero-grid up-shell">
          <div className="up-hero-copy">
            <h1>
              <span dir="ltr">Viby UP</span> — העסק שלכם,{" "}
              <em>בדרך למעלה.</em>
            </h1>
            <p>להפוך כל ביקור להזדמנות לצמוח.</p>
            <p>
              <span dir="ltr">Viby UP</span> פונה ללקוחות בזמן הנכון ב־<span className="up-brand-whatsapp" dir="ltr">WhatsApp</span>, אוספת פידבק, מגדילה
              ביקורות חיוביות ומחזקת את הדירוג והנוכחות של העסק ב־<span className="up-brand-google" dir="ltr">Google</span> וב־<span className="up-brand-ai" dir="rtl">חיפושי <bdi dir="ltr">AI</bdi></span>.
            </p>
            <p>יותר ביקורות. יותר אמון. יותר נראות. יותר צמיחה.</p>
          </div>
          <div className="up-demo-with-cta">
            <UpConversation />
            <Contact location="hero" />
          </div>
        </div>
      </section>
      <div className="up-switcher up-shell">
        <UpProductSelector />
      </div>
      <section className="up-section up-intro up-shell">
        <span className="up-kicker">הלקוחות שלכם הם חלק מהצמיחה שלכם.</span>
        <h2>
          עסק טוב ראוי
          <br />
          <em>שיכירו אותו.</em>
        </h2>
        <p>
          ממש עכשיו, אנשים לידכם מחפשים את העסק הבא שיבקרו בו.
          ביקורות אמיתיות ב־Google עוזרות להם להכיר אתכם ולסמוך עליכם עוד לפני
          שנכנסו בדלת — ויכולות לתמוך בדירוג המקומי שלכם בחיפוש וב־Google Maps.
        </p>
        <p>
          Viby UP הופכת את השיחה שאחרי הביקור להזדמנות לצמוח: להזמין ביקורת,
          להבין מה הלקוחות אוהבים ולגלות מה כדאי לשפר.
          החוויות שכבר יצרתם בעסק יכולות לעזור ללקוח הבא לבחור דווקא בכם.
        </p>
        <p>
          SEO הוא פשוט לעזור לאנשים למצוא אתכם כשהם מחפשים.
          היום החיפוש הזה קורה גם ב־Google וגם בחיפוש מבוסס AI.
          המטרה היא לא רק להופיע על המסך — אלא לבנות עסק מוכר ואמין
          שאנשים מהאזור רוצים להגיע אליו.
        </p>
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
        <h2>כל תשובה היא הזדמנות לקדם את העסק.</h2>
        <div>
          <article>
            <span>😊</span>
            <h3>מהחוויה האישית לביקורת ב־Google.</h3>
            <p>
              תודה אישית והזמנה נעימה לשתף ביקורת — כדי שעוד אנשים יוכלו
              להכיר את העסק דרך החוויות של הלקוחות שלו.
            </p>
          </article>
          <article>
            <span>💜</span>
            <h3>מהמשוב להזדמנות להשתפר.</h3>
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
          <span className="up-kicker">הצעד הבא של העסק שלכם</span>
          <h2>
            חוויה ששווה לשתף.
            <br />
            <em>עסק ששווה להכיר.</em>
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
        </nav>
      </footer>
    </main>
  );
}
