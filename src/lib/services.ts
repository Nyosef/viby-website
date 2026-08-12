export type ServiceId =
  | "punch-card"
  | "smart-wheel"
  | "wallet"
  | "viby-rate"
  | "viby-tap";

export type ServiceGroup = "retention" | "nfc";

export type JourneyStep = {
  icon?: string;
  title: string;
  text: string;
};

export type Benefit = {
  icon: string;
  title: string;
  text: string;
};

export type DetailItem = {
  icon: string;
  title: string;
  text: string;
};

export type MediaContent = {
  eyebrow: string;
  title: string;
  text: string;
  kind: ServiceId;
  videoUrl?: string;
};

export type CTAContent = {
  message: string;
  buttonLabel?: string;
  midTitle: string;
  finalTitle: string;
  finalText: string;
};

export type ServiceLayoutOptions = {
  heroVisual: ServiceId;
  detailTone: "blush" | "white" | "dark";
};

export type ServiceContent = {
  id: ServiceId;
  group: ServiceGroup;
  label: string;
  shortLabel: string;
  badge: string;
  hero: {
    title: string;
    text: string;
  };
  howItWorks: JourneyStep[];
  benefits: Benefit[];
  media: MediaContent;
  cta: CTAContent;
  customerJourney?: JourneyStep[];
  destinations?: DetailItem[];
  useCases?: DetailItem[];
  walletCapabilities?: DetailItem[];
  rewards?: {
    title: string;
    text: string;
    items: DetailItem[];
  };
  physicalProduct?: {
    title: string;
    text: string;
    items: DetailItem[];
  };
  proof?: {
    title: string;
    text: string;
  };
  layout: ServiceLayoutOptions;
};

export const serviceGroups: Array<{
  id: ServiceGroup;
  label: string;
  emoji: string;
}> = [
  { id: "retention", label: "שימור לקוחות", emoji: "💗" },
  { id: "nfc", label: "פתרונות NFC לעסק", emoji: "📲" },
];

export const services: Record<ServiceId, ServiceContent> = {
  "punch-card": {
    id: "punch-card",
    group: "retention",
    label: "כרטיסיות דיגיטליות",
    shortLabel: "כרטיסיות",
    badge: "כרטיסייה חכמה, בלי נייר ובלי אפליקציה",
    hero: {
      title: "כרטיסייה דיגיטלית לעסק שגורמת ללקוחות לחזור",
      text: "כרטיס ניקוב דיגיטלי שמחליף את כרטיסיית הנייר: הלקוחות מצטרפים בסריקת QR, שומרים כרטיסיית נאמנות ב־Apple Wallet או Google Wallet ורואים כמה נשאר עד ההטבה הבאה — בלי אפליקציה.",
    },
    howItWorks: [
      {
        icon: "📲",
        title: "סורקים ומצטרפים",
        text: "הלקוח סורק QR ומקבל כרטיסייה דיגיטלית.",
      },
      {
        icon: "💳",
        title: "שומרים בטלפון",
        text: "הכרטיסייה נשמרת בארנק הדיגיטלי.",
      },
      {
        icon: "🎁",
        title: "חוזרים ומקבלים",
        text: "כל ביקור מקרב את הלקוח למתנה.",
      },
    ],
    benefits: [
      {
        icon: "↩",
        title: "יותר ביקורים חוזרים",
        text: "ההתקדמות אל ההטבה הבאה נשארת מול העיניים ומעודדת השלמת הכרטיסייה.",
      },
      {
        icon: "◎",
        title: "מאגר לקוחות מסודר",
        text: "כל הצטרפות עוזרת לעסק לבנות מאגר ולהבין מי הלקוחות הפעילים.",
      },
      {
        icon: "◫",
        title: "בלי אפליקציה",
        text: "הלקוח לא צריך להוריד דבר או לזכור להביא כרטיסיית נייר.",
      },
      {
        icon: "✦",
        title: "הטבה שמרגישים",
        text: "היעד, ההתקדמות והפרס ברורים ללקוח בכל רגע.",
      },
    ],
    media: {
      eyebrow: "החוויה בפועל",
      title: "כרטיסיית נאמנות דיגיטלית, בלי כרטיס נייר",
      text: "מסריקה ראשונה ועד כרטיסייה שחיה בארנק של הלקוח.",
      kind: "punch-card",
      videoUrl:
        "https://player.vimeo.com/video/1209541694?badge=0&autopause=0&autoplay=0&muted=0&player_id=0&app_id=58479",
    },
    cta: {
      message:
        "היי, אשמח לשמוע פרטים ולקבל הדגמה של הכרטיסיות הדיגיטליות של Viby.",
      midTitle: "רוצים לראות איך הכרטיסייה תיראה בעסק שלכם?",
      finalTitle: "הכרטיסייה הבאה של הלקוחות שלכם כבר יכולה להיות דיגיטלית",
      finalText: "נדגים לכם את החוויה ונבדוק יחד איך היא מתאימה לעסק.",
    },
    customerJourney: [
      {
        title: "הלקוח רואה התקדמות",
        text: "כל ניקוב מתעדכן מיד והלקוח יודע בדיוק כמה נשאר עד ההטבה.",
      },
      {
        title: "העסק רואה פעילות",
        text: "הצטרפויות וביקורים הופכים למידע שימושי במקום לכרטיסי נייר אנונימיים.",
      },
      {
        title: "הקשר ממשיך",
        text: "מאגר הלקוחות מאפשר ליצור בהמשך תקשורת ושיווק רלוונטיים.",
      },
    ],
    layout: { heroVisual: "punch-card", detailTone: "blush" },
  },
  "smart-wheel": {
    id: "smart-wheel",
    group: "retention",
    label: "גלגל חכם",
    shortLabel: "גלגל חכם",
    badge: "הופכים כל קנייה לרגע של משחק",
    hero: {
      title: "גלגל מזל דיגיטלי שהופך כל קנייה לסיבה לחזור",
      text: "הגלגל החכם של Viby הוא משחק פרסים לעסק: הלקוח סורק QR אחרי הקנייה, מסובב, זוכה בפרס שהעסק הגדיר וחוזר לממש אותו בביקור הבא.",
    },
    howItWorks: [
      {
        icon: "📲",
        title: "סורקים",
        text: "הלקוח סורק ומצטרף בשניות.",
      },
      {
        icon: "🎡",
        title: "מסובבים",
        text: "משחקים וזוכים בפרס שהעסק בחר.",
      },
      {
        icon: "🎁",
        title: "חוזרים",
        text: "מממשים את הפרס בביקור הבא.",
      },
    ],
    benefits: [
      {
        icon: "✦",
        title: "רגע שאנשים זוכרים",
        text: "חוויה קצרה של משחק והפתעה מיד אחרי הקנייה.",
      },
      {
        icon: "↩",
        title: "פרס לביקור הבא",
        text: "הפרסים מתוכננים כדי להחזיר לקוחות ולא רק לתת הנחה.",
      },
      {
        icon: "◎",
        title: "לקוחות ולא רק סיבובים",
        text: "ההצטרפות בונה מאגר ומאפשרת להבין מי משחק ומי חוזר.",
      },
      {
        icon: "⚙",
        title: "שליטה מלאה לעסק",
        text: "העסק מגדיר פרסים, כמויות והסתברויות שמתאימים לו.",
      },
    ],
    media: {
      eyebrow: "המשחק בפעולה",
      title: "כך עובד גלגל המזל הדיגיטלי",
      text: "חוויה מהירה וברורה שמתאימה למסך של כל טלפון.",
      kind: "smart-wheel",
    },
    cta: {
      message:
        "היי, אשמח לשמוע פרטים ולקבל הדגמה של הגלגל החכם של Viby.",
      midTitle: "איזה פרס יגרום ללקוחות שלכם לחזור?",
      finalTitle: "הפכו את הקנייה הבאה לרגע שהלקוח ירצה לחוות שוב",
      finalText: "נבנה יחד גלגל שמתאים למוצרים, לפרסים ולקצב של העסק.",
    },
    rewards: {
      title: "הפרסים עובדים בשביל העסק",
      text: "כמשחק שיווקי לעסק, הגלגל לא נועד רק לבדר. כל תוצאה יכולה להוביל לפעולה עסקית ברורה.",
      items: [
        {
          icon: "☕",
          title: "מתנה בביקור הבא",
          text: "פרס קטן עם תוקף שמייצר סיבה לחזור בזמן.",
        },
        {
          icon: "%",
          title: "הטבה חכמה",
          text: "הנחה על מוצר משלים או על שעות שהעסק רוצה לחזק.",
        },
        {
          icon: "★",
          title: "פרס נדיר",
          text: "זכייה גדולה שמייצרת התרגשות ושיחה סביב העסק.",
        },
      ],
    },
    layout: { heroVisual: "smart-wheel", detailTone: "dark" },
  },
  wallet: {
    id: "wallet",
    group: "retention",
    label: "ארנק דיגיטלי",
    shortLabel: "ארנק דיגיטלי",
    badge: "משלמים 200 ₪. מקבלים 230 ₪ לארנק.",
    hero: {
      title: "כרטיס מתנה דיגיטלי לעסק שנשמר ישר בטלפון",
      text: "העסק מוכר כרטיסי מתנה דיגיטליים ללקוחות שרוצים לפנק אדם אחר או לרכוש לעצמם יתרה עם בונוס. הכרטיס נשמר ב־Apple Wallet או Google Wallet, מוכן למימוש ובלי אפליקציה.",
    },
    howItWorks: [
      {
        icon: "🎁",
        title: "בוחרים כרטיס מתנה",
        text: "הלקוח בוחר את הכרטיס והסכום שהוא רוצה לקנות.",
      },
      {
        icon: "💳",
        title: "משלמים 200 ₪",
        text: "משלמים בקלות, כולל Apple Pay או Google Pay.",
      },
      {
        icon: "✨",
        title: "מקבלים 230 ₪ בארנק",
        text: "כרטיס המתנה נשמר בטלפון ומוכן למימוש בעסק.",
      },
    ],
    benefits: [
      {
        icon: "🎁",
        title: "קל לקנות כרטיס מתנה",
        text: "בוחרים סכום, משלמים ושומרים — הכול בכמה לחיצות.",
      },
      {
        icon: "₪",
        title: "הלקוח מקבל יותר",
        text: "לדוגמה: משלם 200 ₪ ומקבל 230 ₪ למימוש בעסק.",
      },
      {
        icon: "📲",
        title: "תמיד נמצא בטלפון",
        text: "הכרטיס נשמר ב־Apple Wallet או Google Wallet ולא הולך לאיבוד.",
      },
      {
        icon: "💳",
        title: "תשלום פשוט ומהיר",
        text: "אפשר לשלם גם באמצעות Apple Pay או Google Pay.",
      },
    ],
    media: {
      eyebrow: "רואים ומבינים בשנייה",
      title: "כך קונים ושומרים כרטיס מתנה דיגיטלי",
      text: "מערכת כרטיסי מתנה לעסק מאפשרת לקנות ב־200 ₪ ולקבל 230 ₪ בתוך Apple Wallet או Google Wallet.",
      kind: "wallet",
    },
    cta: {
      message:
        "היי, אשמח לשמוע פרטים ולקבל הדגמה של הארנק הדיגיטלי לעסק מבית Viby.",
      midTitle: "רוצים למכור כרטיסי מתנה ישר לארנק?",
      finalTitle: "הופכים 200 ₪ לסיבה לחזור עם 230 ₪",
      finalText: "נראה לכם איך הלקוח קונה, שומר ב־Wallet ומממש אצלכם בעסק.",
    },
    walletCapabilities: [
      {
        icon: "1",
        title: "בוחרים מתנה",
        text: "הלקוח בוחר כרטיס מתנה לעסק.",
      },
      {
        icon: "2",
        title: "משלמים 200 ₪",
        text: "משלמים בכרטיס, Apple Pay או Google Pay.",
      },
      {
        icon: "3",
        title: "מקבלים 230 ₪",
        text: "הבונוס כבר נמצא בכרטיס המתנה.",
      },
      {
        icon: "4",
        title: "שומרים ב־Wallet",
        text: "הכרטיס נכנס ל־Apple Wallet או Google Wallet ומוכן לשימוש.",
      },
    ],
    layout: { heroVisual: "wallet", detailTone: "white" },
  },
  "viby-rate": {
    id: "viby-rate",
    group: "nfc",
    label: "VibyRate",
    shortLabel: "VibyRate",
    badge: "יותר ביקורות אמיתיות, בפחות חיכוך",
    hero: {
      title: "כרטיס NFC לביקורות גוגל — טאפ אחד והלקוח מדרג",
      text: "VibyRate הוא כרטיס NFC לביקורות גוגל שמוביל לקוחות ישירות לעמוד הדירוג של העסק, בלי לחפש או להקליד. כך קל יותר לבקש ביקורת אמיתית ברגע הנכון.",
    },
    howItWorks: [
      {
        icon: "📲",
        title: "מצמידים",
        text: "הלקוח מצמיד את הטלפון לכרטיס.",
      },
      {
        icon: "⭐",
        title: "מדרגים",
        text: "עמוד הביקורות נפתח מיד.",
      },
      {
        icon: "📈",
        title: "מתחזקים",
        text: "יותר לקוחות מרוצים משאירים ביקורת.",
      },
    ],
    benefits: [
      {
        icon: "N",
        title: "NFC מהיר",
        text: "הצמדה אחת מחליפה חיפוש, הקלדה והסברים בקופה.",
      },
      {
        icon: "★",
        title: "יותר ביקורות",
        text: "כשהדרך קצרה וברורה, קל יותר ללקוח להשלים דירוג.",
      },
      {
        icon: "G",
        title: "נוכחות חזקה בגוגל",
        text: "ביקורות עדכניות עוזרות ללקוחות חדשים לבחור בעסק.",
      },
      {
        icon: "◫",
        title: "מוצר פיזי וממותג",
        text: "כרטיס שנראה טוב על הדלפק ומוכן לשימוש יומיומי.",
      },
    ],
    media: {
      eyebrow: "פשוט מצמידים",
      title: "כך כרטיס NFC לביקורות גוגל עובד",
      text: "הלקוח מגיע ישירות ל־Google Reviews בלי לסרוק, לחפש או להקליד את שם העסק.",
      kind: "viby-rate",
    },
    cta: {
      message:
        "היי, אשמח לשמוע פרטים ולקבל הדגמה של VibyRate לעסק שלי.",
      midTitle: "רוצים להקל על הלקוחות לפרגן לכם?",
      finalTitle: "כל לקוח מרוצה יכול להפוך לביקורת הבאה שלכם",
      finalText: "נכין את הכרטיס ונחבר אותו ישירות לעמוד הביקורות של העסק.",
    },
    physicalProduct: {
      title: "שלט NFC לביקורות גוגל שעובד ליד הקופה",
      text: "כרטיס ביקורות גוגל לעסק בנוי לרגע שבו הלקוח כבר מרוצה והצוות יכול להזמין אותו לפרגן.",
      items: [
        {
          icon: "N",
          title: "ללא סוללה",
          text: "הכרטיס עובד באמצעות NFC ואינו דורש טעינה או תחזוקה.",
        },
        {
          icon: "⌁",
          title: "מותאם לעסק",
          text: "היעד מחובר לעמוד הביקורות הרלוונטי של העסק.",
        },
        {
          icon: "↗",
          title: "פעולה מיידית",
          text: "הטלפון פותח את עמוד הדירוג ברגע ההצמדה.",
        },
      ],
    },
    proof: {
      title: "פחות שלבים, יותר סיכוי לביקורת",
      text: "VibyRate לא מבטיח דירוגים. הוא פשוט מסיר את השלבים המיותרים בין לקוח מרוצה לבין ביקורת אמיתית.",
    },
    layout: { heroVisual: "viby-rate", detailTone: "white" },
  },
  "viby-tap": {
    id: "viby-tap",
    group: "nfc",
    label: "VibyTap",
    shortLabel: "VibyTap",
    badge: "NFC או QR — כל הקישורים במקום אחד",
    hero: {
      title: "שלט NFC לעסק שמרכז את כל הקישורים במקום אחד",
      text: "VibyTap הוא שלט או מדבקת NFC לעסק עם QR, שפותחים עמוד קישורים אחד ובו ביקורות גוגל, Instagram, WhatsApp, Waze, אתר העסק ועוד.",
    },
    howItWorks: [
      {
        icon: "📱",
        title: "מצמידים או סורקים",
        text: "הלקוח מצמיד את הטלפון לשלט או סורק את ה־QR.",
      },
      {
        icon: "👆",
        title: "רואים את כל הקישורים",
        text: "נפתח עמוד אחד פשוט עם כל המקומות החשובים של העסק.",
      },
      {
        icon: "✅",
        title: "בוחרים לאן להמשיך",
        text: "Instagram, WhatsApp, Waze, אתר העסק ועוד — בלחיצה אחת.",
      },
    ],
    benefits: [
      {
        icon: "📱",
        title: "עובד ב־NFC או QR לעסק",
        text: "אפשר להצמיד את הטלפון או לסרוק. שתי הדרכים מובילות לאותו עמוד.",
      },
      {
        icon: "🎨",
        title: "עיצוב אישי לעסק",
        text: "שלט או מדבקה עם הצבעים, הלוגו והסגנון של העסק.",
      },
      {
        icon: "🔗",
        title: "משנים קישורים גם אחר כך",
        text: "אפשר לעדכן את הקישורים בכל זמן, גם אחרי שהשלט כבר הודפס.",
      },
      {
        icon: "🏪",
        title: "עמוד שונה לכל סניף",
        text: "לכל סניף אפשר לתת קישורים, ניווט ופרטי קשר משלו.",
      },
    ],
    media: {
      eyebrow: "פשוט מצמידים ובוחרים",
      title: "עמוד קישורים לעסק שמתעדכן גם אחרי ההדפסה",
      text: "עמוד אחד ברור: ביקורות, רשתות חברתיות, אתר, WhatsApp וניווט.",
      kind: "viby-tap",
    },
    cta: {
      message:
        "היי, אני רוצה Viby Tap לעסק שלי. אשמח לקבל פרטים והדגמה.",
      buttonLabel: "אני רוצה Viby Tap",
      midTitle: "רוצים שכל הקישורים יהיו במרחק טאפ אחד?",
      finalTitle: "טאפ אחד. כל העסק מול הלקוח.",
      finalText: "נכין לכם שלט או מדבקה בעיצוב אישי, ונרכז בעמוד אחד את כל הקישורים החשובים של העסק.",
    },
    destinations: [
      {
        icon: "⭐",
        title: "Google Reviews",
        text: "הלקוח מגיע ישר לעמוד הביקורות של העסק.",
      },
      {
        icon: "📷",
        title: "Instagram",
        text: "עוברים לפרופיל ועוקבים אחרי העסק.",
      },
      {
        icon: "👍",
        title: "Facebook",
        text: "פותחים את עמוד העסק בפייסבוק.",
      },
      {
        icon: "🎵",
        title: "TikTok",
        text: "מגיעים ישר לעמוד ה־TikTok של העסק.",
      },
      {
        icon: "🌐",
        title: "אתר העסק",
        text: "פותחים את האתר בלי לחפש את שם העסק.",
      },
      {
        icon: "💬",
        title: "WhatsApp",
        text: "מתחילים שיחה עם העסק בלחיצה אחת.",
      },
      {
        icon: "📍",
        title: "Waze",
        text: "פותחים ניווט ישיר לסניף הנכון.",
      },
    ],
    layout: { heroVisual: "viby-tap", detailTone: "dark" },
  },
};

export const serviceIds = Object.keys(services) as ServiceId[];

export function isServiceId(value: string | null | undefined): value is ServiceId {
  return Boolean(value && serviceIds.includes(value as ServiceId));
}
