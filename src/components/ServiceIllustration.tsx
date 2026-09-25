import type { ServiceId } from "@/lib/services";

export const servicePresentation: Record<
  ServiceId,
  { name: string; description: string; color: string; background: string }
> = {
  "punch-card": {
    name: "כרטיסיות דיגיטליות",
    description: "כל ביקור מקרב למתנה",
    color: "#df276e",
    background: "#ffdeeb",
  },
  "smart-wheel": {
    name: "גלגל חכם",
    description: "פרס שנותן סיבה לחזור",
    color: "#9a53d3",
    background: "#ebdcff",
  },
  wallet: {
    name: "ארנק דיגיטלי",
    description: "העסק בארנק של הלקוח",
    color: "#b96e20",
    background: "#ffedc2",
  },
  "viby-up": {
    name: "Viby UP",
    description: "AI שמחזק ביקורות, נוכחות וקשר עם לקוחות",
    color: "#7850d7",
    background: "#e3ddff",
  },
  "viby-rate": {
    name: "VibyRate",
    description: "יותר ביקורות ב־Google",
    color: "#258c73",
    background: "#d3eee3",
  },
  "viby-tap": {
    name: "VibyTap",
    description: "כל הקישורים בטאפ אחד",
    color: "#327dcc",
    background: "#d8eaff",
  },
};

/** Lightweight, decorative product artwork shared by every chooser placement. */
export function ServiceIllustration({ service }: { service: ServiceId }) {
  const { color, background } = servicePresentation[service];
  return (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" focusable="false">
      <rect width="240" height="160" rx="20" fill={background} />
      <g transform="translate(-9.6 -6.4) scale(1.08)">
        <ellipse cx="122" cy="140" rx="70" ry="7" fill={color} opacity=".08" />
        {service === "punch-card" && (
          <>
            <rect
              x="40"
              y="32"
              width="160"
              height="105"
              rx="17"
              fill="white"
              stroke={color}
              strokeWidth="2"
              transform="rotate(-5 120 85)"
            />
            <path
              d="M59 53h55"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M59 65h34"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".3"
            />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g
                key={i}
                transform={`translate(${64 + (i % 4) * 36} ${87 + Math.floor(i / 4) * 28})`}
              >
                <circle r="10" fill={i < 5 ? color : background} />
                {i < 5 && (
                  <path
                    d="m-4 0 3 3 5-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </g>
            ))}
            <path
              d="M165 41v18m-9-9h18"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
        {service === "smart-wheel" && (
          <>
            <path d="m107 119-8 20h42l-8-20" fill={color} />
            <circle
              cx="120"
              cy="78"
              r="58"
              fill="white"
              stroke={color}
              strokeWidth="5"
            />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path
                key={i}
                d="M120 78V25a53 53 0 0 1 37.48 15.52Z"
                fill={i % 2 ? "#ffe5a7" : color}
                transform={`rotate(${i * 45} 120 78)`}
              />
            ))}
            <circle cx="120" cy="78" r="17" fill="white" />
            <path
              d="m120 68 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"
              fill={color}
            />
            <path d="m110 14 10 19 10-19Z" fill="#382346" />
          </>
        )}
        {service === "wallet" && (
          <>
            <rect
              x="69"
              y="18"
              width="105"
              height="96"
              rx="13"
              fill={color}
              transform="rotate(10 120 80)"
            />
            <rect
              x="50"
              y="38"
              width="128"
              height="90"
              rx="13"
              fill="#f4bd64"
              transform="rotate(-8 110 80)"
            />
            <rect
              x="42"
              y="65"
              width="159"
              height="75"
              rx="17"
              fill="#483044"
            />
            <path
              d="M55 83h132"
              stroke="white"
              strokeOpacity=".15"
              strokeWidth="2"
            />
            <rect x="161" y="89" width="43" height="30" rx="10" fill={color} />
            <circle cx="174" cy="104" r="4" fill="#ffe6bc" />
            <path
              d="M65 105h29m-29 10h43"
              stroke="#ffe6bc"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}
        {service === "viby-up" && (
          <>
            <rect
              x="62"
              y="12"
              width="100"
              height="138"
              rx="19"
              fill="#33204b"
            />
            <rect x="68" y="19" width="88" height="124" rx="14" fill="white" />
            <rect x="96" y="24" width="32" height="5" rx="2.5" fill="#33204b" />
            <path
              d="M85 44h76a9 9 0 0 1 9 9v19a9 9 0 0 1-9 9h-7l-10 9v-9H85a9 9 0 0 1-9-9V53a9 9 0 0 1 9-9Z"
              fill={color}
            />
            <path
              d="M92 57h54m-54 11h36"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect x="41" y="96" width="93" height="28" rx="12" fill="#d9cef7" />
            {[61, 77, 93].map((x) => (
              <circle key={x} cx={x} cy="110" r="3" fill={color} />
            ))}
            <path
              d="m188 21 4 11 11 4-11 4-4 11-4-11-11-4 11-4Z"
              fill={color}
            />
          </>
        )}
        {service === "viby-rate" && (
          <>
            <path d="m77 32-20 109h129L163 32Z" fill="#c6e7d9" />
            <rect
              x="64"
              y="23"
              width="112"
              height="109"
              rx="13"
              fill="white"
              stroke={color}
              strokeWidth="2"
            />
            {[84, 102, 120, 138, 156].map((x) => (
              <path
                key={x}
                d={`m${x} 47 2 5 5 1-4 4 1 5-4-3-5 3 1-5-4-4 5-1Z`}
                fill="#efb73c"
              />
            ))}
            <circle cx="120" cy="94" r="21" fill={background} />
            <path
              d="M130 85a14 14 0 1 0 2 17V94h-12"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}
        {service === "viby-tap" && (
          <>
            <rect
              x="41"
              y="38"
              width="110"
              height="101"
              rx="14"
              fill={color}
              transform="rotate(-9 96 88)"
            />
            <path
              d="M61 61h43m-43 12h25"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="117"
              y="17"
              width="78"
              height="127"
              rx="15"
              fill="#243752"
            />
            <rect x="123" y="24" width="66" height="113" rx="10" fill="white" />
            <circle cx="156" cy="49" r="12" fill={color} />
            {[72, 89, 106].map((y) => (
              <rect
                key={y}
                x="132"
                y={y}
                width="48"
                height="11"
                rx="5"
                fill={background}
                stroke={color}
                strokeWidth="1"
              />
            ))}
            <path
              d="M90 89q14 12 0 24m-8-19q8 7 0 14"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
      </g>
    </svg>
  );
}
