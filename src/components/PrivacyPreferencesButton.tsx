"use client";

export const PRIVACY_PREFERENCES_EVENT = "viby:open-privacy-preferences";

export function PrivacyPreferencesButton() {
  return (
    <button
      type="button"
      className="privacy-preferences-link"
      aria-haspopup="dialog"
      aria-controls="privacy-preferences"
      onClick={event => window.dispatchEvent(new CustomEvent(PRIVACY_PREFERENCES_EVENT, { detail: event.currentTarget }))}
    >
      העדפות פרטיות
    </button>
  );
}
