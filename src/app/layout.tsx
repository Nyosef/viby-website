import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viby | מועדון לקוחות דיגיטלי",
  description:
    "Viby עוזרת לעסקים לבנות מועדון לקוחות דיגיטלי, להחזיר לקוחות ולמדוד נאמנות בזמן אמת.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={heebo.className}>{children}</body>
    </html>
  );
}
