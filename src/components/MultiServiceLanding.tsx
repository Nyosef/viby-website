"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  serviceGroups,
  serviceIds,
  services,
  type DetailItem,
  type ServiceContent,
  type ServiceId,
} from "@/lib/services";
import {
  getProductPath,
  productSeoByService,
  productSeoEntries,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { useEffect, useMemo, useRef, useState } from "react";
import { PunchCardLeadSection } from "@/components/PunchCardLeadSection";

type MultiServiceLandingProps = {
  initialService: ServiceId;
};

const companyLine =
  "Viby עוזרת לעסקים להחזיר לקוחות, לבנות מאגר לקוחות ולשמור על קשר איתם — בלי אפליקציה.";

const businessCategories = [
  "בתי קפה",
  "מסעדות",
  "גלידריות",
  "שטיפות רכב",
  "חנויות",
  "משחקיות",
];

const rotatingRewards = [
  {
    id: "coffee",
    emoji: "☕",
    label: "קפה מתנה",
    progressText: "עוד 3 ביקורים לקפה מתנה",
  },
  {
    id: "car-wash",
    emoji: "🚙",
    label: "שטיפת רכב מתנה",
    progressText: "עוד 3 ביקורים לשטיפה מתנה",
  },
  {
    id: "croissant",
    emoji: "🥐",
    label: "קרואסון מתנה",
    progressText: "עוד 3 ביקורים לקרואסון מתנה",
  },
  {
    id: "nails",
    emoji: "💅",
    label: "טיפול ציפורניים מתנה",
    progressText: "עוד 3 ביקורים לטיפול מתנה",
  },
  {
    id: "pizza",
    emoji: "🍕",
    label: "פיצה מתנה",
    progressText: "עוד 3 ביקורים לפיצה מתנה",
  },
] as const;

const serviceHeaderIcons: Record<ServiceId, string> = {
  "punch-card": "🎟️",
  "smart-wheel": "🎡",
  wallet: "💳",
  "viby-rate": "⭐",
  "viby-tap": "📲",
};

const serviceHeaderDescriptions: Record<ServiceId, string> = {
  "punch-card": "כרטיסיית נאמנות דיגיטלית",
  "smart-wheel": "משחק שמחזיר לקוחות",
  wallet: "העסק בארנק של הלקוח",
  "viby-rate": "יותר ביקורות ב-Google",
  "viby-tap": "טאפ אחד לכל יעד",
};

const walletPromoContent: Record<
  ServiceId,
  {
    eyebrow: string;
    mobileEyebrow: string;
    title: string;
    mobileTitle: string;
    highlight: string;
    body: string;
    cta: string;
  }
> = {
  "punch-card": {
    eyebrow: "כרטיסיות דיגיטליות ב־Apple Wallet + Google Wallet",
    mobileEyebrow: "הכרטיסייה שלכם ב־Wallet",
    title: "הכרטיסייה הדיגיטלית שלכם",
    mobileTitle: "הכרטיסייה שלכם",
    highlight: "ישר ל־Wallet!",
    body: "כרטיסיית הניקובים של Viby נשמרת ב־Apple Wallet או Google Wallet. הלקוח רואה כמה ניקובים צבר ומה ההטבה הבאה — בלי אפליקציה.",
    cta: "ראו איך הכרטיסייה נשמרת",
  },
  "smart-wheel": {
    eyebrow: "הפרסים מהגלגל נשמרים ב־Wallet",
    mobileEyebrow: "הפרס מהגלגל ב־Wallet",
    title: "הפרס שהלקוח זכה בו",
    mobileTitle: "הפרס מהגלגל",
    highlight: "נשמר ב־Wallet!",
    body: "אחרי הסיבוב, הלקוח שומר את ההטבה שזכה בה בטלפון ורואה בדיוק מה קיבל ומתי כדאי לחזור לממש.",
    cta: "ראו איך שומרים את הפרס",
  },
  wallet: {
    eyebrow: "כרטיס המתנה ב־Apple Wallet + Google Wallet",
    mobileEyebrow: "כרטיס המתנה ב־Wallet",
    title: "כרטיס המתנה והיתרה שלכם",
    mobileTitle: "כרטיס המתנה שלכם",
    highlight: "תמיד מחכים ב־Wallet!",
    body: "הלקוח משלם 200 ₪, מקבל כרטיס בשווי 230 ₪ ושומר אותו בארנק שבטלפון עד לרגע המימוש.",
    cta: "ראו איך קונים ושומרים",
  },
  "viby-rate": {
    eyebrow: "VibyRate + הארנק הדיגיטלי",
    mobileEyebrow: "VibyRate ממשיך ב־Wallet",
    title: "אחרי שהלקוח מדרג",
    mobileTitle: "אחרי הדירוג",
    highlight: "העסק נשאר ב־Wallet!",
    body: "VibyRate מקל על הלקוח להשאיר ביקורת, וכרטיס העסק הדיגיטלי נותן לו דרך קבועה ונוחה לחזור אליכם.",
    cta: "הכירו את כרטיס העסק",
  },
  "viby-tap": {
    eyebrow: "VibyTap + Apple Wallet + Google Wallet",
    mobileEyebrow: "טאפ אחד ל־Wallet",
    title: "בטאפ אחד שומרים את העסק",
    mobileTitle: "טאפ אחד",
    highlight: "ישר ב־Wallet!",
    body: "VibyTap יכול להפנות את הלקוח לכרטיס העסק הדיגיטלי, כדי שהפרטים והקישור הנכון יישארו זמינים בטלפון.",
    cta: "ראו את כרטיס העסק",
  },
};

const starterHighlights: Record<ServiceId, string[]> = {
  "punch-card": [
    "כרטיסייה בעיצוב העסק",
    "נשמרת ב־Apple או Google Wallet",
    "עוזרת לבנות מאגר לקוחות",
  ],
  "smart-wheel": [
    "פרסים שהעסק בוחר",
    "משחק שנותן סיבה לחזור",
    "פעילות לקוחות במקום אחד",
  ],
  wallet: [
    "מכירת כרטיסי מתנה",
    "Apple Wallet ו־Google Wallet",
    "Apple Pay ו־Google Pay",
  ],
  "viby-rate": [
    "עובד באמצעות NFC או QR",
    "מוביל ישר לביקורות Google",
    "כרטיס ממותג לעסק",
  ],
  "viby-tap": [
    "כל הקישורים בעמוד אחד",
    "עובד באמצעות NFC או QR",
    "משנים קישורים גם אחרי ההדפסה",
  ],
};

const customerLogos: Array<{
  name: string;
  src?: string;
  alt: string;
  href?: string;
  style: string;
}> = [
  { name: "Eat i", alt: "Eat i", style: "eat-i" },
  { name: "OREN OR", alt: "OREN OR Hairdressing Spa", style: "oren-or" },
  { name: "נרדית", alt: "נרדית", style: "nardit" },
  { name: "Bbikini’s", alt: "Bbikini’s", style: "bbikinis" },
  { name: "קפה נוגה", alt: "קפה נוגה", style: "noga" },
  { name: "MAGIC WASH", alt: "Magic Wash", style: "magic-wash" },
  { name: "אימפריה אדם", alt: "שטיפת רכב אימפריה אדם", style: "imperia" },
  { name: "CAFETERIA", alt: "Cafeteria", style: "cafeteria" },
  { name: "אנבלה", alt: "אנבלה — עגלה בחורש", style: "anabella" },
];

function getWhatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon() {
  return (
    <span className="v2-whatsapp-icon" aria-hidden="true">
      ☎
    </span>
  );
}

function NfcHeroNote() {
  return (
    <aside className="v2-nfc-hero-note" aria-label="טכנולוגיית NFC של Viby">
      <span className="v2-nfc-hero-art" aria-hidden="true">
        <svg viewBox="0 0 120 96" role="presentation">
          <rect x="75" y="11" width="33" height="74" rx="9" />
          <path d="M85 21h13M86 74h11" />
          <path
            className="v2-nfc-wave v2-nfc-wave-one"
            d="M62 38c7 6 7 14 0 20"
          />
          <path
            className="v2-nfc-wave v2-nfc-wave-two"
            d="M49 28c16 12 16 28 0 40"
          />
          <path
            className="v2-nfc-wave v2-nfc-wave-three"
            d="M34 18c26 19 26 41 0 60"
          />
        </svg>
      </span>
      <strong>טכנולוגיית NFC מתקדמת ומהירה</strong>
    </aside>
  );
}

function ServiceVisualIcon({ id }: { id: ServiceId }) {
  if (id === "wallet") {
    return <span className="v2-wallet-glyph" aria-hidden="true" />;
  }

  return <>{serviceHeaderIcons[id]}</>;
}

function BenefitIllustration({ icon }: { icon: string }) {
  let artwork;

  switch (icon) {
    case "↩":
      artwork = (
        <>
          <path
            className="v2-benefit-line"
            pathLength="1"
            d="M96 30H50C31 30 20 42 20 58s12 27 31 27h24"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="m39 16-17 14 17 14"
          />
          <path
            className="v2-benefit-accent"
            d="m79 72 5 9 10 2-7 7 2 10-10-5-9 5 2-10-8-7 11-2Z"
          />
        </>
      );
      break;
    case "◎":
      artwork = (
        <>
          <ellipse
            className="v2-benefit-line"
            pathLength="1"
            cx="60"
            cy="25"
            rx="36"
            ry="14"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M24 25v22c0 8 16 14 36 14s36-6 36-14V25"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="M24 47v22c0 8 16 14 36 14s36-6 36-14V47"
          />
          <circle className="v2-benefit-accent" cx="43" cy="25" r="4" />
        </>
      );
      break;
    case "◫":
    case "📱":
      artwork = (
        <>
          <rect
            className="v2-benefit-line"
            pathLength="1"
            x="35"
            y="10"
            width="50"
            height="76"
            rx="12"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M51 21h18M53 73h14"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="m48 50 8 8 18-21"
          />
          <circle className="v2-benefit-accent" cx="83" cy="20" r="7" />
        </>
      );
      break;
    case "✦":
    case "★":
      artwork = (
        <>
          <path
            className="v2-benefit-line"
            pathLength="1"
            d="m60 10 8 25 24 9-24 9-8 27-8-27-24-9 24-9Z"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="m91 12 3 9 9 3-9 3-3 10-3-10-9-3 9-3ZM27 66l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"
          />
          <circle className="v2-benefit-accent" cx="60" cy="44" r="7" />
        </>
      );
      break;
    case "⚙":
      artwork = (
        <>
          <circle
            className="v2-benefit-line"
            pathLength="1"
            cx="60"
            cy="48"
            r="25"
          />
          <circle
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            cx="60"
            cy="48"
            r="10"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="M60 10v11M60 75v11M22 48h11M87 48h11M33 21l8 8M79 67l8 8M87 21l-8 8M41 67l-8 8"
          />
          <circle className="v2-benefit-accent" cx="60" cy="48" r="5" />
        </>
      );
      break;
    case "🎁":
      artwork = (
        <>
          <rect
            className="v2-benefit-line"
            pathLength="1"
            x="23"
            y="39"
            width="74"
            height="47"
            rx="7"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M17 39h86v17H17zM60 39v47"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="M59 38C47 36 38 29 40 22c2-8 15-5 20 16Zm2 0c12-2 21-9 19-16-2-8-15-5-20 16Z"
          />
          <circle className="v2-benefit-accent" cx="60" cy="48" r="5" />
        </>
      );
      break;
    case "₪":
      artwork = (
        <>
          <circle
            className="v2-benefit-line"
            pathLength="1"
            cx="60"
            cy="48"
            r="38"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M43 65V31c14 0 17 9 17 20v14M77 31v34c-14 0-17-9-17-20V31"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="M35 74h50"
          />
          <circle className="v2-benefit-accent" cx="91" cy="22" r="7" />
        </>
      );
      break;
    case "📲":
    case "N":
      artwork = (
        <>
          <rect
            className="v2-benefit-line"
            pathLength="1"
            x="22"
            y="14"
            width="43"
            height="72"
            rx="11"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M35 74h17M76 38c8 4 8 16 0 20M84 28c19 10 19 30 0 40"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="M93 18c29 16 29 44 0 60"
          />
          <circle className="v2-benefit-accent" cx="72" cy="48" r="5" />
        </>
      );
      break;
    case "💳":
      artwork = (
        <>
          <rect
            className="v2-benefit-line"
            pathLength="1"
            x="14"
            y="22"
            width="92"
            height="59"
            rx="12"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M14 39h92M29 58h28M29 68h17"
          />
          <rect
            className="v2-benefit-accent"
            x="76"
            y="53"
            width="16"
            height="12"
            rx="4"
          />
        </>
      );
      break;
    case "G":
      artwork = (
        <>
          <path
            className="v2-benefit-line"
            pathLength="1"
            d="M18 19h84v54H63L43 88V73H18Z"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="m60 29 5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z"
          />
          <circle className="v2-benefit-accent" cx="88" cy="29" r="5" />
        </>
      );
      break;
    case "🎨":
      artwork = (
        <>
          <path
            className="v2-benefit-line"
            pathLength="1"
            d="M60 12c-25 0-44 16-44 36s18 37 41 37c9 0 13-5 10-12-3-8 2-15 11-15h11c10 0 16-8 13-17C97 23 80 12 60 12Z"
          />
          <circle
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            cx="40"
            cy="38"
            r="5"
          />
          <circle
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            cx="59"
            cy="28"
            r="5"
          />
          <circle className="v2-benefit-accent" cx="78" cy="37" r="6" />
        </>
      );
      break;
    case "🔗":
      artwork = (
        <>
          <path
            className="v2-benefit-line"
            pathLength="1"
            d="m50 62-8 8c-9 9-23 9-32 0s-9-23 0-32l14-14c9-9 23-9 32 0 4 4 6 9 6 14"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="m70 34 8-8c9-9 23-9 32 0s9 23 0 32L96 72c-9 9-23 9-32 0-4-4-6-9-6-14"
          />
          <path
            className="v2-benefit-line v2-benefit-line-later"
            pathLength="1"
            d="m41 57 38-18"
          />
          <circle className="v2-benefit-accent" cx="60" cy="48" r="5" />
        </>
      );
      break;
    case "🏪":
      artwork = (
        <>
          <path
            className="v2-benefit-line"
            pathLength="1"
            d="M21 38h78v49H21ZM14 38l11-24h70l11 24"
          />
          <path
            className="v2-benefit-line v2-benefit-line-late"
            pathLength="1"
            d="M14 38c0 9 13 12 20 4 7 8 19 8 26 0 7 8 19 8 26 0 7 8 20 5 20-4M34 87V61h24v26M72 61h14"
          />
          <circle className="v2-benefit-accent" cx="79" cy="68" r="5" />
        </>
      );
      break;
    default:
      artwork = (
        <path
          className="v2-benefit-line"
          pathLength="1"
          d="m60 12 9 26 27 10-27 10-9 26-9-26-27-10 27-10Z"
        />
      );
  }

  return (
    <span className="v2-benefit-illustration" aria-hidden="true">
      <svg viewBox="0 0 120 96" role="presentation">
        {artwork}
      </svg>
    </span>
  );
}

export function MultiServiceLanding({
  initialService,
}: MultiServiceLandingProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<ServiceId>(initialService);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isHeaderSelectorOpen, setIsHeaderSelectorOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerSelectorRef = useRef<HTMLDivElement>(null);
  const headerTriggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef(new Map<ServiceId, HTMLButtonElement>());
  const announcementTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const service = services[activeId];
  const walletPromo = walletPromoContent[activeId];
  const priceHighlights = starterHighlights[activeId];
  const whatsappUrl = useMemo(
    () => getWhatsappUrl(service.cta.message),
    [service.cta.message],
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!selectorRef.current?.contains(event.target as Node)) {
        setIsSelectorOpen(false);
      }
      if (!headerSelectorRef.current?.contains(event.target as Node)) {
        setIsHeaderSelectorOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      if (announcementTimer.current) {
        clearTimeout(announcementTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) {
      return;
    }

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>(".v2-reveal"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("v2-reveal-enabled");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.13,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeId]);

  function focusOption(id: ServiceId) {
    window.requestAnimationFrame(() => optionRefs.current.get(id)?.focus());
  }

  function chooseService(nextId: ServiceId) {
    if (nextId === activeId) {
      setIsSelectorOpen(false);
      setIsHeaderSelectorOpen(false);
      return;
    }

    const heroIsVisible = (heroRef.current?.getBoundingClientRect().bottom ?? 0) > 80;
    setActiveId(nextId);
    setIsSelectorOpen(false);
    setIsHeaderSelectorOpen(false);

    router.push(getProductPath(nextId), { scroll: false });

    setAnnouncement(`עכשיו מציגים: ${services[nextId].label}`);
    if (announcementTimer.current) {
      clearTimeout(announcementTimer.current);
    }
    announcementTimer.current = setTimeout(() => setAnnouncement(""), 2600);

    if (!heroIsVisible) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.requestAnimationFrame(() => {
        heroRef.current?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }

  function handleWalletPromoClick() {
    if (activeId !== "wallet") {
      chooseService("wallet");
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function handleSelectorKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsSelectorOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (!isSelectorOpen) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsSelectorOpen(true);
        focusOption(activeId);
      }
      return;
    }

    const currentIndex = serviceIds.findIndex(
      (id) => optionRefs.current.get(id) === document.activeElement,
    );

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(serviceIds[(Math.max(currentIndex, -1) + 1) % serviceIds.length]);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        currentIndex <= 0 ? serviceIds.length - 1 : currentIndex - 1;
      focusOption(serviceIds[nextIndex]);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(serviceIds[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(serviceIds[serviceIds.length - 1]);
    }
  }

  function handleHeaderSelectorKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsHeaderSelectorOpen(false);
      headerTriggerRef.current?.focus();
    }
  }

  return (
    <main className={`landing-v2 service-${activeId}`} ref={mainRef}>
      <section className="v2-hero v2-grid-bg" ref={heroRef} id="top">
        <div className="v2-orb v2-orb-one" aria-hidden="true" />
        <div className="v2-orb v2-orb-two" aria-hidden="true" />
        <div className="v2-sparkles" aria-hidden="true">
          <i>★</i>
          <i>★</i>
          <i>★</i>
          <i>★</i>
        </div>

        <div className="v2-shell">
          <div className="v2-brand-row">
            <Link href="/" aria-label="Viby - דף הבית">
              <Image
                src="/viby-logo-white.png"
                alt="Viby"
                width={230}
                height={154}
                priority
              />
            </Link>
            <div className="v2-header-controls">
              <div
                className={`v2-header-service service-pill-${activeId}`}
                ref={headerSelectorRef}
                onKeyDown={handleHeaderSelectorKeyDown}
              >
                <button
                  type="button"
                  className="v2-header-service-trigger"
                  ref={headerTriggerRef}
                  aria-haspopup="listbox"
                  aria-expanded={isHeaderSelectorOpen}
                  onClick={() =>
                    setIsHeaderSelectorOpen((current) => !current)
                  }
                >
                  <span className="v2-header-service-kicker">
                    מציגים עכשיו
                  </span>
                  <span className="v2-header-service-field">
                    <i aria-hidden="true">
                      <ServiceVisualIcon id={activeId} />
                    </i>
                    <span>
                      <strong>{service.shortLabel}</strong>
                      <small>לחצו כדי להחליף שירות</small>
                    </span>
                    <b aria-hidden="true">
                      {isHeaderSelectorOpen ? "⌃" : "⌄"}
                    </b>
                  </span>
                </button>

                {isHeaderSelectorOpen ? (
                  <div
                    className="v2-header-service-menu"
                    role="listbox"
                    aria-label="בחירת השירות המוצג"
                  >
                    {serviceGroups.map((group) => (
                      <div className="v2-header-service-group" key={group.id}>
                        <p>
                          <span aria-hidden="true">{group.emoji}</span>
                          {group.label}
                        </p>
                        {serviceIds
                          .filter((id) => services[id].group === group.id)
                          .map((id) => (
                            <button
                              type="button"
                              role="option"
                              aria-selected={id === activeId}
                              className={id === activeId ? "is-active" : ""}
                              onClick={() => chooseService(id)}
                              key={id}
                            >
                              <i aria-hidden="true">
                                <ServiceVisualIcon id={id} />
                              </i>
                              <span>
                                <strong>{services[id].shortLabel}</strong>
                                <small>{serviceHeaderDescriptions[id]}</small>
                              </span>
                              <b aria-hidden="true">
                                {id === activeId ? "✓" : "←"}
                              </b>
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <a
                className="v2-business-link"
                href={siteConfig.businessEntranceUrl}
              >
                כניסת עסקים
              </a>
            </div>
          </div>

          <div className="v2-hero-grid">
            <div className="v2-hero-copy" key={`copy-${activeId}`}>
              <p className="v2-company-line">{companyLine}</p>
              <span className="v2-badge">{service.badge}</span>
              <h1>{service.hero.title}</h1>
              <p className="v2-hero-text">{service.hero.text}</p>
              <div className="v2-actions">
                <a
                  className="v2-button v2-button-whatsapp"
                  href={whatsappUrl}
                  data-analytics-location="hero"
                >
                  <WhatsAppIcon />
                  <span>
                    {service.cta.buttonLabel ?? "דברו איתנו ב־WhatsApp"}
                  </span>
                </a>
                <a className="v2-button v2-button-ghost" href="#how-it-works">
                  איך זה עובד
                </a>
              </div>
            </div>

            <div className="v2-hero-art" key={`art-${activeId}`}>
              <HeroProductVisual service={service} />
              <NfcHeroNote />
            </div>
          </div>
        </div>
      </section>

      <div className="v2-story">
        <div
          className="v2-selector-wrap"
          ref={selectorRef}
          onKeyDown={handleSelectorKeyDown}
        >
          <div className="v2-service-selector">
            <span className="v2-selector-kicker">בחרו פתרון</span>
            <button
              type="button"
              className="v2-selector-trigger"
              ref={triggerRef}
              aria-haspopup="listbox"
              aria-expanded={isSelectorOpen}
              onClick={() => {
                setIsSelectorOpen((current) => !current);
                if (!isSelectorOpen) {
                  focusOption(activeId);
                }
              }}
            >
              <span className="v2-selector-current-icon" aria-hidden="true">
                <ServiceVisualIcon id={activeId} />
              </span>
              <span className="v2-selector-current-copy">
                <strong>{service.label}</strong>
                <small>{serviceHeaderDescriptions[activeId]}</small>
              </span>
              <i aria-hidden="true">{isSelectorOpen ? "−" : "+"}</i>
            </button>

            {isSelectorOpen ? (
              <div
                className="v2-selector-menu"
                role="listbox"
                aria-label="בחירת שירות Viby"
              >
                {serviceGroups.map((group) => (
                  <div className="v2-selector-group" key={group.id}>
                    <p>
                      <span aria-hidden="true">{group.emoji}</span>
                      {group.label}
                    </p>
                    {serviceIds
                      .filter((id) => services[id].group === group.id)
                      .map((id) => (
                        <button
                          type="button"
                          role="option"
                          aria-selected={id === activeId}
                          key={id}
                          ref={(node) => {
                            if (node) optionRefs.current.set(id, node);
                          }}
                          onClick={() => chooseService(id)}
                        >
                          <i
                            className="v2-selector-option-icon"
                            aria-hidden="true"
                          >
                            <ServiceVisualIcon id={id} />
                          </i>
                          <span className="v2-selector-option-copy">
                            <strong>{services[id].label}</strong>
                            <small>{serviceHeaderDescriptions[id]}</small>
                          </span>
                          <b aria-hidden="true">
                            {id === activeId ? "✓" : "←"}
                          </b>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="v2-live-region" aria-live="polite" aria-atomic="true">
          {announcement ? <span>{announcement}</span> : null}
        </div>

        <TrustStrip />

        <section
          className="v2-wallet-promo v2-grid-bg"
          aria-labelledby="wallet-promo-title"
        >
          <div
            className="v2-shell v2-wallet-promo-inner v2-reveal"
            key={`wallet-promo-${activeId}`}
          >
            <div className="v2-wallet-promo-copy">
              <span className="v2-wallet-promo-eyebrow">
                <b aria-hidden="true">💳</b>
                <span className="v2-wallet-eyebrow-desktop">
                  {walletPromo.eyebrow}
                </span>
                <span className="v2-wallet-eyebrow-mobile">
                  {walletPromo.mobileEyebrow}
                </span>
              </span>
              <h2 id="wallet-promo-title">
                <span className="v2-wallet-title-desktop">
                  {walletPromo.title}
                  <strong>{walletPromo.highlight}</strong>
                </span>
                <span className="v2-wallet-title-mobile">
                  {walletPromo.mobileTitle}
                  <strong>{walletPromo.highlight}</strong>
                </span>
              </h2>
              <p>{walletPromo.body}</p>
              <button
                type="button"
                className="v2-wallet-promo-button"
                onClick={handleWalletPromoClick}
              >
                <span aria-hidden="true">💳</span>
                {walletPromo.cta}
                <b aria-hidden="true">←</b>
              </button>
            </div>

            <div className="v2-wallet-promo-media">
              <Image
                src="/apple-wallet-google-wallet.jpg"
                alt="הוספת כרטיס העסק ל-Apple Wallet ול-Google Wallet"
                width={1828}
                height={1028}
                sizes="(max-width: 760px) 88vw, 620px"
              />
            </div>
          </div>
        </section>

        <section className="v2-section v2-how" id="how-it-works">
          <div className="v2-shell">
            <div className="v2-how-intro v2-reveal">
              <div className="v2-how-portrait">
                <Image
                  src="/bar_viby.jpg"
                  alt="לקוחה משתמשת ב-Viby בעסק"
                  width={320}
                  height={320}
                  sizes="(max-width: 760px) 190px, 280px"
                />
              </div>
              <span>איך זה עובד</span>
              <h2>שלושה צעדים. זה כל הסיפור.</h2>
              <p key={`how-copy-${activeId}`}>
                כך משתמשים ב־{service.label} של Viby — פשוט ללקוח, ברור
                לעסק, ובלי אפליקציה.
              </p>
            </div>
            <div
              className="v2-step-grid v2-reveal v2-reveal-children"
              key={`steps-${activeId}`}
            >
              {service.howItWorks.map((step, index) => (
                <article key={step.title}>
                  <div className="v2-step-visual" aria-hidden="true">
                    <b>{step.icon ?? "✦"}</b>
                    <span>{index + 1}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-demo v2-grid-bg" aria-label={service.media.title}>
          <div className="v2-shell">
            <SectionHeading
              light
              eyebrow={service.media.eyebrow}
              title={service.media.title}
              text={service.media.text}
            />
            <div className="v2-phone v2-reveal">
              <div className="v2-phone-speaker" aria-hidden="true" />
              <ServiceDemo service={service} />
            </div>
          </div>
        </section>

        <section className="v2-section v2-benefits" id="benefits">
          <div className="v2-shell">
            <SectionHeading
              eyebrow="למה זה עובד לעסק"
              title={`הערך מאחורי ${service.label}`}
              text={
                service.group === "retention"
                  ? "לא רק חוויה ללקוח — גם מאגר מסודר, פעילות שאפשר להבין וקשר שאפשר להמשיך."
                  : "פעולה קצרה וברורה שמורידה חיכוך ומחברת את המקום הפיזי לחוויה הדיגיטלית."
              }
            />
            <div
              className="v2-benefit-grid v2-reveal v2-reveal-children"
              key={`benefits-${activeId}`}
            >
              {service.benefits.map((benefit) => (
                <article key={benefit.title}>
                  <BenefitIllustration icon={benefit.icon} />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="v2-price-strip"
          aria-label={`מחיר התחלתי עבור ${service.label}`}
        >
          <div className="v2-shell v2-price-strip-inner v2-reveal">
            <div className="v2-price-product">
              <i aria-hidden="true">
                <ServiceVisualIcon id={activeId} />
              </i>
              <span>
                <small>מתחילים קטן עם</small>
                <strong>{service.label}</strong>
              </span>
            </div>

            <div className="v2-price-amount">
              <span>החל מ־</span>
              <strong>{activeId === "punch-card" ? "69" : "49"}</strong>
              <span>₪ לחודש</span>
              <small>לכל כלי בנפרד</small>
            </div>

            <div className="v2-price-highlights">
              {priceHighlights.map((highlight) => (
                <span key={highlight}>
                  <b aria-hidden="true">✓</b>
                  {highlight}
                </span>
              ))}
            </div>

            <a
              className="v2-price-action"
              href={whatsappUrl}
              data-analytics-location="price_strip"
              aria-label={`קבלת פרטים על ${service.label} החל מ־${
                activeId === "punch-card" ? "69" : "49"
              } שקלים לחודש`}
            >
              <WhatsAppIcon />
              <span>
                {service.cta.buttonLabel ?? "אני רוצה להתחיל"}
              </span>
            </a>
          </div>
        </section>

        <ServiceDetail service={service} />

        <BuyingGuideSection service={service} />

        <RelatedSolutions activeId={activeId} />
      </div>

      <section className="v2-final-cta v2-grid-bg" id="contact">
        <div className="v2-shell v2-reveal">
          <span className="v2-badge">אפשר להתחיל בפשטות</span>
          <h2>{service.cta.finalTitle}</h2>
          <p>{service.cta.finalText}</p>
          <div className="v2-actions">
            <a
              className="v2-button v2-button-whatsapp"
              href={whatsappUrl}
              data-analytics-location="final_cta"
            >
              <WhatsAppIcon />
              <span>
                {service.cta.buttonLabel ?? "דברו איתנו ב־WhatsApp"}
              </span>
            </a>
            <a
              className="v2-button v2-button-ghost"
              href={`tel:+${siteConfig.whatsappNumber}`}
              data-analytics-location="final_cta"
            >
              {siteConfig.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>

      {activeId === "punch-card" ? <PunchCardLeadSection /> : null}

      <footer className="v2-footer">
        <div className="v2-shell">
          <div className="v2-footer-brand">
            <Image
              src="/viby_transparent.png"
              alt="Viby"
              width={140}
              height={94}
            />
            <p>© {new Date().getFullYear()} Viby. כל הזכויות שמורות.</p>
          </div>

          <nav className="v2-footer-group" aria-label="פתרונות Viby">
            <strong>פתרונות Viby</strong>
            <div>
              {productSeoEntries.map((entry) => (
                <Link
                  href={entry.path}
                  aria-current={entry.serviceId === activeId ? "page" : undefined}
                  key={entry.serviceId}
                >
                  {entry.internalLinkLabel}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="v2-footer-group" aria-label="קישורים שימושיים">
            <strong>קישורים שימושיים</strong>
            <div>
              <Link href="/how-it-works">איך Viby עובדת</Link>
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
              <Link href="/terms">תנאי שימוש</Link>
              <Link href="/privacy">מדיניות פרטיות</Link>
              <a href={siteConfig.businessEntranceUrl}>כניסת עסקים</a>
            </div>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function RelatedSolutions({ activeId }: { activeId: ServiceId }) {
  const relatedProducts = productSeoEntries.filter(
    (entry) => entry.serviceId !== activeId,
  );

  return (
    <section className="v2-section v2-related-solutions">
      <div className="v2-shell">
        <SectionHeading
          eyebrow="כל הפתרונות של Viby"
          title="פתרונות נוספים לעסק"
          text="הכירו כלים נוספים של Viby לשימור לקוחות, ביקורות וחיבור העסק לטלפון."
        />
        <nav
          className="v2-related-grid v2-reveal v2-reveal-children"
          aria-label="פתרונות נוספים של Viby"
        >
          {relatedProducts.map((entry) => (
            <Link
              className={`v2-related-card related-${entry.serviceId}`}
              href={entry.path}
              key={entry.serviceId}
            >
              <i aria-hidden="true">
                <ServiceVisualIcon id={entry.serviceId} />
              </i>
              <span>
                <strong>{entry.internalLinkLabel}</strong>
                <small>{serviceHeaderDescriptions[entry.serviceId]}</small>
              </span>
              <b aria-hidden="true">←</b>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

const mixedDirectionPattern =
  /(Google Business Profile|Google Reviews|Google Wallet|Apple Wallet|Google Pay|Apple Pay|Instagram|WhatsApp|Facebook|TikTok|VibyRate|VibyTap|Wallet|Viby|Waze|NFC|QR|\d+ ₪)/g;
const mixedDirectionTokenPattern =
  /^(Google Business Profile|Google Reviews|Google Wallet|Apple Wallet|Google Pay|Apple Pay|Instagram|WhatsApp|Facebook|TikTok|VibyRate|VibyTap|Wallet|Viby|Waze|NFC|QR|\d+ ₪)$/;

function MixedDirectionText({ text }: { text: string }) {
  return text.split(mixedDirectionPattern).map((part, index) =>
    mixedDirectionTokenPattern.test(part) ? (
      <bdi dir="ltr" key={`${part}-${index}`}>
        {part}
      </bdi>
    ) : (
      part
    ),
  );
}

function BuyingGuideSection({ service }: { service: ServiceContent }) {
  const guide = service.buyingGuide;
  const seo = productSeoByService[service.id];
  const sectionId = `buying-guide-${service.id}`;
  const faqId = `buying-faq-${service.id}`;
  const roleIcons = { customer: "📲", staff: "✓", owner: "⚙" } as const;

  return (
    <section
      className={`v2-section v2-buying-guide service-${service.id}`}
      aria-labelledby={sectionId}
    >
      <div className="v2-shell">
        <div className="v2-buying-intro v2-reveal">
          <span>לפני שמתחילים</span>
          <h2 id={sectionId}>כל מה שחשוב לדעת על {service.label}</h2>
          <h3>{guide.definition.title}</h3>
          <p>
            <MixedDirectionText text={guide.definition.text} />
          </p>
          <div className="v2-best-for">
            <strong>מתאים במיוחד ל־</strong>
            <ul>
              {guide.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="v2-buying-block" aria-labelledby={`${sectionId}-included`}>
          <h3 id={`${sectionId}-included`}>מה העסק מקבל</h3>
          <div className="v2-buying-card-grid v2-reveal v2-reveal-children">
            {guide.included.map((item) => (
              <article key={item.title}>
                <span aria-hidden="true">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>
                  <MixedDirectionText text={item.text} />
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-buying-block" aria-labelledby={`${sectionId}-operations`}>
          <h3 id={`${sectionId}-operations`}>כך עובדים עם המוצר ביום־יום</h3>
          <div className="v2-buying-role-grid v2-reveal v2-reveal-children">
            {guide.operations.map((operation) => (
              <article className={`role-${operation.role}`} key={operation.role}>
                <span aria-hidden="true">{roleIcons[operation.role]}</span>
                <h4>{operation.title}</h4>
                <p>
                  <MixedDirectionText text={operation.text} />
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-buying-block" aria-labelledby={`${sectionId}-facts`}>
          <h3 id={`${sectionId}-facts`}>מחיר, התאמה והקמה</h3>
          <dl className="v2-buying-facts v2-reveal">
            {guide.purchaseFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  <MixedDirectionText text={fact.value} />{" "}
                  {fact.link ? <Link href={fact.link.href}>{fact.link.label}</Link> : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="v2-buying-block" aria-labelledby={`${sectionId}-comparison`}>
          <h3 id={`${sectionId}-comparison`}>מה ההבדל מהפתרון הרגיל</h3>
          <div className="v2-buying-comparison v2-reveal">
            <article>
              <span>החלופה הפשוטה</span>
              <p>
                <MixedDirectionText text={guide.comparison.alternative} />
              </p>
            </article>
            <article>
              <span>הפתרון של Viby</span>
              <p>
                <MixedDirectionText text={guide.comparison.vibyDifference} />
              </p>
            </article>
          </div>
        </section>

        <section className="v2-buying-faq" aria-labelledby={faqId}>
          <div className="v2-buying-faq-heading v2-reveal">
            <span>שאלות לפני שמצטרפים</span>
            <h2 id={faqId}>שאלות נפוצות על {seo.primaryIntent}</h2>
          </div>
          <div className="v2-buying-faq-list v2-reveal">
            {guide.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>
                  <MixedDirectionText text={faq.answer} />{" "}
                  {faq.link ? <Link href={faq.link.href}>{faq.link.label}</Link> : null}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  light?: boolean;
}) {
  return (
    <div
      className={`v2-section-heading v2-reveal ${light ? "is-light" : ""}`}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function TrustStrip() {
  if (customerLogos.length > 0) {
    return (
      <section className="v2-trust v2-reveal" aria-label="לקוחות Viby">
        <div className="v2-trust-heading v2-shell">
          <span>עסקים שכבר בחרו Viby</span>
          <h2>הלקוחות שלנו</h2>
        </div>
        <div className="v2-logo-viewport">
          <div className="v2-logo-track">
            {[...customerLogos, ...customerLogos].map((logo, index) => {
              const content = logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={90}
                  unoptimized
                />
              ) : (
                <strong
                  className={`v2-customer-wordmark ${logo.style}`}
                  aria-label={logo.alt}
                >
                  {logo.name}
                </strong>
              );
              return logo.href ? (
                <a href={logo.href} key={`${logo.alt}-${index}`}>
                  {content}
                </a>
              ) : (
                <span key={`${logo.alt}-${index}`}>{content}</span>
              );
            })}
          </div>
        </div>
        <p className="v2-trust-note">
          עסקים מקומיים מתחומים שונים משתמשים ב־Viby כדי לגרום ללקוחות לחזור.
        </p>
      </section>
    );
  }

  return (
    <section
      className="v2-category-strip v2-reveal"
      aria-label="עסקים מתאימים"
    >
      <div className="v2-shell">
        <strong>מתאים לעסקים מכל הסוגים</strong>
        <div>
          {businessCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroProductVisual({ service }: { service: ServiceContent }) {
  switch (service.layout.heroVisual) {
    case "smart-wheel":
      return (
        <div className="v2-product-scene wheel-scene" aria-label="המחשת גלגל חכם">
          <div className="v2-wheel">
            <i />
            <strong>סובבו</strong>
          </div>
          <div className="v2-floating-card wheel-prize">
            <span>הפרס שלך</span>
            <strong>קפה מתנה בביקור הבא</strong>
          </div>
        </div>
      );
    case "wallet":
      return (
        <div className="v2-product-scene wallet-scene" aria-label="המחשת ארנק דיגיטלי">
          <div className="v2-real-wallet">
            <div className="v2-real-wallet-card">
              <span>כרטיס מתנה</span>
              <strong>230 ₪</strong>
              <small>שילמתם 200 ₪</small>
            </div>
            <div className="v2-real-wallet-pocket">
              <Image src="/viby_transparent.png" alt="" width={84} height={56} />
              <span>הארנק של Viby</span>
              <i aria-hidden="true" />
            </div>
          </div>
          <div className="v2-wallet-platforms">
            <span> Apple Wallet</span>
            <span>Google Wallet</span>
          </div>
        </div>
      );
    case "viby-rate":
      return (
        <div className="v2-product-scene rate-scene" aria-label="המחשת VibyRate">
          <div className="v2-nfc-card">
            <span className="v2-stars">★★★★★</span>
            <strong>Tap אחד</strong>
            <b>ושימו דירוג!</b>
            <i aria-hidden="true">G</i>
            <small>VibyRate</small>
          </div>
          <div className="v2-rating-card">
            <strong>4.9</strong>
            <span>דירוג ממוצע</span>
            <i aria-hidden="true">★</i>
          </div>
        </div>
      );
    case "viby-tap":
      return (
        <div className="v2-product-scene tap-scene" aria-label="המחשת VibyTap">
          <div className="v2-tap-card">
            <span>NFC</span>
            <strong>VibyTap</strong>
            <small>פשוט מצמידים</small>
          </div>
          <div className="v2-destination-cloud">
            <span>⭐ ביקורות</span>
            <span>📷 Instagram</span>
            <span>👍 Facebook</span>
            <span>🎵 TikTok</span>
            <span>🌐 אתר</span>
            <span>💬 WhatsApp</span>
            <span>📍 Waze</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="v2-product-scene punch-scene" aria-label="המחשת כרטיסייה דיגיטלית">
          <RotatingPunchReward />
        </div>
      );
  }
}

function RotatingPunchReward() {
  const [rewardIndex, setRewardIndex] = useState(0);
  const reward = rotatingRewards[rewardIndex];

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setRewardIndex((current) => (current + 1) % rotatingRewards.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`v2-reward-showpiece reward-${reward.id}`}
        key={`showpiece-${reward.id}`}
        aria-label={reward.label}
      >
        <span aria-hidden="true">{reward.emoji}</span>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </div>

      <div className="v2-punch-pass pass-one">
        <span>הכרטיסייה שלי</span>
        <strong>7 מתוך 10</strong>
        <div aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <i className={index < 7 ? "filled" : ""} key={index} />
          ))}
        </div>
      </div>

      <div
        className="v2-punch-pass pass-two v2-changing-reward"
        key={`pass-${reward.id}`}
      >
        <div className="v2-mini-reward-icon" aria-hidden="true">
          {reward.emoji}
        </div>
        <strong>{reward.progressText}</strong>
      </div>

      <div
        className="v2-floating-card punch-reward v2-changing-reward"
        key={`label-${reward.id}`}
      >
        <span>ההטבה הבאה</span>
        <strong>{reward.label}</strong>
      </div>
    </>
  );
}

function ServiceDemo({ service }: { service: ServiceContent }) {
  if (service.media.videoUrl) {
    return (
      <iframe
        src={service.media.videoUrl}
        title="סרטון הסבר על הכרטיסיות הדיגיטליות של Viby"
        allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  if (service.id === "smart-wheel") {
    return (
      <div className="v2-demo-screen demo-wheel">
        <Image src="/viby_transparent.png" alt="" width={90} height={60} />
        <p>הפרס הבא שלכם מחכה</p>
        <div className="v2-wheel">
          <i />
          <strong>סובבו</strong>
        </div>
        <span className="v2-demo-action">לסובב את הגלגל</span>
      </div>
    );
  }

  if (service.id === "wallet") {
    return (
      <div className="v2-demo-screen demo-wallet">
        <div className="v2-phone-status"><span>9:41</span><span>Wallet</span></div>
        <div className="v2-gift-card-purchase">
          <span className="v2-gift-kicker">כרטיס מתנה לעסק</span>
          <h3>קונים יותר. מקבלים יותר.</h3>
          <div className="v2-gift-value-flow">
            <div>
              <small>משלמים</small>
              <strong>200 ₪</strong>
            </div>
            <b aria-hidden="true">←</b>
            <div className="is-bonus">
              <small>מקבלים</small>
              <strong>230 ₪</strong>
            </div>
          </div>
          <span className="v2-gift-buy-button">קניית כרטיס מתנה</span>
        </div>
        <div className="v2-wallet-pay-options" aria-label="אפשרויות תשלום ושמירה">
          <span> Pay</span>
          <span>G Pay</span>
        </div>
        <div className="v2-wallet-save-note">
          <strong>אחרי הקנייה שומרים בטלפון</strong>
          <span>Apple Wallet או Google Wallet</span>
        </div>
      </div>
    );
  }

  if (service.id === "viby-rate") {
    return (
      <div className="v2-demo-screen demo-rate">
        <span className="v2-tap-rings" aria-hidden="true">)))</span>
        <div className="v2-mini-nfc">
          <strong>VibyRate</strong>
          <span>Tap</span>
        </div>
        <p>איך הייתה החוויה שלכם?</p>
        <div className="v2-review-stars" aria-label="חמישה כוכבים">★★★★★</div>
        <span className="v2-demo-action">כתיבת ביקורת ב-Google</span>
      </div>
    );
  }

  return (
    <div className="v2-demo-screen demo-tap">
      <div className="v2-tap-business-cover">
        <span className="v2-tap-open">פתוח עכשיו</span>
        <div className="v2-tap-cover-art" aria-hidden="true">
          <i>☕</i>
          <i>🥐</i>
        </div>
      </div>
      <div className="v2-tap-business-profile">
        <div className="v2-tap-business-avatar" aria-hidden="true">נ</div>
        <span>VibyTap של</span>
        <h3>קפה נוגה</h3>
        <p>קפה טוב • מאפים טריים • אווירה שכונתית</p>
      </div>
      <div className="v2-tap-quick-actions">
        <span><b aria-hidden="true">💬</b> דברו איתנו</span>
        <span><b aria-hidden="true">📍</b> נווטו אלינו</span>
      </div>
      <div className="v2-tap-customer-links">
        {[
          ["⭐", "כתבו לנו ביקורת", "Google"],
          ["📷", "עקבו אחרינו", "Instagram"],
          ["🌐", "בקרו באתר שלנו", "אתר העסק"],
          ["👍", "הצטרפו לקהילה", "Facebook"],
          ["🎵", "צפו בסרטונים", "TikTok"],
        ].map(([icon, label, destination]) => (
          <span key={destination}>
            <i aria-hidden="true">{icon}</i>
            <b>{label}</b>
            <small>{destination}</small>
            <em aria-hidden="true">←</em>
          </span>
        ))}
      </div>
      <small className="v2-tap-powered">מופעל באמצעות VibyTap</small>
    </div>
  );
}

function DetailGrid({
  items,
  className = "",
}: {
  items: readonly DetailItem[];
  className?: string;
}) {
  return (
    <div
      className={`v2-detail-grid v2-reveal v2-reveal-children ${className}`}
    >
      {items.map((item) => (
        <article key={item.title}>
          <span aria-hidden="true">{item.icon}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function ServiceDetail({ service }: { service: ServiceContent }) {
  let title = "";
  let text = "";
  let items: DetailItem[] = [];

  if (service.customerJourney) {
    title = "מהכרטיסייה למערכת יחסים עם הלקוח";
    text = "כל ניקוב מספר לעסק משהו ועוזר להפוך ביקורים חוזרים לקשר מסודר.";
    items = service.customerJourney.map((item, index) => ({
      ...item,
      icon: String(index + 1),
    }));
  } else if (service.rewards) {
    title = service.rewards.title;
    text = service.rewards.text;
    items = service.rewards.items;
  } else if (service.walletCapabilities) {
    title = "ככה פשוט קונים ושומרים";
    text = "ארבעה צעדים ברורים — מבחירת כרטיס המתנה ועד שהוא מחכה ללקוח בתוך הארנק בטלפון.";
    items = service.walletCapabilities;
  } else if (service.physicalProduct) {
    title = service.physicalProduct.title;
    text = service.physicalProduct.text;
    items = service.physicalProduct.items;
  } else if (service.destinations) {
    title = "כל הקישורים שהלקוח צריך";
    text = "הלקוח רואה עמוד אחד פשוט ובוחר לאן להמשיך. בלי לחפש את העסק ובלי להקליד כתובות.";
    items = service.destinations;
  }

  return (
    <>
      <section className={`v2-section v2-detail tone-${service.layout.detailTone}`}>
        <div className="v2-shell">
          <SectionHeading eyebrow="מותאם לשירות" title={title} text={text} light={service.layout.detailTone === "dark"} />
          <DetailGrid items={items} />
        </div>
      </section>

      {service.proof ? (
        <section className="v2-proof-note">
          <div className="v2-shell v2-reveal">
            <strong>{service.proof.title}</strong>
            <p>{service.proof.text}</p>
          </div>
        </section>
      ) : null}

      {service.useCases ? (
        <section className="v2-section v2-use-cases">
          <div className="v2-shell">
            <SectionHeading
              eyebrow="איפה משתמשים"
              title="VibyTap מתאים את עצמו לרגע"
              text="בחרו את המיקום, הפעולה והיעד שמתאימים לחוויית הלקוח."
            />
            <DetailGrid items={service.useCases} />
          </div>
        </section>
      ) : null}
    </>
  );
}
