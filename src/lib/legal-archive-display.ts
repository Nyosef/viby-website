/** Keep versioned legal views aligned with the public archive's redactions. */
export function publicArchiveText(text: string) {
  return text
    .replaceAll(", עוסק פטור, שמענו ", ". כתובת העסק: ")
    .replaceAll("מחיר סופי; לא נגבה מע״מ — עוסק פטור.", "המחיר הסופי יוצג לפני אישור ההזמנה.")
    .replaceAll("שינוי במעמד המס אינו מתיר שינוי בדיעבד של מחיר שאושר", "מחיר שכבר אושר לא ישונה בדיעבד");
}
