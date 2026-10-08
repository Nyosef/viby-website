"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function VideoConsentPlayer({ src, title, poster = "/video-og.jpg" }: { src: string; title: string; poster?: string }) {
  const [loaded, setLoaded] = useState(false);
  const url = new URL(src);
  url.searchParams.set("dnt", "1");
  url.searchParams.set("autoplay", "1");

  return loaded ? (
    <iframe src={url.toString()} title={title} allow="autoplay; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
  ) : (
    <div className="video-consent-preview">
      <Image src={poster} alt="" fill sizes="(max-width: 720px) 90vw, 480px" />
      <div>
        <button type="button" onClick={() => setLoaded(true)} aria-label={`הפעלת ${title}`}>▶ צפייה בסרטון</button>
        <p>לחיצה תטען נגן Vimeo חיצוני. הבחירה נפרדת מאישור מדידה באתר. <Link href="/privacy#privacy-15">פרטיות הסרטון</Link></p>
      </div>
    </div>
  );
}
