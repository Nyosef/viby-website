"use client";

import { useEffect, useRef, useState } from "react";
import { upOpening, upScenarios, type UpScenario } from "@/lib/viby-up";
import { UpIcon } from "./UpIcon";

export function UpConversation() {
  const root = useRef<HTMLDivElement>(null);
  const [scenario, setScenario] = useState<UpScenario>("attention");
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const data = upScenarios[scenario];
  const time = reduced ? 15000 : elapsed;
  const complete = time >= 15000;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(media.matches);
    const syncTab = () => setTabVisible(!document.hidden);
    syncMotion();
    syncTab();
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncTab);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncTab);
    };
  }, []);

  useEffect(() => {
    if (paused || !visible || !tabVisible || reduced || complete) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      setElapsed((value) => Math.min(15000, value + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [paused, visible, tabVisible, reduced, complete]);

  function restart(next = scenario) {
    setScenario(next);
    setElapsed(0);
    setPaused(false);
  }

  return (
    <div
      className="up-demo"
      ref={root}
      data-paused={paused || !visible || !tabVisible || complete}
    >
      <div className="up-demo-top">
        <span>
          <i className="up-live-dot" /> הקשר ממשיך, גם אחרי הביקור
        </span>
        <span dir="ltr">Viby UP ✦</span>
      </div>
      <div className="up-scenarios" role="group" aria-label="בחירת תרחיש הדגמה">
        {(Object.keys(upScenarios) as UpScenario[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={scenario === key}
            onClick={() => restart(key)}
          >
            <span aria-hidden="true">{key === "attention" ? "💜" : "😊"}</span>{" "}
            {upScenarios[key].label}
          </button>
        ))}
      </div>
      <div
        className="up-demo-stage"
        aria-hidden="true"
        data-time={Math.floor(time / 1000)}
      >
        <div className="up-chat">
          <div className="up-chat-header">
            <span className="up-avatar">☕</span>
            <div>
              <strong>קפה לדוגמה</strong>
              <small>WhatsApp · שיחה עם דנה</small>
            </div>
            <span className="up-chat-dots">•••</span>
          </div>
          <div className="up-messages">
            <span className="up-chat-date">היום, אחרי הביקור</span>
            <div className="up-visit">
              ✓ ביקור תועד · הגיע הזמן לשאול איך היה
            </div>
            <div
              className={`up-message up-business ${time >= 2000 ? "shown" : ""}`}
            >
              <p>{upOpening}</p>
              <small>
                12:30 <b>✓✓</b>
              </small>
            </div>
            <div
              className={`up-message up-customer ${time >= 5000 ? "shown" : ""}`}
            >
              <p>{data.customer}</p>
              <small>12:31</small>
            </div>
            {data.responses.map((response, index) => (
              <div
                key={index}
                className={`up-message up-business ${time >= 10000 + index * 2000 ? "shown" : ""}`}
              >
                <p>{response}</p>
                <small>
                  12:31 <b>✓✓</b>
                </small>
              </div>
            ))}
            <div
              className="up-typing"
              style={{
                visibility:
                  time < 2000 || (time >= 8000 && time < 10000)
                    ? "visible"
                    : "hidden",
              }}
            >
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="up-chat-input">
            <span>השיחה ממשיכה באופן אישי</span>
            <span>♡</span>
          </div>
        </div>
        <div className="up-insights">
          <div className="up-insights-heading">
            <UpIcon />
            <span>
              מאחורי השיחה<strong>הבנה שהופכת לפעולה</strong>
            </span>
            <b>AI</b>
          </div>
          <div className={`up-insight ${time >= 8000 ? "shown" : ""}`}>
            <span>01 · AI זיהה</span>
            <strong>{data.interpretation}</strong>
          </div>
          <div className={`up-insight ${time >= 10000 ? "shown" : ""}`}>
            <span>02 · המשך מותאם</span>
            <strong>תגובה אישית ללקוחה</strong>
          </div>
          <div
            className={`up-insight up-outcome ${time >= 13000 ? "shown" : ""}`}
          >
            <span>
              {scenario === "attention"
                ? "03 · דורש תשומת לב"
                : "03 · קשר שמתחזק"}
            </span>
            <strong>
              {scenario === "attention"
                ? "בעל העסק קיבל עדכון"
                : "לקוחה שמרגישה שמקשיבים לה"}
            </strong>
            <p>{data.outcome}</p>
          </div>
        </div>
      </div>
      <div className="up-demo-bottom">
        <span>המחשה של שיחה אוטומטית</span>
        <div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            disabled={complete || reduced}
            aria-label={paused ? "המשך הדגמה" : "השהיית הדגמה"}
          >
            {paused ? "▶ המשך" : "Ⅱ השהיה"}
          </button>
          <button type="button" onClick={() => restart()}>
            ↻ הפעלה מחדש
          </button>
        </div>
      </div>
      <div className="up-progress" aria-hidden="true">
        <span style={{ width: `${time / 150}%` }} />
      </div>
      <details className="up-transcript">
        <summary>לקריאת השיחות המלאות</summary>
        {(Object.keys(upScenarios) as UpScenario[]).map((key) => (
          <section key={key}>
            <h3>{upScenarios[key].label}</h3>
            <p>
              <strong>העסק: </strong>
              {upOpening}
            </p>
            <p>
              <strong>דנה: </strong>
              {upScenarios[key].customer}
            </p>
            <p>
              <strong>AI זיהה: </strong>
              {upScenarios[key].interpretation}
            </p>
            {upScenarios[key].responses.map((response, index) => (
              <p key={index}>
                <strong>העסק: </strong>
                {response}
              </p>
            ))}
            <p>
              <strong>
                {key === "attention" ? "עדכון לבעל העסק: " : "התוצאה: "}
              </strong>
              {upScenarios[key].outcome}
            </p>
          </section>
        ))}
      </details>
    </div>
  );
}
