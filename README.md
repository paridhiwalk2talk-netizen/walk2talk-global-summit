# Walk2Talk Summit Site

. What to build

A single-page (no routing, no multi-page nav), fully responsive marketing site for a virtual healthcare conference: Walk2Talk Global Healthcare Summit 2026, themed "Healthcare 2030: Transforming Care Through Innovation, Technology & Leadership," held 27 August 2026, virtual, all agenda times in IST (GMT+5:30). The page's job is to build credibility with senior healthcare executives and drive registrations. React + Tailwind (your default stack) is fine. No backend, database, or auth needed for now — everything is static content — unless I ask later for a working registration form.

2. Brand & visual direction

Organizer: Walk2Talk Media. The logo is two angular, overlapping blade/parallelogram shapes forming a W/M monogram — one solid black, one solid red — above a tight, bold, all-caps wordmark. Build the whole visual language around that geometry: sharp diagonal cuts, not soft or rounded shapes.

Color palette (sampled directly from the logo file — use these, not a generic default palette):

Ink Black #0A0A0A — primary text, dark sections

Signal Red #CF2329 — the exact brand red; primary accent, buttons, active/hover states

Paper White #FFFFFF — primary background

Cool Mist #F1F2F4 — alternate section background, for rhythm between sections

Slate #5B6169 — secondary/muted text

Clinical Teal #0E6E71 — optional, used sparingly as a tertiary tag color only on "digital health / innovation" content — red stays the dominant accent throughout

Typography:

Display/headlines: Space Grotesk (semibold/bold) — its cut, geometric letterforms echo the logo's angled blades

Body: Inter — clean and legible at small sizes for a content-dense page

Data labels (agenda time stamps, countdown digits, eyebrow tags): a monospace like IBM Plex Mono, letter-spaced, in caps

Signature element: reuse the logo's angled blade/parallelogram shape as a recurring motif — as a quiet background shape behind the hero headline, as the divider between sections, as the container the agenda's expand icon sits in, and clipped subtly into card corners. That's the one bold, memorable device. Keep everything else around it quiet and disciplined.

Imagery: no generic stock photography of doctors, stethoscopes, or hospital corridors. Use a clean line-icon set (lucide-react) for the "Who Should Attend" and "Key Discussion Themes" grids. Keep the hero abstract and geometric (the blade motif plus a subtle gradient), not photographic.

Motion: one orchestrated hero load-in (headline/subhead/CTA staggering in), scroll-reveal as sections enter view, a hover lift + red border on cards, and a smooth rotation on the agenda's + icon into an × on expand. Keep it restrained — nothing more than that.

3. Sections, in order

Sticky nav

Logo on the left. Links: About · Agenda · Speakers · Register. A solid red "Register Now" button on the right. Collapses to a hamburger menu on mobile.

Hero

Eyebrow: "VIRTUAL SUMMIT · 27 AUGUST 2026 · IST"

Headline: "Walk2Talk Global Healthcare Summit 2026"

Subhead: "Healthcare 2030: Transforming Care Through Innovation, Technology & Leadership"

One supporting sentence on why the timing matters (draw it from the About copy below)

Primary CTA: "Register Now" → links to #register (placeholder, see my closing note)

Secondary ghost-button CTA: "View Agenda" → anchors down to the agenda section

A live countdown timer to 27 Aug 2026, 5:00 PM IST (days / hours / minutes / seconds), set in the mono data face

About / Overview

Use this copy exactly, don't rewrite it:

"Healthcare is at an inflection point. Between 2026 and 2030, aging populations, workforce shortages, and rising costs will collide with a wave of new technology — AI-driven diagnostics, decentralized care, digital therapeutics, and remote care — arriving faster than most institutions can absorb it. 'Healthcare 2030' sets a deliberate horizon: close enough to be actionable, far enough to demand real strategic thinking. The Walk2Talk Global Healthcare Summit 2026 convenes health system leaders, innovators, policymakers, clinicians, and technologists for a half-day virtual dialogue on what it will take to build the healthcare systems of 2030 — systems that are more accessible, intelligent, resilient, and human-centered.

The theme 'Healthcare 2030: Transforming Care Through Innovation, Technology & Leadership' anchors the conversation on how organizations, governments, and industry leaders can work together to improve access, strengthen workforce resilience, and deploy innovation responsibly. Rather than a one-way broadcast of trends, the summit is built as a series of candid formats — panels, fireside chats, one-on-one dialogues — designed to surface practical insight, not abstract forecasting."

Pair it with 3–4 small highlight chips drawn only from real content already given (don't invent attendance numbers or past-edition stats): "Half-Day Virtual Format" · "2026 → 2030 Horizon" · "Cross-Sector Leadership" · "Global Audience."

Who Should Attend

Five cards in a grid, one icon each:

Healthcare Providers & Health Systems

Digital Health & Technology Leaders

Government & Policymakers

Life Sciences & Industry

Academia & Research

Key Discussion Themes

Eight cards in a grid, one icon each:

The future of healthcare delivery and healthcare systems

AI and digital transformation in healthcare

Workforce resilience and talent challenges

Patient-centered and value-based care models

Digital health, telemedicine, and remote care

Healthcare innovation and emerging technologies

Leadership strategies for navigating change

Building accessible, equitable, and sustainable healthcare systems

Agenda — important, this changes the reference site's behavior

Build a vertical accordion list, one row per item, in time order. Each closed row shows the time range (mono face) and the session title, with a + icon on the right.

In the reference video, clicking + opened a speaker-profile flyout — a photo/name/bio card. Don't build that. Instead, clicking + should expand the row in place to reveal the session brief (the descriptive paragraph below) as plain text. If a session has a named speaker, show their name, title, and organization as a plain text line under the brief, labeled "Speaker:" — plain text only, not a photo card or flyout. Rotate the + into an × while a row is expanded.

Content for all 8 rows, in order:

5:00 PM – 5:10 PM · Welcome Address by Walk2Talk Media No brief or speaker given — title only.

5:10 PM – 5:15 PM · Opening Keynote: The Future of Healthcare 2030: Policy, Innovation & System Transformation Brief: This keynote will explore how policy, innovation, and strategic leadership can work together to create more accessible, resilient, and sustainable healthcare systems, while preparing organizations and nations for the challenges and opportunities of 2030.

5:20 PM – 5:40 PM · In Conversation: From Vision to Impact: Leading Change in Healthcare Brief: Exploring how healthcare leaders are turning strategic vision into measurable impact through innovation, collaboration, and patient-centered care. Speaker: Walid Achi, Chief Medical Officer, Emirates Hospitals, UAE

5:45 PM – 6:20 PM · Panel Discussion: AI, Digital Health & the Future of Patient Care Brief: This panel will examine how organizations can leverage innovation responsibly to enhance patient experiences, improve clinical outcomes, and create more connected and data-driven healthcare systems. Speaker: Franklin Vibar, Chief Information Officer, Asian Hospital and Medical Centre

6:25 PM – 6:35 PM · Special Guest: Building Sustainable & Resilient Healthcare Systems Brief: A discussion on the policies, investments, and collaborative efforts required to create healthcare systems that can meet the evolving needs of populations in the years ahead.

6:40 PM – 7:00 PM · Fireside Chat: What Healthcare Leaders Must Prioritize by 2030 Brief: This fireside chat will explore the key priorities healthcare organizations should focus on to drive innovation, strengthen resilience, improve patient outcomes, and build sustainable healthcare systems for 2030 and beyond. Speaker: Mohamed Nasser, General Manager, Middle East & Africa (MEA), Amgen

7:00 PM – 7:15 PM · Closing Keynote: Building Tomorrow's Healthcare, Today Brief: This session will explore how collaboration, innovation, and leadership can help create sustainable, technology-enabled, and human-centered healthcare systems for generations to come.

7:30 PM · Closing Address No brief or speaker given — title only.

Featured Speakers (placeholder section — I'll finish this myself)

Below the agenda, add a "Featured Speakers" grid of 4 cards. Use fully generic placeholders here, not the real names above:

Name: "Speaker Name" · Title: "Job Title, Organization" (repeat ×4)

Avatar: a simple placeholder for each — either a flat silhouette icon or a soft abstract cartoon avatar in the brand colors. Not a real photo, not a broken-image icon.

A small "More speakers to be announced" note under the grid.

Closing CTA banner

Full-width red or black band right before the footer: one short line ("Secure your seat for Healthcare 2030") plus a "Register Now" button.

Footer

Logo, a one-line tagline, quick links (About / Agenda / Speakers / Register), a placeholder contact email, placeholder social icons (LinkedIn, X, Instagram — link them to # for now), and "© 2026 Walk2Talk Media. All rights reserved."

4. Logo usage

Use the uploaded logo file as-is in the nav and footer — don't recolor, redraw, or simplify it. Give it clear breathing room; don't crowd it against nav links.

5. Quality bar

Mobile-first responsive. Pay particular attention to how the agenda accordion and the two icon grids collapse to a single column on small screens. Visible keyboard focus states on every interactive element. Respect reduced-motion preferences.

6. Constraints — please don't

Don't invent attendee counts, past-edition stats, testimonials, or sponsor logos — none were provided.

Don't bring back the speaker-photo flyout on the agenda + click — see the Agenda section above.

Don't use stock photography of doctors or hospitals.

Don't add extra pages or routing — this is one page.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5af82221-817c-495f-999f-3ee02d844bf7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
