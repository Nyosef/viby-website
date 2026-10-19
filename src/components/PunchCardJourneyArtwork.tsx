/** Illustrations of the existing customer/staff flow, not product screenshots. */
export function PunchCardJourneyArtwork({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 320 210" fill="none" aria-hidden="true" focusable="false">
      <ellipse cx="160" cy="188" rx="115" ry="12" fill="#eadae7" />
      <circle
        cx="160"
        cy="100"
        r="88"
        fill={step === 1 ? "#ede7ff" : "#fbe4ef"}
      />
      <circle
        cx="160"
        cy="100"
        r="70"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="4 7"
      />
      {step === 0 ? (
        <>
          <g transform="rotate(8 103 115)">
            <path d="M78 174h68l8 10H70z" fill="#8e3b6b" />
            <rect
              x="57"
              y="46"
              width="112"
              height="130"
              rx="13"
              fill="white"
              stroke="#c589b0"
              strokeWidth="2"
            />
            <rect x="76" y="63" width="74" height="10" rx="5" fill="#ef4389" />
            <image
              href="/viby-demo-qr.svg"
              x="77"
              y="88"
              width="72"
              height="72"
            />
          </g>
          <g transform="rotate(-8 226 110)">
            <rect
              x="188"
              y="26"
              width="79"
              height="160"
              rx="18"
              fill="#302237"
            />
            <rect
              x="193"
              y="32"
              width="69"
              height="148"
              rx="14"
              fill="#fff9fc"
            />
            <rect
              x="214"
              y="37"
              width="26"
              height="5"
              rx="2.5"
              fill="#302237"
            />
            <rect x="203" y="80" width="49" height="49" rx="8" fill="#f9deeb" />
            <path
              d="M209 93v-6h6m25 0h6v6m0 23v6h-6m-25 0h-6v-6"
              stroke="#b52e73"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className="journey-scan-line"
              d="M207 104h41"
              stroke="#f03888"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="207"
              y="146"
              width="42"
              height="13"
              rx="6.5"
              fill="#b52e73"
            />
          </g>
          <path
            d="M166 78q12-15 25-8m-5-8 7 8-10 5"
            stroke="#9d5a85"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      ) : step === 1 ? (
        <>
          <rect x="123" y="18" width="94" height="174" rx="21" fill="#302237" />
          <rect x="129" y="24" width="82" height="162" rx="16" fill="#fbf8ff" />
          <rect x="155" y="29" width="30" height="5" rx="2.5" fill="#302237" />
          <rect x="140" y="52" width="60" height="7" rx="3.5" fill="#ded3e9" />
          <rect x="139" y="76" width="62" height="80" rx="10" fill="#f0e7fa" />
          <rect x="146" y="164" width="47" height="6" rx="3" fill="#ded3e9" />
          <g transform="rotate(-9 122 110)">
            <rect
              x="60"
              y="72"
              width="124"
              height="83"
              rx="14"
              fill="white"
              stroke="#c38bb1"
              strokeWidth="2"
            />
            <rect x="73" y="86" width="65" height="6" rx="3" fill="#eb3782" />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={78 + i * 21}
                cy="109"
                r="6"
                fill={i < 3 ? "#e63883" : "#f8deeb"}
              />
            ))}
            <rect
              x="73"
              y="128"
              width="84"
              height="5"
              rx="2.5"
              fill="#efdfeb"
            />
            <rect x="73" y="139" width="52" height="4" rx="2" fill="#efdfeb" />
          </g>
          <circle
            cx="220"
            cy="148"
            r="24"
            fill="#45796c"
            stroke="white"
            strokeWidth="4"
          />
          <path
            d="m210 148 7 7 13-15"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="m236 52 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#b598db" />
        </>
      ) : (
        <>
          <g transform="rotate(-6 137 108)">
            <rect
              x="45"
              y="40"
              width="182"
              height="133"
              rx="18"
              fill="white"
              stroke="#c38bb1"
              strokeWidth="2"
            />
            <rect x="62" y="58" width="92" height="8" rx="4" fill="#e63883" />
            <rect x="62" y="73" width="60" height="5" rx="2.5" fill="#e9dce6" />
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <circle
                  cx={76 + (i % 4) * 37}
                  cy={104 + Math.floor(i / 4) * 35}
                  r="11"
                  fill={i < 6 ? "#e63883" : "#f9e0ec"}
                />
                {i < 6 ? (
                  <path
                    d={`m${71 + (i % 4) * 37} ${104 + Math.floor(i / 4) * 35} 4 4 7-8`}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : null}
              </g>
            ))}
          </g>
          <g transform="rotate(8 235 145)">
            <rect
              x="203"
              y="128"
              width="65"
              height="55"
              rx="9"
              fill="#8e3b6b"
            />
            <rect
              x="196"
              y="115"
              width="79"
              height="19"
              rx="5"
              fill="#ef70aa"
            />
            <path
              d="M235 116v67m0-67c-29 0-28-30-11-24 9 3 11 24 11 24Zm0 0c29 0 28-30 11-24-9 3-11 24-11 24Z"
              stroke="#f9bfd9"
              strokeWidth="5"
            />
          </g>
          <path d="m257 48 4 9 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#e9bd69" />
          <circle cx="57" cy="181" r="5" fill="#e9bd69" />
        </>
      )}
    </svg>
  );
}
