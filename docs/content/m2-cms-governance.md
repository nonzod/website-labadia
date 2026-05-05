# M2 CMS Governance

Baseline: `master@2055842`

## What lives in code

- route map and page composition
- parent-page long-form editorial copy in `lib/public-content.ts`
- stable CTA structure

## What lives in CMS

- `events` collection for public/open events
- `editorial-settings` global for homepage proof and event-related short copy
- `media` governance metadata for usage, readiness, and owner notes

## Owner workflow

1. Create or update event entries in `events`.
2. Mark only public-ready items as `published`.
3. Toggle `featuredOnHome` only for the small set of events that should appear on the homepage.
4. Update homepage proof quotes in `editorial-settings` only when there is verified guest-facing proof.
5. Keep page structure changes in code; do not model them ad hoc in CMS.

## Out of scope for M2

- no page builder
- no booking model
- no admin-managed navigation
- no ad hoc WYSIWYG blobs for parent pages
