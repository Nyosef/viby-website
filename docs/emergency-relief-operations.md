# Emergency relief: outstanding operating requirements

The website publishes the terms and privacy notice. At the owner's direction, the 19 October 2026 emergency relief wording is being published before these checks are complete. This repository has no merchant activity, Home Front Command feed, subscription ledger, or account export service. The following merchant-system and legal checks remain outstanding and should be completed promptly; their publication status must not be mistaken for implementation status.

**Verified gap:** The neighboring Viby merchant repository's `docs/analytics/universal-customer-activity-source-map.md` records a **STOP** decision: completed tool actions are persisted in separate collections, while successful staff QR resolution and several customer access paths do not emit a universal activity record. Its `docs/business-tools-audit.md` also notes that entitlement metadata alone does not establish automatic billing or expiry. These findings contradict an assumption that current merchant data already supports the cross-service automatic route. Build and verify the shared visit signal and billing workflow, or revise the published policy to match what Viby can operate.

## Geography and eligibility

- Maintain a dated mapping with `instruction_area_id`, official source and capture time, `locality_id`, locality name, administrative district, instruction effective start/end, and whether the instruction materially restricts ordinary business activity. Review each official instruction change. Keep the source snapshot used for each decision. Home Front Command areas and administrative districts are distinct.
- Local route: an affected branch is in a locality with a current, material business-activity restriction. National route: at least two different restricted instruction areas each contain a locality in the Tel Aviv or Central administrative district; a materially disrupted branch elsewhere in Israel may then qualify.
- Record for each decision the branch, geographic route, restriction interval, business-impact evidence, discount start/end, reviewer or automated rule, and any reconsideration. A nationwide emergency declaration without qualifying activity restrictions does not activate relief.
- A demonstrable forced closure receives provisional relief from the affected date or the policy effective date, whichever is later. Review after seven days; do not claw back provisional days if it fails a later review. Provide a support route for reduced hours, closures, sparse data, and correction requests.

## Customer activity and charges

- Use merchant-platform customer interactions, not marketing-site GA4. Count each validated visit once across scans and redemptions; exclude test, staff, failed, and duplicate events. Confirm the platform can identify a visit consistently for all covered services. If it cannot, route that service to documented manual review rather than claiming an automatic comparison.
- Compare each full seven-day period with the average of the four seven-day periods immediately before the relevant restrictions started, using Israel time. At least 20 baseline interactions are needed for the automatic route. A drop of at least 30% plus a material disruption qualifies; an open-as-usual business does not qualify on a metric drop alone.
- Apply 50% to the affected branch's agreed recurring standard-service fee and 70% to its agreed recurring premium-service fee. For a shared fee, use the order's branch allocation or equal shares if absent. Do not stack relief onto an already lower promotional price; charge the lower resulting amount. Exclude only separately billed usage, AI, messaging, third-party, shipping, physical product, and one-time charges.
- Credit eligible days already billed since the new effective date by days in that billing period. Discounted payments count toward the existing three-month minimum; they do not pause or shorten it. Give notice of the previously agreed fee before the next charge when relief ends.

## Review and release

- Confirm the 70% premium reduction is sustainable after included AI, messaging, hosting, and support costs. If the economics or invoice split cannot be honored, revise the published promise and notify affected businesses appropriately.
- Confirm export can provide usable available business data before closure, and that support can complete a timely request even after the service ends. Do not promise an account freeze or later restoration.
- Have an Israeli commercial lawyer review the Hebrew terms, privacy disclosure, existing-contract application, discretionary decisions, and cancellation wording.
- Confirm the actual publication date and change `src/lib/legal-release.ts` if publication occurs after 19 October 2026. Record completion of each check with evidence; do not treat publication as evidence that the merchant workflow or legal review has been completed.
