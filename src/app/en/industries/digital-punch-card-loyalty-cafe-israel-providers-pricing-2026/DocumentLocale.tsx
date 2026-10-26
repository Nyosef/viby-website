"use client";

import { useEffect } from "react";

export function DocumentLocale() {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = "en";
    html.dir = "ltr";
    return () => {
      html.lang = "he-IL";
      html.dir = "rtl";
    };
  }, []);

  return null;
}
