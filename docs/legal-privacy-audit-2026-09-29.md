# Viby terms, privacy and service-coverage audit

Audit date: 29 September 2026. Branch reviewed: `updating-policies-terms-and-conditions`.

**Result:** The documents provide a useful loyalty-platform foundation, but do not yet form a sufficiently specific commercial and privacy framework for the six services now advertised. The most urgent changes are identifiable contracting parties, evidence of merchant acceptance, a clearly disclosed initial subscription commitment, AI/messaging provisions, and alignment of the setup/sign promises.

This is a source-code and public-document audit with proposed implementation requirements, not a legal opinion or assurance of enforceability. Israeli commercial/privacy counsel should validate the final contract and the actual onboarding process. A website sentence alone cannot guarantee that every business is bound.

## 1. Scope and evidence

Reviewed all 13 terms sections and all 38 privacy sections in `src/lib/legal-content.ts`, the six service descriptions, shared setup/gift component, lead form and lead endpoint, analytics/consent code, WhatsApp visit storage, embedded video, and legal-page rendering.

Public pages retrieved through web research:

- [Terms](https://joinviby.co.il/terms): displayed update **02.07.2026**.
- [Privacy](https://joinviby.co.il/privacy): displayed update **10.08.2026**.
- [Punch cards](https://joinviby.co.il/), [wheel](https://joinviby.co.il/smart-wheel), [wallet](https://joinviby.co.il/digital-wallet), [Viby UP](https://joinviby.co.il/viby-up), [VibyRate](https://joinviby.co.il/viby-rate), [VibyTap](https://joinviby.co.il/viby-tap).

Some web results are cached. Public document dates and reviewed text are consistent with the repository; this was not a byte-for-byte deployment comparison. Direct shell retrieval was unavailable. The public extraction does not reliably show every client-rendered element, so findings about the lead form are supported by source code.

Not inspected: the merchant application/backend, actual customer QR registration, signed sales agreements, Isracard checkout configuration, active production supplier credentials, processor contracts, security procedures, or current GA4 account settings. “Not found in this repository” does **not** mean a document or control cannot exist elsewhere. No real leads, payments, messages, or customer records were created or accessed.

## 2. What is already useful and current

- Terms distinguish merchant responsibilities from Viby’s platform operation; cover authorized users, credentials, intellectual property, acceptable use, fraud and account suspension.
- Punch cards, rewards, prize wheels and Apple/Google Wallet technology are expressly mentioned.
- Subscription billing, renewal, price changes and cancellation are addressed at a general level.
- Privacy covers contact information, loyalty activity, authorized staff, suppliers, security, retention, access/correction requests and minors.
- Privacy §§15–16 specifically describe the marketing website’s **opt-in GA4**, with advertising features disabled and no names, phone numbers or form contents in custom events. This matches the reviewed implementation’s intent.
- VibyRate’s buying guide already says reviews must be genuine, without incentives or filtering. Keep that language and extend the rule to Viby UP.
- Both policies are linked from the website. Their displayed dates are recent, but dates do not establish completeness or legal compliance.

## 3. Coverage of the six tools

“Covered” below means the document addresses the subject, not that all provisions are legally sufficient.

| Service | Existing coverage | Important additions |
| --- | --- | --- |
| Digital punch cards | Strongest coverage: terms §§4–6, privacy §§4–8, Wallet handling | Merchant-specific reward conditions, expiration/change rules, correction of mistakes, customer notice and marketing choices at enrollment, outstanding rewards when the merchant leaves, export/deletion. |
| Smart wheel | Partial: terms §7 expressly mentions prize wheels and §6 covers rewards | Published campaign rules, eligibility, frequency, period, prize quantities/value, redemption restrictions and validity, fraud review, and legal classification of the actual chance mechanism. General software terms are not campaign rules or a lottery permit. |
| Digital wallet / gift cards | Technical Wallet passes covered; **paid balances and gift-card transactions substantially under-specified** | Identify issuer and seller, payment/funds flow, paid value versus promotional bonus, fees, redemption, refund/cancellation, expiry, transferability, lost access, chargebacks and treatment of outstanding balances after termination. |
| Viby UP | Generic messaging language only; no express AI service provisions | AI disclosure, conversation content and inferred sentiment, human access/escalation, customer permission, model providers and training settings, retention, mistakes, prohibited uses, review fairness, usage charges and limits, third-party dependency, no guaranteed reviews/ranking/AI visibility. |
| VibyRate | Generic platform/third-party clauses; no dedicated named product terms | NFC/QR hardware and digital subscription, production/specifications, delivery/defects, Google rules, link changes, no review guarantee, end-of-subscription behavior. |
| VibyTap | Generic links/content clauses; no dedicated named product terms | Hosted link-page scope, authorized destinations, malicious links, ownership/control of URLs, NFC/QR compatibility, physical product conditions, link updates, and subscription termination effects. |

Evidence: `src/lib/legal-content.ts:103`, `:230`, `:265`, `:615`; `src/lib/services.ts:529`, `:717`, `:911`; `src/lib/viby-up.ts`; `src/components/VibyUpLanding.tsx`.

### Service-specific legal/policy checks

**Wheel:** Have counsel review the production mechanic and merchant campaign template before representing that a standing prize wheel is automatically permitted. The Treasury’s general commercial-lottery permit has conditions; a promotional purpose or a prize on every spin does not, by itself, settle classification. [Official commercial-lottery permit](https://www.gov.il/BlobFolder/policy/lotteries_permission/he/Policies_Files_lotteriespermission_instructions.pdf).

**Wallet:** A loyalty pass, a gift voucher, a discounted purchase voucher and a stored-value/payment service are not interchangeable legal categories. Establish who receives and holds funds and whether value is usable at one merchant or many. Counsel should check applicable voucher, payment-service and consumer rules against that flow. Do not let merchants choose arbitrary expiry periods or erase purchased balances because their Viby subscription ends. The regulator distinguishes voucher categories and their consequences. [Consumer Protection Authority guidance](https://www.gov.il/BlobFolder/dynamiccollectorresultitem/cpfta_mem29/he/docs_cpfta_S20150044950.pdf). This audit does not conclude that Viby needs, or is exempt from, a financial-services licence.

**Google reviews:** Google prohibits incentives and selectively soliciting positive reviews. `src/lib/viby-up.ts:2` gives the happy scenario a Google invitation while the attention scenario only escalates to the owner. That is a **demo-level indication of a review-gating risk**, not proof of the production engine. Offer a neutral review opportunity independent of sentiment, alongside complaint handling; do not suppress dissatisfied customers’ ability to review. Add the restriction to merchant terms and product behavior. [Google Maps contribution policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en).

**WhatsApp:** Possession of a number or a past purchase is not sufficient permission by itself. The current WhatsApp policy requires opt-in and honoring opt-out. Business Platform initiation/template rules and human escalation for automation also matter. Confirm whether production uses the official Business Platform and which supplier/terms apply; the marketing lead-alert code’s Green API option is not proof of the UP architecture. [WhatsApp Business Messaging Policy, updated 23 September 2026](https://business.whatsapp.com/policy).

## 4. Main findings, ordered by priority

| ID | Priority | Finding | Required change |
| --- | --- | --- | --- |
| C1 | Before rollout | “Viby” is a brand, with no clear registered contracting entity or dedicated legal/privacy contact in the documents. | Insert actual legal name, company/sole-trader identifier, service address and working contact details. Do not invent a company suffix or privacy inbox. |
| C2 | Before rollout | Terms §1 treats use/QR scanning as acceptance. No merchant agreement acceptance record is implemented in this repository. | Give terms and order details before commitment; capture authorized acceptance and preserve the accepted version. |
| C3 | Before rollout | No three-month subscription minimum in terms §8. Gift condition is not equivalent. | Add an initial-term provision, start/end dates, minimum price and cancellation mechanics to terms **and** actual sales/checkout documents. |
| C4 | Before rollout | Setup, gift and physical-product prices conflict. | Reconcile every affected landing page, FAQ, lead form, offer and contract. |
| C5 | Before rollout | AI conversations, customer profiling and review-routing lack specific contractual/privacy treatment. | Add UP service schedule, disclosures, permissions, model-provider facts and neutral review flow. |
| P1 | High | Privacy does not clearly allocate controller/processor roles. | Map actual decisions by purpose; add a merchant data-processing/security agreement. |
| P2 | High | Generic suppliers/privacy statements do not explain the actual website lead flow. | Verify active channels, retention and recipients; update notices and restrict unnecessary lead copying. |
| P3 | High | Collection notice is incomplete; no identifiable controller in current text. | Layered notice at each collection point, including the lead form and customer enrollment. |
| P4 | High | Privacy §9 uses a GDPR-style “legitimate interest” basis without explaining jurisdiction or Israeli authorization. | Rewrite around the actual applicable law and purposes; do not present it as blanket permission for new uses. |
| P5 | High | Foreign transfers, retention and rights are too generic to demonstrate implementation. | Supplier/transfer assessment, concrete retention schedule, workable rights process and documented security controls. |
| P6 | High | GA4 permission does not control Vimeo; no persistent preferences control is visible in source. | Separate essential features from optional measurement, review embeds, add preference withdrawal/reopening. |
| C6 | High | Wallet/campaign/hardware-specific conditions missing. | Service annexes and merchant/customer-facing rules. |
| C7 | Medium | Broad changes, refund exclusions, indemnity and venue provisions need proportionality review. | Rewrite for B2B scope, non-waivable rights, reasonable notice/remedies and actual service obligations. |
| E1 | Medium | Repeated sections and misplaced lists reduce comprehensibility. | Structured, shorter sections, semantic lists, reliable version history and accessible acceptance UI. |

## 5. Making business acceptance reliable

### Current position

Terms §1 already states that use constitutes acceptance and that a representative has authority. That language is helpful evidence only in context; its presence does not establish that every merchant saw, understood or accepted a new financial commitment. Israeli contract law recognizes offer and acceptance, including conduct in appropriate circumstances. Clear prior disclosure and an affirmative acceptance record are the recommended implementation here. [Contracts (General Part) Law — Knesset legislative record](https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawBill.aspx?lawitemid=147391&t=LawReshumot).

The website lead form says Viby may contact the person by phone/WhatsApp about the service and links privacy. Its request contains name, phone, a honeypot and optional challenge token. It has **no terms version, order identifier, acceptance or representative-authority field**. It requests a later Isracard payment link. It should remain a request for contact, not silently create a paid three-month contract.

Evidence: `src/components/PunchCardLeadSection.tsx:135`, `:254`; `src/app/api/punch-card-lead/route.ts:6`.

### Recommended actual enrollment sequence

1. Show the business an order summary: legal supplier and merchant, selected service(s)/branches, price, VAT treatment, minimum total, start/end of initial term, renewal, cancellation, gift specification and any approved extras.
2. Provide accessible links/downloads for the applicable terms and service schedule; identify their version. Make minimum duration conspicuous near the action, not hidden in the privacy policy.
3. Obtain affirmative acceptance by the authorized merchant representative. An unchecked checkbox plus clear action is a good implementation; an appropriately recorded signature or explicit WhatsApp/email acceptance of an identified order can also be assessed by counsel. A qualified electronic signature is not assumed necessary for every ordinary subscription.
4. Validate acceptance on the server, bound to that exact order/version. Do not trust a browser-only checkbox, sales-person checkbox, GA event or localStorage record.
5. Preserve the order snapshot, accepted text/version/hash, business and representative identity, authority declaration, server timestamp and channel. Collect IP/device evidence only if proportionate, disclosed and retained under a defined policy; no routine identity-document upload is recommended.
6. Provide a durable confirmation and copy to the merchant; link payment authorization and activation to the accepted order. Record the actual ready-for-use date and initial-term end.
7. Staff users join under merchant authorization and applicable use rules; do not make every employee personally liable for the merchant’s subscription.
8. For existing accounts, inspect their accepted agreement. Obtain an express amendment where introducing a new minimum. Do not reset a minimum merely because terms were posted or a merchant continued using the site.

These are implementation recommendations to strengthen evidence; a checkbox does not cure unfair, unlawful or contradictory terms. Standard-form provisions can be challenged even when signed. [Ministry of Justice explanation of standard contracts](https://www.gov.il/he/pages/standard-contracts?chapterIndex=1).

**Current-law point:** Amendment 3 to the Contracts (General Part) Law was published on 7 January 2026 and changes interpretation rules, with express treatment of standard contracts and unrepresented parties. Do not assume Viby's small-business standard terms receive the same interpretation treatment as a negotiated commercial contract merely because customers are businesses. Counsel should account for the amendment when reviewing the entire-agreement/interpretation clauses and renewals. It does not substitute for acceptance or authorize retroactive charges. [Enacted amendment](https://fs.knesset.gov.il/25/law/25_lsr_10622519.pdf), [Knesset legislative explanation](https://main.knesset.gov.il/Activity/Legislation/Laws/pages/lawbill.aspx?lawitemid=2214242&t=lawsuggestionssearch).

## 6. Three-month minimum: proposed commercial model

The user requested a minimum for every new business because Viby incurs setup/sign costs. Recommended drafting assumptions, **not yet confirmed business facts**:

| Question | Proposed treatment |
| --- | --- |
| Scope | New paid merchant subscriptions across all six tools, including Rate/Tap digital subscriptions; one-time extras governed by their own order. |
| Duration | Three consecutive monthly service periods, with actual start/end shown in confirmation. Avoid ambiguously switching between “three months” and “90 days.” |
| Start | When the ordered digital service is available for the merchant’s use and activation is notified, subject to an expressly agreed order. Not the first website visit or lead inquiry. |
| Billing | Monthly during the initial term, if that is the selected commercial model; show total commitment before acceptance. |
| Early cancellation request | May be submitted at any time; ordinarily stops renewal at the end of the initial term while service remains available and agreed monthly billing continues. Preserve remedies for non-delivery/material breach and mandatory rights. |
| After initial term | Monthly continuation, cancellable at the end of the current paid period; no new three-month term without explicit agreement. |
| Additional tool/branch | Quote expressly; no silent restart of the whole business’s minimum. |
| Gift | Included as specified in the order. Prefer no separate retrospective “gift charge” on top of all initial-term fees. |
| Existing merchants | No retrospective charge or new minimum without an agreed amendment. |

The current site advertises punch cards from **₪79/month** and wheel/wallet/Rate/Tap digital services from **₪49/month**; UP is quoted individually. At those unchanged rates, three periods are **₪237** or **₪147** respectively. These are arithmetic examples, not final VAT-inclusive offers: VAT, discounts, branches, usage charges and extras still need confirmation.

There is no finding here that a three-month B2B minimum is categorically prohibited. Equally, startup costs do not automatically make every collection clause enforceable. Avoid an undefined penalty, collecting all remaining fees plus an arbitrary sign value, or a blanket “no cancellation for any reason.” Courts can scrutinize disproportionate agreed compensation and standard-form remedies. [Official published legal position discussing compensation and unfair terms](https://www.gov.il/BlobFolder/dynamiccollectorresultitem/45354-02-18/he/45354-02-18.pdf).

B2B acquisition and consumer transactions must be separated. A merchant buying software for business purposes is different from that merchant’s customer buying a gift voucher. Applicable consumer cancellation and other mandatory rights cannot be removed by calling everyone a “business user.” [Consumer Protection Authority discussion of the consumer definition](https://www.gov.il/BlobFolder/news/cpfta_asakimnov2020/he/docs_legal_%D7%A7%D7%95%D7%9C%20%D7%A7%D7%95%D7%A8%D7%90-%20%D7%94%D7%97%D7%9C%D7%AA%20%D7%94%D7%92%D7%A0%D7%95%D7%AA%20%D7%A6%D7%A8%D7%9B%D7%A0%D7%99%D7%95%D7%AA%20%D7%A2%D7%9C%20%D7%A2%D7%95%D7%A1%D7%A7%20%D7%A7%D7%98%D7%9F%20%D7%9E%D7%90%D7%93%2018.11.20.pdf). That source is a consultation document, not proof that its proposed extension became law.

## 7. Setup and sign offer: reconcile the website

| Existing promise | Evidence | Change needed |
| --- | --- | --- |
| Digital activation by the next business day after receipt of information/logo/settings | `src/lib/services.ts:128` and related FAQs | Choose one service-level promise or explicitly distinguish digital activation from sign manufacture/delivery. |
| Full setup within up to three business days, delivered ready | `src/components/SetupGiftSection.tsx` | State clock trigger and what completion includes. Define business days and any delivery scope; avoid hidden exceptions that defeat the headline. |
| Business need not do anything | Shared gift section | Explain in one short visible line that merchant details, permissions and design approval are still needed. Viby performs configuration/production. |
| Sign is a gift, conditioned on three months’ use | `SetupGiftSection.tsx:116` | Explain eligibility, included quantity/type, delivery and extras; distinguish paid commitment from actual usage frequency. |
| Physical production/quantity/cost/shipping agreed separately | Rate/Tap buying guides and FAQs | Specify what is included free and what is an optional paid extra. An “entirely free” sign and unspecified manufacturing charge should not coexist. |
| Monthly price only | Price strips and lead offer | Display minimum duration beside price/CTA, then actual minimum total in the order. State VAT treatment. |

Terms should also address approved artwork, brand permissions, proof approval, manufacturing defects/reprints, damage on arrival, replacement of lost signs and whether printed QR/NFC destinations remain functional after cancellation. Do not disclaim responsibility for producing the wrong approved design.

## 8. Privacy: concrete data map and gaps

### Website data flows visible in code

| Flow | Data and destination | Finding/action |
| --- | --- | --- |
| Lead form | Name, normalized phone, submission time; API can send to Gmail recipients, Telegram chats and Green API WhatsApp recipients | All configured channels are attempted, not merely a fallback after email fails. Confirm enabled channels/recipients. Minimize distribution, secure recipient access, document retention/deletion in each copy. Do not publish recipient personal addresses. |
| Anti-abuse | Request IP used in an in-memory rate-limit map; IP and token sent to Cloudflare verification if configured | Ten-minute attempt filtering is not a ten-minute deletion policy: inactive map keys are not explicitly swept. Set cleanup/bounds and accurately describe transient security processing. |
| GA4 | Page/service, chooser, contact and exposure events after grant | Preserve opt-in and omission of form values/full WhatsApp destination. GA/browser identifiers can still be personal information; “no names/phone numbers” does not mean anonymous. |
| Consent preference | `localStorage` key `viby-analytics-consent` | No timestamp/version/expiry; retained until clearing browser data. Add a visible preferences control and decide documented lifetime/version changes. Contract acceptance must be stored separately. |
| WhatsApp widget | `sessionStorage` key `viby-whatsapp-visit-v1`: visit start, read state, exposure flag | Explain functional visit storage. Preview is local UI; no chat text is transmitted to WhatsApp merely by opening it in this component. Clicking opens the external service. |
| Vimeo | Direct iframe in service demo and how-it-works page; no consent condition or `dnt` parameter in reviewed URLs | Third-party requests are separate from GA4 permission. Review actual network/cookies and use a disclosed, appropriately controlled embed. |
| Form security script | Cloudflare Turnstile when public site key exists | Confirm deployment configuration and provider notice. Do not classify it as marketing analytics by default. |
| Remote image | Isracard logo from Wikimedia, `unoptimized` | Browser may contact another host. Prefer locally served approved artwork; maintain licence/attribution requirements. |
| Product platform | Customer identities, rewards, balances, messages, sentiment, staff actions | Advertised capabilities only; actual schemas, providers and retention require a separate backend inventory. |

Evidence: `src/app/api/punch-card-lead/route.ts:44`, `:77`, `:106`, `:176`, `:219`, `:337`; `src/components/AnalyticsConsent.tsx`; `src/lib/analytics.ts`; `src/lib/whatsapp-visit.ts`; `src/components/MultiServiceLanding.tsx:1425`; `src/app/how-it-works/page.tsx:58`; `src/components/PunchCardLeadSection.tsx:271`.

Vimeo documents a DNT option to limit session tracking, with essential-cookie exceptions. Adding it is not equivalent to blocking every request or resolving every consent question. [Vimeo player parameters](https://help.vimeo.com/hc/en-us/articles/12426260232977-About-Player-Parameters).

### Controller identity and collection notices

Privacy §2 describes a SaaS platform but not the actual legal controller. Current section 11 notice requirements include whether disclosure is required/voluntary and consequences, purposes, controller identity/contact, recipients/purposes, and access/correction rights. Provide this at collection through a clear layered notice, not only a remote generic policy. [PPA controller duties](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

For the website lead form, explain voluntary submission, inability to arrange callback without contact details, handling by Viby and its actual service providers, and the privacy contact. For customer QR/UP flows, identify the relevant merchant and Viby’s role. A privacy notice is not a blanket waiver, marketing consent or subscription acceptance.

### Roles and merchant data-processing agreement

Provisional role map: Viby likely determines website sales/account-billing/support purposes; merchants likely determine their own loyalty/customer-contact purposes; Viby may process those data on instructions. If Viby independently combines customer activity across merchants, chooses AI-training purposes or profiles for its own purposes, the allocation changes. The real decisions determine roles, not a “technology provider only” label. Amendment 13 updates the controller framework. [PPA Amendment 13 FAQ](https://www.gov.il/he/pages/tikun13_qa?chapterIndex=6).

No dedicated merchant data-processing/security annex was found. Prepare one addressing subject matter, permitted purposes/data/access, instructions, confidentiality, security, subprocessors, breach cooperation, requests, return/deletion and oversight. Apply the outsourcing assessment to Viby’s own providers too. Public privacy text does not replace this operational agreement. [PPA regulation 15 guide updated following Amendment 13](https://www.gov.il/BlobFolder/reports/guide_section_15/he/Takna15%20_Tikon13.pdf).

### AI and messaging

Disclose message content, summaries and inferred customer sentiment; who can see them; model/provider destinations; retention; human intervention; and actual training settings. Do not publish “never used for training” until provider contracts/settings and Viby’s own practices establish it. Avoid collecting health or other sensitive details by default, especially as services are marketed to clinics/wellness businesses.

Privacy §9’s generic legitimate-interest wording should not be used as an unrestricted Israeli-law basis. Match purposes to valid authorization/consent or applicable statutory grounds. The PPA explains that unrelated reuse without consent or legal authority can violate purpose limitations. [PPA privacy assessment tool](https://mojforms.justice.gov.il/mojaemprivacyprotectionauthority/dpiaform.html).

Separate requested service messages from advertising. Enrollment, scanning a QR or accepting the subscription terms should not silently opt customers into campaigns. Keep opt-in evidence and a functioning suppression process. Section 30A regulates advertising messages, with limited exceptions that must be assessed rather than assumed; B2B status is not blanket permission. [Enacted section 30A amendment](https://fs.knesset.gov.il/17/law/17_lsr_299991.pdf). Recheck the current consolidated law for the actual channel/use case before launch.

The PPA AI document located in this research is explicitly a **draft**, not a newly enacted AI law. Existing privacy duties still matter; use a privacy-impact assessment to test UP’s actual risks. [PPA AI draft](https://www.gov.il/BlobFolder/rfp/ai_reg/he/ai_regu_draft.pdf).

### Retention, rights and international transfers

- Replace repeated “reasonable time/as needed” promises with an approved internal schedule and a usable public summary: unconverted leads, merchant billing/acceptance evidence, customer activity, AI transcripts versus summaries, opt-out records, security logs and backups. Do not invent periods before checking operational and statutory requirements.
- Privacy §32 should clearly explain applicable access and correction rights. Merely supplying categories of information may not satisfy an access request to personal data itself. Qualify deletion accurately; do not promise universal GDPR-style erasure/portability rights or treat statutory correction/deletion rights as entirely discretionary.
- Give a concrete request route, verification process, responsible team and applicable response deadlines. Delete/limit copies in email/chat providers as well as the database where required; avoid demanding excessive identity evidence.
- Inventory overseas destinations and the applicable transfer mechanism and written recipient commitments. Privacy §12’s “reasonable measures” is not operational proof. The PPA explains the agreement-based transfer route and necessary adaptations. [PPA article 2(4) transfer opinion](https://www.gov.il/en/pages/article-2-4). The English page appears to omit “not” in its opening comparison; rely on the actual regulations/Hebrew legal text when finalizing.
- Check whether EEA-origin data rules apply to any covered database, even if the business is Israeli; do not equate those rules with all GDPR obligations. [PPA EEA-data guidance](https://www.gov.il/he/pages/europe_transfer?chapterIndex=6).

### Security and governance: cannot be certified from this site

Confirm database/security classification, documented access controls and tenant isolation, staff permissions, encryption, incident response, backups, vendor oversight and deletion. In particular, the policy promises one merchant cannot access another merchant’s customer activity; this requires backend evidence.

Assess DPO, registration and notification obligations using actual scale/purposes/sensitive-data categories. Do not assume every SaaS must register or appoint a DPO, or that lack of registration exempts it from security duties. The PPA flags large-scale systematic monitoring as a DPO consideration. [PPA assessment tool](https://mojforms.justice.gov.il/mojaemprivacyprotectionauthority/dpiaform.html). Special-sensitivity information concerning more than 100,000 people can trigger notification requirements under the relevant conditions. [PPA notification service](https://www.gov.il/he/service/notice-obligation).

### Analytics verification boundary

`docs/analytics-refresh.md` records a **25 September** account check with Enhanced Measurement off and DebugView acceptance outstanding. This audit confirms source-level consent/payload design, not current account settings or reporting ingestion. Recheck automatic outbound URLs/referrers and data retention/sharing in GA4 before making absolute public assurances. Keep contract/marketing consent evidence out of GA4.

## 9. Complete section disposition

### Terms — all 13 sections

| Section | Disposition |
| --- | --- |
| 1 Introduction | Update identity, named services, audience separation and acceptance/versioning; narrow automatic amendment mechanism. |
| 2 Accounts | Retain core controls; distinguish merchant liability from staff, define access removal and security cooperation. |
| 3 Platform | Add physical setup and AI scope; avoid calling all operations “technology only”; protect paid core functionality against arbitrary removal. Repair misplaced update/availability lists. |
| 4 Merchants | Retain authorized content and merchant responsibilities; add mutual data duties, messaging permissions and service-specific restrictions. |
| 5 Customers | Separate end-user terms; preserve paid-value/consumer rights and direct platform privacy/support routes. |
| 6 Loyalty/rewards | Retain; add merchant program rules, expiry/change transparency, handling mistakes and merchant exit. |
| 7 Games | Retain anti-fraud rules; add campaign schedule and legal eligibility/classification review. Correct broken XP punctuation. |
| 8 Subscriptions | Substantial rewrite: initial minimum, price/VAT, billing/start, renewal/cancellation, extras, gift, default and remedies. |
| 9 IP | Retain ownership; extend limited permission to artwork/printing. Customer-logo/testimonial use in public marketing needs an appropriate separate permission, not assumed from operational licence. |
| 10 Prohibited use | Retain; add spam, fake/incentivized/gated reviews, unlawful campaigns and malicious links/AI misuse. |
| 11 Liability | Counsel review: proportional merchant indemnity, claim-handling process, own-fault exceptions, actual scope of direct liability and mandatory rights. Do not simply add a sweeping disclaimer. |
| 12 Termination | Add notice/remedy where appropriate, billing end, export, customer balances/rewards and printed-link treatment. Repair misplaced survival list. |
| 13 General | Identify actual party/contact; review venue, assignment, change notice and hierarchy of order/service annex/DPA/master terms. Keep archives. |

### Privacy — all 38 sections

| Sections | Disposition |
| --- | --- |
| 1–3 Intro/who/scope | Identify controller and purposes/audiences; add UP/reviews/NFC and remove blanket implication that use consents to all processing. |
| 4–6 Data/merchants/customers | Map actual fields/sources; add message content, inferences and paid-balance transactions where real. Remove capabilities not actually used. |
| 7 Wallet | Retain; distinguish pass provision from payment/financial processing and third-party roles. |
| 8 Purposes | Reorganize misplaced lists; specific website/merchant/customer/AI purposes and separate optional uses. |
| 9 Processing basis | Rewrite with jurisdiction-specific authorization; no generic legitimate-interest override. |
| 10–11 Sharing/suppliers | Consolidate and name or clearly describe real provider categories/roles; qualify promises that all recipients act only on Viby instructions. |
| 12 Foreign transfers | Support with actual destination/mechanism/contract inventory. |
| 13–14 Statistics/no sale | Retain if operationally true; pseudonymization is not anonymization. Verify independent advertising/training uses. |
| 15–16 Storage/analytics | Keep GA consent facts; add widget storage, practical settings control, embeddings and actual retention. |
| 17–18 Messaging/preferences | Separate service and advertising purposes; implement permission/opt-out across merchant/UP flows. |
| 19 Security | Match actual controls; replace vague encryption qualification with commitments the system can meet. |
| 20 Account responsibility | Avoid automatic liability for every unauthorized act before notification; account for Viby failures. |
| 21 Fraud | Specify proportionate flags, review/escalation and necessary retention. |
| 22 Availability | Mainly a terms topic; shorten or cross-reference. |
| 23 Incidents | Keep statutory duties; support with operational escalation/notification and merchant cooperation. |
| 24 Improvement | Retain briefly; internal technical changes do not authorize new purposes. |
| 25–28 Retention/deletion/closure/backups | Consolidate around actual periods/criteria, production/provider copies, archive exceptions and backup lifecycle. |
| 29 Anonymization | Retain subject to real de-identification; do not call GA/hashed customer records anonymous automatically. |
| 30–31 Merchant/customer deletion | Define role-based instructions and lawful exceptions; technical inconvenience is not a blanket refusal ground. |
| 32 Rights | Explicit rights, contact and operational handling; accurate limits on deletion. |
| 33 Minors | Establish product-specific age/authority rules, especially wheel/marketing; generic “not intended for minors” is insufficient evidence. |
| 34 External services | Retain, but distinguish external destinations from processors chosen by Viby. |
| 35 Business transfer | Keep continuity safeguards; remove implication that an investment alone justifies unrestricted disclosure. |
| 36 Changes | Material notices and fresh permission where required; publication does not legalize unrelated reuse. |
| 37 Contact | Actual controller/privacy contact, not a circular referral to unspecified website details. |
| 38 General | Simplify; privacy notice should explain processing, not read as a waiver of statutory rights. |

`LegalDocumentPage.tsx` guesses subheadings from string length. Replace this when editing the documents with explicit headings/lists so a legally important qualification cannot accidentally become a heading or be grouped under the wrong topic. Add readable print/download access and stable version identification. Do not substitute summaries for the full order/terms at acceptance.

## 10. Recommended document set and rollout

1. **Merchant terms:** subscription, setup, payment, duration, cancellation and responsibilities.
2. **Order/service schedule:** exact selected tools/branches, price/total/VAT, dates, allowances and included physical product.
3. **Service annexes:** loyalty/wheel, wallet, UP, Rate/Tap as relevant.
4. **Merchant data-processing/security annex:** operational duties and provider oversight.
5. **Public privacy notice and collection notices:** marketing website and product audiences clearly distinguished.
6. **End-customer rules:** merchant-specific loyalty/campaign/voucher terms and optional marketing consent at the actual customer flow.

These can share one coherent document system; six separate duplicated sets of generic terms are unnecessary.

Implementation order: confirm commercial/provider facts → counsel review of concrete drafts → implement acceptance and notices in the actual ordering system → align all pricing/gift/FAQ copy → publish versioned documents and communicate applicable changes → obtain any required existing-merchant amendments → verify evidence and behavior.

### Acceptance checks before calling the work complete

- Every paid sales channel exposes the same minimum, price/VAT and order; no representative bypass of acceptance.
- Server rejects order acceptance with missing/stale version; payment confirmation is tied to the accepted order.
- Merchant receives an immutable copy; activation date and initial end are recorded; mid-month/calendar edges are tested.
- Cancellation during the initial term, after it, non-delivery and material breach behave as disclosed; no surprise term reset or double gift recovery.
- Imported customer lists require lawful permissions; opt-out suppresses further marketing; QR enrollment does not bundle it invisibly.
- UP discloses automation, offers escalation and does not gate reviews; provider training/retention settings match text.
- Privacy requests reach a monitored channel and apply across actual storage providers; access tests establish merchant separation.
- Rejecting GA4 consent blocks GA; preference withdrawal works; Vimeo and other external requests are separately checked.
- All six pages, lead form, quote/payment flow, FAQs and gift offer agree; readable mobile/keyboard access is preserved.

## 11. Facts needed to finalize

- Registered supplier name, identifier, address and monitored legal/privacy contact.
- Existing merchant agreement and the real sales/Isracard acceptance flow.
- Confirm scope of minimum across digital subscriptions; treatment of existing accounts, additions and one-time extras.
- Billing start, monthly versus upfront billing, VAT, cancellation channel/cutoff and exceptions.
- Included sign quantity/material/size, shipping territory/cost, approval process and what the three-business-day promise covers.
- Active hosting/database/AI/messaging/payment providers, processing countries, model-training settings and retention.
- Whether UP currently sends review invitations conditional on sentiment; actual template/opt-in/escalation implementation.
- Wallet issuer/funds flow and wheel mechanics/rules.
- Business geography, customer geography/ages, database scale, security classification and existing privacy governance.

Proposed Hebrew additions and acceptance wording are in [the companion draft](./legal-commercial-clauses-draft-he.md). They are not published terms. No production legal pages or business charging behavior were changed by this audit.

Research note: some government pages/PDFs returned access errors on direct opening. Relevant official indexed excerpts and accessible official/platform pages were used; links are provided for counsel to verify against current consolidated texts. Draft guidance and consultations are identified as such. This audit does not certify that every statutory amendment or external service setting has been exhaustively verified.
