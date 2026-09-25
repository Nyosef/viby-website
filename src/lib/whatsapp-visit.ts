export const WHATSAPP_VISIT_KEY = "viby-whatsapp-visit-v1";
export const WIDGET_DELAY = 4_000;
export const BADGE_DELAY = 50_000;
export const HOVER_DELAY = 1_500;

type Visit = { startedAt: number; read: boolean; exposureTracked: boolean };
let memoryVisit: Visit | undefined;

export function getWhatsAppVisit(): Visit {
  if (memoryVisit) return memoryVisit;
  try {
    const saved = JSON.parse(
      sessionStorage.getItem(WHATSAPP_VISIT_KEY) ?? "null",
    );
    if (
      saved &&
      Number.isFinite(saved.startedAt) &&
      saved.startedAt > 0 &&
      saved.startedAt <= Date.now()
    ) {
      memoryVisit = {
        startedAt: saved.startedAt,
        read: saved.read === true,
        exposureTracked: saved.exposureTracked === true,
      };
    }
  } catch {
    /* Storage may be blocked or contain old/corrupt data. */
  }
  memoryVisit ??= {
    startedAt: performance.timeOrigin || Date.now(),
    read: false,
    exposureTracked: false,
  };
  saveWhatsAppVisit();
  return memoryVisit;
}

export function saveWhatsAppVisit(
  update: Partial<Omit<Visit, "startedAt">> = {},
) {
  if (!memoryVisit) return;
  Object.assign(memoryVisit, update);
  try {
    sessionStorage.setItem(WHATSAPP_VISIT_KEY, JSON.stringify(memoryVisit));
  } catch {
    /* In-memory visit remains functional. */
  }
}
