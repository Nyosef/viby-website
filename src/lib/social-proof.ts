export type SocialProofPhoto = {
  cardSrc: string;
  alt: string;
  objectPosition?: {
    desktop?: string;
    mobile?: string;
  };
};

export type SocialProofCategory =
  | "באולינג ובידור"
  | "מאפייה"
  | "מאפייה ובית קפה"
  | "גלידרייה"
  | "בית קפה"
  | "משקאות"
  | "שטיפת רכב"
  | "שוקולד"
  | "חנות פרחים";

export type SocialProofBusiness = {
  id: string;
  name: string;
  logoSrc?: string;
  photo: SocialProofPhoto;
  category: SocialProofCategory;
  /** Unattributed marketing copy; use quote fields only for approved testimonials. */
  editorialLine: string;
  productUsed?: string;
  quote?: string;
  quoteAuthor?: string;
};

export const socialProofCategoryHooks: Record<SocialProofCategory, string> = {
  "באולינג ובידור": "הכיף ממשיך",
  "מאפייה": "טעם שרוצים לזכור",
  "מאפייה ובית קפה": "רגע חם באמצע היום",
  "גלידרייה": "מתוק לחזור",
  "בית קפה": "עוד סיבה להיפגש",
  "משקאות": "לחיים לעוד מפגש",
  "שטיפת רכב": "יוצאים לדרך בחיוך",
  "שוקולד": "עוד רגע מתוק",
  "חנות פרחים": "חיוך שנשאר",
};

const photoRoot = "/social_proof_businesses";
const logoRoot = "/customer-logos";

export const socialProofBusinesses: readonly SocialProofBusiness[] = [
  {
    id: "arbel-bowling",
    name: "ארבל באולינג",
    logoSrc: `${logoRoot}/arbel-bowling.jpg`,
    category: "באולינג ובידור",
    editorialLine: "המשחק נגמר; עם Viby הכיף יכול להמשיך.",
    photo: {
      cardSrc: `${photoRoot}/arbel-bowling-card-800.webp`,
      alt: "יד נוגעת בשלט NFC של ארבל באולינג ליד עמדת התשלום",
      objectPosition: { desktop: "50% 52%", mobile: "58% 50%" },
    },
  },
  {
    id: "burekas-baba",
    name: "בורקס בבא",
    logoSrc: `${logoRoot}/burekas-baba.jpg`,
    category: "מאפייה",
    editorialLine: "מהביס הראשון ועד הפעם הבאה, Viby נשארת בתמונה.",
    photo: {
      cardSrc: `${photoRoot}/baba-burekas-card-800.webp`,
      alt: "איש צוות בבורקס בבא ליד דלפק התצוגה ושלט Viby",
      objectPosition: { desktop: "48% 38%", mobile: "50% 38%" },
    },
  },
  {
    id: "freddo",
    name: "Freddo",
    logoSrc: `${logoRoot}/freddo.jpg`,
    category: "גלידרייה",
    editorialLine: "Viby מוסיפה לרגע המתוק דרך להישאר בקשר.",
    photo: {
      cardSrc: `${photoRoot}/freddo-icecream-card-800.webp`,
      alt: "ויטרינת גלידות ושלט Viby בגלידריית Freddo",
      objectPosition: { desktop: "50% 48%", mobile: "50% 48%" },
    },
  },
  {
    id: "ingale",
    name: "אינגלה",
    logoSrc: `${logoRoot}/ingale.jpg`,
    category: "בית קפה",
    editorialLine: "קפה, אנשים, ו־Viby שממשיכה את החיבור.",
    photo: {
      cardSrc: `${photoRoot}/ingale-coffee-card-800.webp`,
      alt: "דלפק בית הקפה אינגלה עם מוצרים ושלט Viby",
      objectPosition: { desktop: "42% 48%", mobile: "42% 48%" },
    },
  },
  {
    id: "le-drink",
    name: "Le Drink",
    logoSrc: `${logoRoot}/le-drink.jpg`,
    category: "משקאות",
    editorialLine: "גם כשהכוס מתרוקנת, Viby משאירה מקום לקשר.",
    photo: {
      cardSrc: `${photoRoot}/le-drink-bubble-tea-card-800.webp`,
      alt: "דלפק Le Drink עם שלט Viby ואנשי צוות",
      objectPosition: { desktop: "50% 48%", mobile: "50% 48%" },
    },
  },
  {
    id: "lihi-cafe",
    name: "קפה ליהי",
    logoSrc: `${logoRoot}/lihi-cafe.jpg`,
    category: "בית קפה",
    editorialLine: "כל כוס היא התחלה של קשר. Viby ממשיכה אותו.",
    photo: {
      cardSrc: `${photoRoot}/lihi-coffee-card-800.webp`,
      alt: "דלפק קפה ליהי עם ויטרינה ושלט Viby",
      objectPosition: { desktop: "65% 48%", mobile: "67% 50%" },
    },
  },
  {
    id: "haofe-bair",
    name: "האופה בעיר",
    logoSrc: `${logoRoot}/haofe-bair.jpg`,
    category: "מאפייה ובית קפה",
    editorialLine: "מהתנור אל היום שלכם, Viby עוזרת לשמור על החיבור.",
    photo: {
      cardSrc: `${photoRoot}/baker-coffee-bakery-card-800.webp`,
      alt: "מאפים בוויטרינה ושלט Viby על הדלפק של האופה בעיר",
      objectPosition: { desktop: "50% 50%", mobile: "50% 50%" },
    },
  },
  {
    id: "magic-wash",
    name: "Magic Wash",
    logoSrc: `${logoRoot}/magic-wash.jpg`,
    category: "שטיפת רכב",
    editorialLine: "הרכב יוצא נקי; Viby עוזרת לקשר להמשיך.",
    photo: {
      cardSrc: `${photoRoot}/magicwash-carwash-card-800.webp`,
      alt: "שלט הכניסה ל־Magic Wash ושלט Viby בחזית",
      objectPosition: { desktop: "50% 45%", mobile: "50% 45%" },
    },
  },
  {
    id: "mokaya",
    name: "Mokaya",
    logoSrc: `${logoRoot}/mokaya.jpg`,
    category: "שוקולד",
    editorialLine: "רגע מתוק עובר מהר. עם Viby, הקשר נשאר.",
    photo: {
      cardSrc: `${photoRoot}/mokaya-chocolate-card-800.webp`,
      alt: "דלפק שוקולד של Mokaya עם שלט Viby מול ויטרינת המוצרים",
      objectPosition: { desktop: "50% 50%", mobile: "50% 50%" },
    },
  },
  {
    id: "nahat-herzliya",
    name: "נחת הרצליה",
    logoSrc: `${logoRoot}/nahat-herzliya.png`,
    category: "בית קפה",
    editorialLine: "קפה טוב מתחיל שיחה. Viby עוזרת לה להימשך.",
    photo: {
      cardSrc: `${photoRoot}/nahat-coffee-card-800.webp`,
      alt: "איש צוות בנחת הרצליה ליד דלפק הקפה ושלט Viby",
      objectPosition: { desktop: "53% 38%", mobile: "53% 38%" },
    },
  },
  {
    id: "noga-flowers",
    name: "נוגה פרחים",
    logoSrc: `${logoRoot}/noga-flowers.jpg`,
    category: "חנות פרחים",
    editorialLine: "פרחים עושים את היום. Viby ממשיכה את החיוך.",
    photo: {
      cardSrc: `${photoRoot}/noga-flowers-card-800.webp`,
      alt: "שלט Viby ירוק על דלפק חנות הפרחים נוגה",
      objectPosition: { desktop: "45% 48%", mobile: "45% 48%" },
    },
  },
  {
    id: "cafe-paris",
    name: "קפה פריז",
    logoSrc: `${logoRoot}/cafe-paris.png`,
    category: "בית קפה",
    editorialLine: "עם Viby, הרגע של הקפה יכול להמשיך גם אחרי הכוס.",
    photo: {
      cardSrc: `${photoRoot}/paris-coffee-card-800.webp`,
      alt: "איש צוות בקפה פריז מחזיק שלט Viby מול הדלפק",
      objectPosition: { desktop: "50% 35%", mobile: "50% 35%" },
    },
  },
  {
    id: "cafe-roland",
    name: "קפה רולנד",
    logoSrc: `${logoRoot}/cafe-roland.png`,
    category: "בית קפה",
    editorialLine: "מהקפה של היום לקשר של מחר, עם Viby.",
    photo: {
      cardSrc: `${photoRoot}/roland-coffee-card-800.webp`,
      alt: "אשת צוות בקפה רולנד מחזיקה שלט Viby",
      objectPosition: { desktop: "56% 42%", mobile: "56% 42%" },
    },
  },
];

const leadOrder = ["cafe-paris", "cafe-roland", "burekas-baba", "nahat-herzliya"];

export const photographedSocialProofBusinesses = [...socialProofBusinesses]
  .sort((a, b) => {
    const aIndex = leadOrder.indexOf(a.id);
    const bIndex = leadOrder.indexOf(b.id);
    if (aIndex < 0) return bIndex < 0 ? 0 : 1;
    if (bIndex < 0) return -1;
    return aIndex - bIndex;
  });
