"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function VideoConsentPlayer({ src, title, poster = "/viby-video-preview.jpg" }: { src: string; title: string; poster?: string }) {
  const [loaded, setLoaded] = useState(false);
  const url = new URL(src);
  url.searchParams.set("dnt", "1");
  url.searchParams.set("autoplay", "1");

  return loaded ? (
    <iframe src={url.toString()} title={title} allow="autoplay; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
  ) : (
    <div className="video-consent-preview">
      <Image src={poster} alt="" width={960} height={640} sizes="(max-width: 720px) 85vw, 480px" />
      <button type="button" onClick={() => setLoaded(true)} aria-label={`הפעלת ${title}`}>
        <span className="video-preview-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="56" height="56"><path d="M8 5v14l11-7Z" fill="currentColor" /></svg>
        </span>
        <span>נו, תלחצו! 😉</span>
      </button>
      <p>לחיצה מפעילה נגן Vimeo חיצוני. <Link href="/privacy#privacy-15">פרטיות הסרטון</Link></p>
    </div>
  );
}
