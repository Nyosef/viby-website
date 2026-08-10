import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "העמוד לא נמצא",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Image src="/viby-logo-white.png" alt="Viby" width={190} height={127} />
      <p>404</p>
      <h1>העמוד שחיפשתם לא נמצא</h1>
      <span>אפשר לחזור לדף הבית ולבחור את הפתרון שמתאים לעסק שלכם.</span>
      <Link href="/">חזרה לדף הבית</Link>
    </main>
  );
}
