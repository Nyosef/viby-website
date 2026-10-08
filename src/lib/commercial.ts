import type { ServiceId } from "./services";

export const commercialTerms = {
  initialMonths: 3,
  setupBusinessDays: 3,
  vatNotice: "מחיר סופי; לא נגבה מע״מ — עוסק פטור.",
  commitment: "מנוי בהתחייבות ראשונית ל־3 חודשים; לאחר מכן חידוש חודשי.",
  delivery: "משלוח בתשלום נפרד, שיימסר לאישור מראש.",
  sign: "שלט ממותג אחד כלול בהצטרפות ל־3 חודשים, לאחר אימות התשלום. המפרט מאושר בהזמנה; תוספות בתשלום באישור מראש.",
  setup: "לאחר קבלת פרטי העסק, ההרשאות והאישורים הנדרשים, Viby מפעילה את השירות הדיגיטלי תוך עד 3 ימי עסקים. ימי עסקים: ראשון–חמישי, למעט חגים בישראל. ייצור השלט והמשלוח מתואמים בנפרד.",
} as const;

export function monthlyPrice(service: ServiceId): number | null {
  return service === "viby-up" ? null : service === "punch-card" ? 79 : 49;
}

export function subscriptionPriceNotice(service: ServiceId): string {
  const price = monthlyPrice(service);
  return price === null
    ? "מחיר Viby UP והסכום לתקופה הראשונית נמסרים בהצעת מחיר אישית לפני אישור ההזמנה."
    : `החל מ־${price} ₪ לחודש לכלי; החל מ־${price * commercialTerms.initialMonths} ₪ עבור המנוי לתקופה הראשונית. הסכום אינו כולל משלוח ותוספות מאושרות.`;
}

export function leadPlanDescription() {
  return `כרטיסייה דיגיטלית — ${monthlyPrice("punch-card")} ₪ לחודש; תקופה ראשונית: ${commercialTerms.initialMonths} חודשים, סה״כ ${monthlyPrice("punch-card")! * commercialTerms.initialMonths} ₪ למנוי. ${commercialTerms.vatNotice} ${commercialTerms.delivery} בקשת חזרה בלבד — אינה הזמנה או אישור חיוב.`;
}
