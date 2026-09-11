"use client";

import { useEffect, useRef, useState } from "react";
import { upOpening, upScenarios, type UpScenario } from "@/lib/viby-up";

const scenarioOrder: UpScenario[] = ["happy", "attention"];

export function UpConversation() {
  const root = useRef<HTMLDivElement>(null);
  const [selectedScenario, setSelectedScenario] = useState<UpScenario>("happy");
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  // One guided pass: 15s happy + 5s reading time, then 15s attention.
  // Manual selection/replay opts out; reduced motion never auto-advances.
  const guided = autoAdvance && selectedScenario === "happy";
  const advanced = guided && !reduced && elapsed >= 20000;
  const scenario = advanced ? "attention" : selectedScenario;
  const data = upScenarios[scenario];
  const time = reduced ? 15000 : Math.min(15000, elapsed - (advanced ? 20000 : 0));
  const duration = guided ? 35000 : 15000;
  const complete = reduced || elapsed >= duration;
  const hintAttention = guided && !reduced && elapsed >= 19000 && elapsed < 20000;

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
      setElapsed((value) => Math.min(duration, value + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [paused, visible, tabVisible, reduced, complete, duration]);

  function restart(next = scenario) {
    setSelectedScenario(next);
    setAutoAdvance(false);
    setElapsed(0);
    setPaused(false);
  }

  return (
    <div
      className="up-demo"
      ref={root}
      data-paused={paused || !visible || !tabVisible || complete}
    >
      <div className="up-scenarios" role="group" aria-label="בחירת תרחיש הדגמה">
        {scenarioOrder.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={scenario === key}
            className={key === "attention" && hintAttention ? "up-scenario-next" : undefined}
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
          </div>
          <div className="up-messages">
            <div className="up-visit">
              אחרי הביקור בעסק
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
                {scenario === "happy" && index === 1 ? (
                  <span className="up-review-link" title="קישור להמחשה בלבד">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z" />
                      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z" />
                      <path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z" />
                      <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z" />
                    </svg>
                    <span>כתיבת ביקורת ב־Google</span>
                  </span>
                ) : null}
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
        </div>
        <div className="up-insights">
          <div className={`up-insight ${time >= 8000 ? "shown" : ""}`}>
            <span>AI זיהה</span>
            <strong>
              {scenario === "happy" ? <span aria-hidden="true">✅ </span> : null}
              {data.interpretation}
            </strong>
          </div>
          <div
            className={`up-insight up-outcome ${time >= 13000 ? "shown" : ""}`}
          >
            <strong>
              {scenario === "attention"
                ? "בעל העסק קיבל עדכון"
                : "לקוחה שמרגישה שמקשיבים לה"}
            </strong>
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
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          </button>
          <button type="button" onClick={() => restart()} aria-label="הפעלה מחדש" title="הפעלה מחדש">
            <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
      <details className="up-transcript">
        <summary>לקריאת השיחות המלאות</summary>
        {scenarioOrder.map((key) => (
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
