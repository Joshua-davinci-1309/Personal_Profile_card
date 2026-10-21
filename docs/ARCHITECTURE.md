# Architecture

This document explains _why_ the code is shaped the way it is. The README covers what exists;
this one covers the decisions a maintainer will otherwise have to reverse-engineer.

## 1. Constraints first

| Constraint                               | Consequence                                                       |
| ---------------------------------------- | ----------------------------------------------------------------- |
| Hosted on GitHub Pages (no Node runtime) | `output: "export"`, no route handlers, no ISR, no cookies/session |
| Must load on a mid-range Android phone   | Server components by default; four client files in total          |
| One person maintains it                  | Boring, typed, colocated data; no clever abstractions             |
| Content changes often                    | All copy in `src/content/*`, never inline in a component          |

The static constraint is the load-bearing one. Every feature was designed to work without a
server rather than bolted onto a server later.

## 2. Rendering and the server/client boundary

The App Router renders everything on the server by default. Client components exist only where
browser state is unavoidable:

| File                                   | Why it is a client component                |
| -------------------------------------- | ------------------------------------------- |
| `components/layout/site-header.tsx`    | `usePathname` for active nav + drawer state |
| `components/ui/reveal.tsx`             | IntersectionObserver entrance animation     |
| `components/contact/contact-board.tsx` | localStorage-backed CRUD state              |
| `components/contact/message-form.tsx`  | controlled inputs                           |
| `components/contact/draft-list.tsx`    | callbacks into the shared store             |

Everything else — hero, sections, service cards, blog rows — is a server component that emits
HTML and ships no JavaScript.

Reading `window.localStorage` during render is the classic hydration-mismatch bug: the server
renders "no drafts", the client would render three records, and React would tear the tree.
The module therefore exposes a snapshot store consumed with `useSyncExternalStore`:

- `getServerSnapshot` returns a stable empty array, used for SSR and hydration;
- `getSnapshot` returns the cached client snapshot (never re-reads storage mid-render);
- `subscribe` boots the repository on first subscription — client only — and notifies on change;
- a second `useSyncExternalStore` with `() => true` / `() => false` yields `isHydrated` without
  setting state inside an effect (which React's `set-state-in-effect` rule forbids, for good
  reason: it cascades renders).

The same store also handles cross-tab sync by listening to the `storage` event.

## 3. The message module

```
types.ts        domain vocabulary: Message, MessageInput, MessageStatus, ProjectType
validation.ts   validateMessage(), normaliseMessageInput() — pure, no imports beyond types
repository.ts   MessageRepository — the only thing the UI knows about persistence
local-repository.ts  localStorage implementation with defensive parsing
store.ts        observable snapshot + cross-tab sync (the UI's single source of truth)
compose.ts      mailto: composition (encoding lives in one place)
use-messages.ts React binding over useSyncExternalStore (no effects, no hydration mismatch)
```

Design rules applied:

- **Single source of truth.** `MESSAGES_STORAGE_KEY` is exported once and reused by the
  repository and the cross-tab listener; drifting keys would silently split the store.
- **Parse, don't trust.** `isMessage()` narrows unknown JSON before it reaches the UI. A
  corrupted or hand-edited payload degrades to "no drafts", never to a white screen.
- **No leaking storage details.** Components never touch `localStorage`; they call `create`,
  `update`, `remove`, `clear`.
- **Pure logic is separated from React** so validation can be unit-tested in milliseconds.
- **Status is data.** `draft` vs `queued` lives on the record, not in a boolean prop, so a
  future "sent" state does not require a schema change.

### Swapping in an API

```ts
// future: lib/messages/http-repository.ts
export function createHttpMessageRepository(baseUrl: string): MessageRepository {
  return {
    key: "api.messages",
    list: () => /* GET /messages */,
    create: (input) => /* POST /messages */,
    update: (id, patch) => /* PATCH /messages/:id */,
    remove: (id) => /* DELETE /messages/:id */,
    clear: () => /* DELETE /messages */,
    get: (id) => /* GET /messages/:id */,
  };
}
```

Then change one line in `use-messages.ts`. Nothing else moves. This is the practical meaning of
"DRY" in a frontend: the boundary is defined once, so the change is local.

## 4. Design tokens

Tailwind v4 removes the JS config file in favour of CSS:

```css
@theme {
  --color-canvas: #060701;
  --color-rose: #e2c2b9;
  --font-display: var(--font-fraunces);
}
```

Every token becomes a utility (`bg-canvas`, `text-rose`, `font-display`) _and_ a CSS variable, so
the same value works in Tailwind classes, custom properties and `color-mix()`. Adding a colour
means adding one line — there is no second place to update.

Component primitives (`.card`, `.eyebrow`, `.link-underline`, `.grain`, `.aurora`, `.blueprint`)
live in `@layer components` in `globals.css`. They exist because the same three-to-five utility
combination was repeating; a primitive is only created after the third repetition, not before.

## 5. SEO and metadata

`lib/seo.ts` exposes `buildMetadata()` and `personJsonLd()`. Every route calls `buildMetadata`
with its own title/description/path, which produces a canonical URL, Open Graph tags and a
Twitter card from one object. The root layout sets `metadataBase` so relative URLs resolve
absolutely — a common cause of broken social previews.

`app/sitemap.ts` and `app/robots.ts` are generated from the route list, not hand-written XML.

## 6. Accessibility decisions

- A skip link is the first focusable element.
- Active navigation uses `aria-current="page"`, not just colour.
- The form has one error element per field wired via `aria-describedby`, and status changes are
  announced through a polite live region.
- Focus is never removed: `outline: none` does not appear anywhere in the codebase.
- Motion respects `prefers-reduced-motion` twice — in CSS (transitions/animations) and in the
  reveal component (which skips the animation entirely).

## 7. Performance notes

- No runtime image optimisation: the portrait is a pre-sized 880 px JPEG (~114 KB), declared
  with intrinsic dimensions to reserve layout space.
- Fonts are self-hosted by `next/font` (no third-party request, no FOUT cascade).
- The grain texture is an inline SVG data URI in CSS, so it costs no extra request.
- Total shipped JS is small because the page is almost entirely server-rendered.

## 8. Known trade-offs

| Decision                  | Cost                                                   | Benefit                                      |
| ------------------------- | ------------------------------------------------------ | -------------------------------------------- |
| Static export             | No server-side form handling, no per-request rendering | Free, fast, cacheable hosting                |
| localStorage CRUD         | Per-device, per-browser data                           | Real, honest functionality without a backend |
| Serif display + sans body | Two font families to load                              | Distinct brand voice, still fast             |
| Placeholder social URLs   | Must be edited before launch                           | One file to change, no dead links            |
