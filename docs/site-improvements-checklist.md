# Site Improvements Checklist

A reviewable, batched checklist of recommended improvements for [nishanthrajkumar.me](https://nishanthrajkumar.me). Each item is independent and can be picked up in any order, but the suggested batches at the bottom group items that work best together.

Legend:
- Effort: **L** = trivial / minutes, **M** = moderate / hour-ish, **H** = larger / multi-step
- Impact: **★** = nice-to-have, **★★** = meaningful, **★★★** = page-transforming

---

## A. Information architecture (structure & ordering)

- [x] **A1.** Move `#initiative` (Signature Initiative) to immediately after the Proof Strip — make it the third thing visitors see. _(Effort: M · Impact: ★★★)_
- [x] **A2.** Move `#architecture` (Reference Architecture) to right after the Initiative section, before Experience. _(Effort: L · Impact: ★★)_
- [x] **A3.** Remove `#about` section ("Architecture / Reliability / Acceleration" three-card row) — it duplicates the message of the hero + initiative. _(Effort: L · Impact: ★★)_
- [x] **A4.** Remove `#metrics` section as a standalone block — its numbers duplicate the Proof Strip. _(Effort: L · Impact: ★★)_
- [x] **A5.** Merge `#summary` into the hero (keep one tightened paragraph) and delete the section. _(Effort: L · Impact: ★★)_
- [x] **A6.** Rename `#projects` heading to something like "Sandbox & side work" or "Personal repos" so the framing matches the new note. _(Effort: L · Impact: ★)_
- [x] **A7.** Merge `#credentials` and `#contact` into a single closing section (credentials as small chips, then the contact CTAs). _(Effort: M · Impact: ★)_

### Resulting target order
```
Hero → Proof Strip → Initiative → Architecture → Experience → Sandbox Projects → Credentials + Contact
```

---

## B. Navigation

- [x] **B1.** Slim main nav to 5 items: `Initiative · Architecture · Experience · Projects · Contact`. _(Effort: L · Impact: ★★)_
- [x] **B2.** Ensure removed sections (`#about`, `#summary`, `#metrics`, `#credentials`) have no remaining nav links or in-page anchors. _(Effort: L · Impact: ★)_
- [x] **B3.** Optional: highlight the active section in the nav as the user scrolls (scrollspy). _(Effort: M · Impact: ★)_

---

## C. Content discipline (copy)

- [x] **C1.** Rewrite hero primary CTA: change `Explore Projects` → `See the Initiative` (→ `#initiative`). _(Effort: L · Impact: ★★★)_
- [x] **C2.** Demote `Explore Projects` to a tertiary text link (or remove). _(Effort: L · Impact: ★)_
- [x] **C3.** De-duplicate hero `.lede` vs current `#summary` first paragraph — keep hero, delete the duplicate. _(Effort: L · Impact: ★★)_ _(handled by A5 — `#summary` removed)_
- [x] **C4.** Soften "Strategic Data Engineering Leader" framing — replace with something verifiable like "Data engineer with X years of cloud delivery". _(Effort: L · Impact: ★★)_ _(N/A — phrase no longer present in copy)_
- [x] **C5.** If the About card is kept (not preferred), make each value link to its proof section (Architecture → CDC pattern, Reliability → KQL alerting in timeline, Acceleration → BigQuery SDLC initiative). _(Effort: L · Impact: ★)_ _(N/A — About section removed in A3)_
- [x] **C6.** Inline the "Dirty Fingernail Award" explanation instead of relying on a `title` tooltip (invisible on mobile). _(Effort: L · Impact: ★)_
- [x] **C7.** Rewrite the **Result** line on each project card to be honest about scope — these are personal sandboxes, not production. _(Effort: L · Impact: ★★)_
- [x] **C8.** Consolidate resume/summary download buttons into ONE place (Contact section). Remove the doc-cta-row from the hero. _(Effort: L · Impact: ★)_
- [x] **C9.** Add a short **"Currently building / currently learning"** strip near the bottom (e.g. CI/CD on PR merge for BigQuery; Microsoft Fabric Real-Time Intelligence). _(Effort: L · Impact: ★★)_

---

## D. Initiative section polish

- [x] **D1.** Add a colored **Outcome band** at the top of the Initiative card with the big metric: *"~5 days → 1-2 days · Adopted as the org's reference pattern"*. _(Effort: L · Impact: ★★★)_
- [x] **D2.** Visually de-emphasise the Problem/Approach blocks relative to the Outcome band so Outcome reads first. _(Effort: L · Impact: ★★)_
- [ ] **D3.** Optional: add a small "Read the full standards" link if/when the BigQuery standards doc is published publicly. _(Effort: L · Impact: ★)_ _(Skipped — standards doc is internal/employer property and will not be linked publicly.)_

---

## E. Visual & graphic design

- [x] **E1.** Alternate section backgrounds (`--bg-cream` ↔ `--bg-grad-2`) every other section to break visual monotony. _(Effort: L · Impact: ★★)_
- [x] **E2.** Give the Initiative section a distinct **full-bleed tinted background** (subtle `--accent-2`) so it visually announces itself. _(Effort: L · Impact: ★★)_
- [ ] **E3.** Add **one real screenshot** somewhere — options:
  - sanitized Power BI dashboard
  - repo tree showing the BigQuery export layout
  - terminal/console of the CDC pipeline running
  - annotated change-script PR
  _(Effort: M · Impact: ★★★)_
  > **Skipped** — actual screenshots would expose company-owned process, resources or data.
- [x] **E4.** Reconsider the hero `profile-banner-v3.svg`:
  - replace with an animated mini-terminal typing 2–3 SQL/Python lines, OR
  - a compact "tech stack constellation" of logos, OR
  - remove entirely and let the hero copy go full width.
  _(Effort: M · Impact: ★★)_
- [x] **E5.** Restructure the Proof Strip as **2 anchor stats + 4 secondary stats** instead of 6 equal tiles. _(Effort: L · Impact: ★)_
- [x] **E6.** Add a thin vertical timeline rail with date pills to the Experience section; optionally color-code by employer. _(Effort: M · Impact: ★★)_
- [x] **E7.** Collapse the 3-card Credentials grid into a single horizontal strip: certs as logos, awards as inline pills, "open to" as one line. _(Effort: M · Impact: ★)_
- [x] **E8.** Improve the **Impact Tour** button affordance — add a ▶ icon, or auto-play once when the Proof Strip first scrolls into view. _(Effort: L · Impact: ★★)_
- [x] **E9.** Expand the footer: small social icons, a tiny "last updated" date, link to "Built in plain HTML/CSS/JS — view source". _(Effort: L · Impact: ★)_
- [x] **E10.** Audit the Architecture SVG in dark mode for any unreadable annotation/stage-label colors. _(Effort: L · Impact: ★)_

---

## F. Engagement & hook

- [x] **F1.** Make the CDC Architecture diagram **interactive** — hover a stage → side panel updates with what runs there in production. _(Effort: H · Impact: ★★)_
- [x] **F2.** Add **one pull-quote / testimonial** (manager, peer, even anonymized) somewhere mid-page to break the wall of facts. _(Effort: depends on source · Impact: ★★)_
- [x] **F3.** Add a `last-updated` timestamp to the footer so visitors see the page is alive. _(Effort: L · Impact: ★)_
- [x] **F4.** Optional: add a "What I'd build for your team in week 1" section — concrete, role-specific value statement. _(Effort: M · Impact: ★★)_

---

## G. Tech / hygiene

- [x] **G1.** Confirm `data-experience-since="2022-06"` is consistent everywhere after the summary merge. _(Effort: L · Impact: ★)_
- [x] **G2.** Validate dark-mode contrast on the new spotlight pill and Initiative card border. _(Effort: L · Impact: ★)_
- [x] **G3.** Re-test print stylesheet after structural changes (sections removed/reordered). _(Effort: L · Impact: ★)_
- [x] **G4.** Update `sitemap.xml` if any new section ids are added that you want indexed. _(Effort: L · Impact: ★)_
- [x] **G5.** After restructure, verify the Impact Tour script still binds to whatever stat surface remains. _(Effort: L · Impact: ★)_

---

## Suggested batches (recommended order)

### Batch 1 — Structural reset _(biggest single payoff)_
A1, A2, A3, A4, A5, A6, B1, B2, C1, C2, C3, C8

### Batch 2 — Copy & framing
C4, C5, C6, C7, C9, D1, D2

### Batch 3 — Visual rhythm
E1, E2, E5, E8, E10, G2

### Batch 4 — Differentiating assets
E3, E4, E6, F1, F2

### Batch 5 — Closing polish
A7, E7, E9, F3, F4, G1, G3, G4, G5

---

_Note: This checklist lives in `docs/` and is not linked from the site._
