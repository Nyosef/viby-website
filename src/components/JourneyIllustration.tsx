import type { LegacyServiceId } from "@/lib/services";

type Symbol =
  | "scan"
  | "wallet"
  | "gift"
  | "wheel"
  | "card"
  | "tap"
  | "review"
  | "growth"
  | "links"
  | "choose";

const journeySymbols: Record<LegacyServiceId, [Symbol, Symbol, Symbol]> = {
  "punch-card": ["scan", "wallet", "gift"],
  "smart-wheel": ["scan", "wheel", "gift"],
  wallet: ["gift", "card", "wallet"],
  "viby-rate": ["tap", "review", "growth"],
  "viby-tap": ["tap", "links", "choose"],
};

/** Simple action illustrations, paired with the visible step number and copy. */
export function JourneyIllustration({
  service,
  step,
}: {
  service: LegacyServiceId;
  step: number;
}) {
  const symbol = journeySymbols[service][step];
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {symbol === "scan" && (
        <>
          <path d="M10 23V12a2 2 0 0 1 2-2h11m18 0h11a2 2 0 0 1 2 2v11M10 41v11a2 2 0 0 0 2 2h11m18 0h11a2 2 0 0 0 2-2V41" />
          <path
            d="M20 20h8v8h-8zm16 0h8v8h-8zM20 36h8v8h-8zm16 0h8v8h-8z"
            fill="currentColor"
            stroke="none"
          />
          <path d="M6 32h52" opacity=".45" />
        </>
      )}
      {symbol === "wallet" && (
        <>
          <rect x="17" y="6" width="30" height="52" rx="6" fill="white" />
          <path d="M27 11h10M29 52h6" />
          <rect x="11" y="22" width="34" height="22" rx="4" fill="white" />
          <path d="M16 28h23m-21 9 3 3 6-7" />
        </>
      )}
      {symbol === "gift" && (
        <>
          <rect x="12" y="29" width="40" height="26" rx="3" fill="white" />
          <rect x="9" y="21" width="46" height="10" rx="2" fill="white" />
          <path d="M32 21v34m0-34c-22 0-17-21-6-13 4 3 6 13 6 13Zm0 0c22 0 17-21 6-13-4 3-6 13-6 13Z" />
        </>
      )}
      {symbol === "wheel" && (
        <>
          <circle cx="32" cy="30" r="22" fill="white" />
          <path d="M32 8v15m22 7H39m-7 22V37M10 30h15m-9-16 11 11m21-11L37 25m11 21L37 35M16 46l11-11m0 19-3 6h16l-3-6" />
          <circle cx="32" cy="30" r="7" fill="white" />
          <path d="m27 5 5 10 5-10" fill="currentColor" stroke="none" />
        </>
      )}
      {symbol === "card" && (
        <>
          <rect x="7" y="14" width="50" height="36" rx="5" fill="white" />
          <path d="M7 25h50M15 39h10m7 0h5" />
        </>
      )}
      {symbol === "tap" && (
        <>
          <rect x="9" y="19" width="24" height="36" rx="4" fill="white" />
          <rect x="35" y="7" width="21" height="34" rx="4" fill="white" />
          <path d="M17 48h8m26-14h-8M23 10q8 0 8 8m-9-14q15 0 15 15" />
        </>
      )}
      {symbol === "review" && (
        <>
          <path
            d="M12 10h40a5 5 0 0 1 5 5v28a5 5 0 0 1-5 5H28L17 57v-9h-5a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5Z"
            fill="white"
          />
          <path
            d="m32 17 4 8 9 1-7 7 2 9-8-5-8 5 2-9-7-7 9-1Z"
            fill="currentColor"
            stroke="none"
          />
        </>
      )}
      {symbol === "growth" && (
        <>
          <path d="M10 9v46h46M19 45V34m12 11V26m12 19V18M17 25l13-9 9 2L54 7m-11 0h11v11" />
        </>
      )}
      {symbol === "links" && (
        <>
          <rect x="14" y="5" width="36" height="54" rx="6" fill="white" />
          <circle cx="32" cy="17" r="4" />
          <rect x="21" y="28" width="22" height="7" rx="3" />
          <rect x="21" y="40" width="22" height="7" rx="3" />
        </>
      )}
      {symbol === "choose" && (
        <>
          <rect x="8" y="10" width="37" height="40" rx="5" fill="white" />
          <path d="M16 21h21m-21 9h12m-12 9h10" />
          <path d="m35 31 20 14-10 2-4 10Z" fill="white" />
        </>
      )}
    </svg>
  );
}
