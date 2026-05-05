# Product/UX Backlog Redesign

Date: 2026-05-05
Project: La Badia
Scope: validate the current task backlog against the existing analyses and prototypes, then define a new product/UX backlog structure for the next phase of work.

## Goal

Replace the current linear task list with a backlog model that reflects the actual next priorities of the project:

1. editorial experience first
2. long-term manageability second
3. conversion optimization third

The new backlog must cover the whole ecosystem, not only the currently implemented public pages. It should include:

- public experience and information architecture
- future sections and narrative entry points
- CMS and editorial workflow implications
- content and asset readiness
- conversion paths as a later optimization layer

## Current State Assessment

The existing backlog in `bot/TASKS.md` and `bot/tasks/` is still useful as a historical record of the initial technical build-out, but it no longer provides the right shape for upcoming product decisions.

Validated as effectively completed:

- `T01` scaffold project
- `T02` local environment, SQLite, admin auth
- `T03` bilingual routing and i18n setup
- `T04` CMS collections baseline
- `T05` public frontend shell
- `T06` public bilingual blog
- `T12` homepage copy and positioning reset

Validated as still meaningful but needing relocation in a new structure:

- `T07` contact and lead persistence
- `T08` SMTP
- `T09` technical SEO
- `T10` Kubernetes deploy
- `T11` QA

Validated as real problems, but too broad to remain as standalone next-step tasks:

- `T13` homepage IA and sections
- `T14` public design system alignment
- `T15` homepage media and photography
- `T16` navigation and CTA alignment

## Why the Existing Shape Breaks Down

The current backlog mixes different kinds of work inside single tasks:

- page architecture
- copy and editorial strategy
- asset readiness
- CMS implications
- conversion logic

That shape was acceptable while the project was still building a technical baseline. It becomes fragile now because the next phase is not a single homepage polish pass. It is the definition of a coherent editorial product ecosystem.

The comparison between the current code and the materials in `analisi/` confirms that:

- the public tone has already improved
- the homepage is still structurally thinner than the prototypes
- several concept elements are not yet represented in the backlog as explicit product work

Examples of partially or not-yet-covered needs:

- two-door homepage structure
- explicit parent pages for `La Dimora`, `Esperienze`, `Territorio`, `Racconti`
- reviews and proof strategy
- public events strategy
- content governance for non-blog editorial surfaces
- asset inventory for first release
- separation of storytelling tasks from conversion tasks

## Backlog Model

The new backlog should use a hybrid model:

- milestones define sequence and outcome
- streams define the type of work inside each milestone

### Milestones

#### `M1 — Editorial Experience Complete`

The project should first become a credible editorial and hospitality experience, not just a technically correct site.

Focus:

- homepage as editorial hub
- narrative entry points
- parent pages and public structure
- visual coherence
- meaningful use of available imagery
- proof and event visibility in editorial form

#### `M2 — System Manageable Over Time`

Once the editorial surface is defined, the project must become maintainable without depending on ad hoc developer intervention for every update.

Focus:

- workflow clarity
- CMS responsibility boundaries
- event update model
- reusable editorial structures
- media governance
- bilingual content operations

#### `M3 — Conversion Optimized`

Only after the experience and operational model are stable should the project optimize friction, CTA behavior, and contact pathways.

Focus:

- request flows
- CTA hierarchy
- trust signals near action points
- content that resolves hesitation
- future readiness for booking-related evolution without implementing it yet

### Streams

Every task in the new backlog belongs to one milestone and one stream only.

The fixed streams are:

- `UX pubblica`
- `Contenuti e asset`
- `CMS e workflow`
- `Conversione`

## Reclassification of Existing Work

### Keep as closed historical baseline

Keep `T01-T12` as historical record, with the understanding that only `T01-T06` and `T12` are definitively closed as product-relevant foundations.

### Keep but relocate

Relocate these concerns inside the new milestone model:

- `T07` mostly between `M2` and `M3`
- `T08` mostly `M2`
- `T09` split between technical foundation and per-page/editorial SEO work
- `T10` kept as infrastructure support work, outside the core product backlog emphasis
- `T11` broken into milestone-level validation gates instead of one final QA step

### Retire as next-step task units

`T13-T16` should not be deleted as historical context, but they should no longer drive planning directly. They become source material for the new milestone backlog.

## New Backlog Blocks

## `M1 — Editorial Experience Complete`

### Stream: `UX pubblica`

- redesign the homepage as an editorial hub with hero, two doors, proof, events preview, and closing sequence
- define the parent pages `La Dimora`, `Esperienze`, `Territorio`, `Racconti`
- align primary navigation with the parent-page architecture
- extend the public design system across all main editorial entry pages

### Stream: `Contenuti e asset`

- inventory the release-ready assets already available
- build a content matrix for each parent page: required, available, missing
- define the minimum viable photography strategy for first release
- collect and normalize usable public reviews and proof material

### Stream: `CMS e workflow`

- decide which editorial surfaces remain code-managed in `M1`
- decide whether events need a minimal structured model already in `M1`
- define bilingual rules for long-form and short-form editorial content

### Stream: `Conversione`

- keep CTA layers coherent but secondary to narrative clarity
- separate stay-related CTAs from discovery/editorial CTAs and event/private-occasion CTAs

## `M2 — System Manageable Over Time`

### Stream: `UX pubblica`

- define consistency rules across page templates and section patterns
- define acceptable empty or not-yet-ready states without making the site feel unfinished

### Stream: `Contenuti e asset`

- create a coherent media library and naming approach
- define editorial checklists for pages, events, and articles
- define rules for image quality, captions, alt text, and IT/EN readiness

### Stream: `CMS e workflow`

- model events in CMS
- evaluate whether reusable pages or reusable sections should become manageable content objects
- define a simple owner workflow for updating events, proof, and priority content
- explicitly document what should stay out of CMS to avoid unnecessary complexity

### Stream: `Conversione`

- support lead persistence, email behavior, request states, and basic source traceability
- prepare contact surfaces that support different user intents cleanly

## `M3 — Conversion Optimized`

### Stream: `UX pubblica`

- refine the paths for `soggiorno`, `esperienze`, and `contatti`
- reduce friction in header actions, in-page CTAs, form flow, and closing sections

### Stream: `Contenuti e asset`

- move proof closer to action points
- add content that resolves common hesitation before the inquiry step

### Stream: `CMS e workflow`

- add only the minimum content-management support needed for commercial follow-up improvements
- prepare for future booking-oriented integrations without forcing premature architecture

### Stream: `Conversione`

- optimize the contact form
- clarify CTA hierarchy and success conditions
- define measurable success criteria for inquiry behavior

## Operating Rules for the New Backlog

- do not mix page design, asset collection, CMS design, and conversion logic into one task
- every task belongs to exactly one milestone and one stream
- important pages should be treated as epics with smaller tasks underneath
- every task should declare its nature: `decisione`, `design/prodotto`, or `implementazione`
- inside `M1`, decision and content-readiness work should come before tasks that assume finalized material
- QA should be distributed as milestone gates, not deferred to the end
- SEO should no longer live as a single isolated task; it should be split between technical foundation and page/editorial concerns
- conversion should not dictate the architecture before the editorial structure is credible

## Consequences for Planning

The next planning step should not continue from `T13-T16` as if they were implementation-ready tasks.

Instead, planning should:

1. keep `T01-T12` as historical record
2. archive `T13-T16` conceptually as superseded planning inputs
3. create a new roadmap grouped by `M1`, `M2`, and `M3`
4. generate smaller tasks under the four fixed streams
5. include explicit discovery tasks for assets, reviews, events, and content governance

## Recommended Immediate Direction

The first implementation planning cycle should target `M1`.

Within `M1`, the recommended order is:

1. content and asset inventory
2. public architecture decisions for homepage and parent pages
3. design-system and navigation alignment
4. first structured event/proof decisions
5. implementation planning for the first release slice

This preserves the user-approved priority:

- editorial experience first
- manageability second
- conversion optimization third

## Out of Scope for This Spec

This document does not define:

- the final names or IDs of the replacement tasks
- the implementation sequence at file or component level
- exact CMS schema fields
- exact page wireframes
- the final split between code-managed and CMS-managed surfaces

Those belong to the implementation-planning step that follows this validated design.
