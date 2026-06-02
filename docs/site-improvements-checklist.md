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

---

## Round 2 — Engineering, SEO & Performance

_Post-structural review (June 2026). The A–G items above addressed information architecture, copy, and visual design. This batch covers engineering quality, SEO correctness, performance, accessibility, maintainability, tooling, and analytics — areas not previously tracked._

Legend (same as above):
- Effort: **L** = trivial / minutes, **M** = moderate / hour-ish, **H** = larger / multi-step
- Impact: **★** = nice-to-have, **★★** = meaningful, **★★★** = page-transforming

---

### H. SEO & metadata correctness

- [ ] **H1.** Replace the SVG OG/Twitter image (`assets/og-image.svg`) with a **PNG or JPG at 1200×630 px**. LinkedIn, Twitter/X, Slack, WhatsApp, and most link-preview renderers do not support SVG for social cards — the current setup silently produces a blank or broken preview when the link is shared. _(Effort: M · Impact: ★★★)_
- [ ] **H2.** Update `sitemap.xml` `<lastmod>` to match the actual last-modified date whenever content changes. Consider auto-stamping it via a small build script or GitHub Action on push. _(Effort: L · Impact: ★)_
- [ ] **H3.** Add `<meta name="twitter:site">` and `<meta name="twitter:creator">` tags if a Twitter/X handle exists, to improve card attribution. _(Effort: L · Impact: ★)_
- [ ] **H4.** Verify the `<link rel="canonical">` in `index.html` always resolves to the HTTPS non-www form (`https://nishanthrajkumar.me/`) and that the CNAME + GitHub Pages redirect enforces this. _(Effort: L · Impact: ★★)_
- [ ] **H5.** Add `og:locale` (`en_IN` or `en_US`) and `og:site_name` to the Open Graph block for richer social previews. _(Effort: L · Impact: ★)_

---

### I. Performance

- [ ] **I1.** Add `font-display: swap` to the Google Fonts URL (append `&display=swap` — already present) and verify it is actually being applied; also consider **self-hosting** the two font families (Space Grotesk + Source Serif 4) to eliminate the third-party DNS round-trip and remove the render-blocking risk entirely. _(Effort: M · Impact: ★★)_
- [ ] **I2.** **Minify `styles.css` and `script.js`** for production. At ~2,840 lines of CSS and ~843 lines of JS, minification would cut transfer size by ~30–40%. A simple npm build step (`esbuild`, `lightningcss`, or `terser`) or a GitHub Action can automate this. _(Effort: M · Impact: ★★)_
- [ ] **I3.** The GitHub Stars fetch (`api.github.com`) is unauthenticated and subject to a 60 req/hr/IP rate limit. When the limit is hit the badge silently disappears. Consider: (a) removing the feature if stars are low-signal, or (b) routing through a lightweight serverless proxy with a token to raise the limit. _(Effort: M · Impact: ★)_
- [ ] **I4.** Add `loading="lazy"` to any future `<img>` tags and ensure the `favicon.svg` has a raster fallback (`favicon.ico` or `favicon-32.png`) for older browsers and OS-level bookmark icons. _(Effort: L · Impact: ★)_
- [ ] **I5.** Run a **Lighthouse audit** (Performance, Accessibility, Best Practices, SEO) and target 90+ on all four categories. Document the baseline scores and track regressions. _(Effort: L · Impact: ★★)_

---

### J. Accessibility

- [ ] **J1.** Audit **focus-visible** states across all interactive elements (nav links, filter chips, architecture stages, theme toggle, to-top button) in both light and dark mode. Ensure the focus ring is clearly visible and not clipped by `overflow: hidden`. _(Effort: M · Impact: ★★)_
- [ ] **J2.** Verify **color contrast ratios** (WCAG AA minimum 4.5:1 for normal text, 3:1 for large text) on: the spotlight pill text, credential pills, `--ink-soft` body copy, and the architecture annotation labels in dark mode. _(Effort: M · Impact: ★★)_
- [ ] **J3.** The architecture SVG stages use `role="button"` and `tabindex="0"` — confirm that the `aria-label` on each stage is descriptive enough for screen-reader users who cannot see the diagram, and that the `aria-live="polite"` detail panel announces updates correctly. _(Effort: L · Impact: ★★)_
- [ ] **J4.** The mobile menu (`#navLinks`) should trap focus when open and close on `Escape` key. Currently only `aria-expanded` is toggled; keyboard-only users may tab past the menu without being able to close it. _(Effort: M · Impact: ★★)_
- [ ] **J5.** Add `<html lang="en">` — already present ✓ — but verify the `404.html` page also has it (it does). Confirm no `aria-hidden="true"` is accidentally applied to focusable elements. _(Effort: L · Impact: ★)_

---

### K. Code maintainability

- [ ] **K1.** `script.js` is a single 843-line file with ~12 IIFEs labeled "Round 2 … Round 7" — accumulated incrementally. Add a **table of contents comment block** at the top listing each IIFE and its line range, or split into ES modules (`nav.js`, `tour.js`, `arch.js`, `download.js`, etc.) bundled at build time. _(Effort: M · Impact: ★)_
- [ ] **K2.** The `animateCounter` function (lines 132–151 in `script.js`) is defined at the top level but **never called** — the actual counter animation runs inside a separate IIFE. Remove the dead function to reduce confusion. _(Effort: L · Impact: ★)_
- [ ] **K3.** Inline styles in `404.html` (`style="min-height:80vh;display:grid;..."`) should be moved to `styles.css` under a `.error-page` class for consistency and easier theming. _(Effort: L · Impact: ★)_
- [ ] **K4.** The `trackClickEvent` function is intentionally a no-op (CountAPI was discontinued). Either **wire up a privacy-friendly analytics provider** (Plausible, GoatCounter, or Umami — all self-hostable and GDPR-friendly) or **remove the dead scaffolding** (`data-track` attributes, `trackedLinks` query, and the empty function) to keep the codebase honest. _(Effort: M · Impact: ★★)_
- [ ] **K5.** The `stopTour` function in the Impact Tour IIFE has a `resetMessage` parameter that is always called with `false` in the auto-stop path — the "Click Impact Tour…" default message is never restored after a tour completes. Decide if this is intentional and document it, or fix the call site. _(Effort: L · Impact: ★)_

---

### L. Tooling & CI

- [ ] **L1.** Add a **GitHub Actions workflow** that runs on every push to `main`: (a) HTML validation (`html-validate` or W3C validator API), (b) broken-link check (`lychee` or `htmlproofer`), (c) Lighthouse CI score gate. This catches regressions before they reach production. _(Effort: H · Impact: ★★★)_
- [ ] **L2.** Add an **npm `package.json`** (even a minimal one) to manage dev tooling: a CSS/JS minifier, a local dev server (`serve` or `browser-sync`), and a lint script. Currently there is no build toolchain at all, making automation harder to add later. _(Effort: M · Impact: ★★)_
- [ ] **L3.** The `sitemap.xml` `lastmod` and the footer `<time>` element are both **manually maintained** and already slightly inconsistent (sitemap says 2026-05-23, footer says "May 2026"). A one-line build script that stamps both from `git log --format=%ci -1` would keep them in sync automatically. _(Effort: M · Impact: ★)_
- [ ] **L4.** Add a **Content Security Policy** (CSP) header (via `_headers` file for GitHub Pages / Cloudflare, or a `<meta http-equiv="Content-Security-Policy">` tag) to restrict script/style sources to `self` + Google Fonts + `api.github.com`. This hardens the site against XSS without breaking any current functionality. _(Effort: M · Impact: ★★)_

---

### M. Content & README hygiene

- [ ] **M1.** `README.md` "Currently Building" section still lists "GCP data pipelines with BigQuery, Cloud Functions, Dataflow, and Databricks" and "Cross-cloud data integration" — these are accurate but generic. Sync the README's **Now And Next** and **Currently Building** sections with the site's `#now` strip (CI/CD on PR merge for BigQuery SDLC; Microsoft Fabric Real-Time Intelligence) so both surfaces stay consistent. _(Effort: L · Impact: ★)_
- [ ] **M2.** `README.md` uses `github-profile-summary-cards.vercel.app` for a profile summary card image. Verify this third-party service is still live and the card renders correctly; if not, replace with a static badge or remove. _(Effort: L · Impact: ★)_
- [ ] **M3.** The `temp/` folder exists locally (gitignored via `temp/*`) but the folder itself is tracked. Add `temp/` (with trailing slash) to `.gitignore` so the empty directory is not committed, or add a `.gitkeep` with a comment explaining its purpose. _(Effort: L · Impact: ★)_

---

### Suggested batches (Round 2)

#### Batch R2-1 — High-impact quick wins
H1 (SVG OG image → PNG), I5 (Lighthouse baseline), K4 (analytics decision), J4 (mobile menu keyboard trap)

#### Batch R2-2 — SEO & metadata
H2, H3, H4, H5, M1, M2

#### Batch R2-3 — Performance & build
I1, I2, I3, L2, L3

#### Batch R2-4 — Accessibility audit
J1, J2, J3, J5

#### Batch R2-5 — Code hygiene & CI
K1, K2, K3, K5, L1, L4, M3

---

_Round 2 items added June 2026 after post-structural engineering review._
