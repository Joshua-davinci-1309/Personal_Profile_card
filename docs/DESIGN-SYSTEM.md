# Design system

Everything visual is a token. This document is the contract: if a value is not here, it should not
be in a component.

## 1. Palette

Sampled directly from the nine-swatch source image. The system uses **one** accent — dusty rose —
and resists adding a second. Hierarchy comes from value (dark → light), not from colour variety.

| Token            | Hex       | Role                                     |
| ---------------- | --------- | ---------------------------------------- |
| `canvas`         | `#060701` | Page background                          |
| `canvas-soft`    | `#0B0006` | Alternating section bands, footer        |
| `surface`        | `#1A1415` | Cards, elevated panels                   |
| `surface-raised` | `#212D2D` | Ambient glow, hover backplates           |
| `line`           | `#2A322D` | Default hairline                         |
| `line-strong`    | `#363F3A` | Hover hairline, deliberate dividers      |
| `olive`          | `#40423B` | Reserved: future data-viz ramps          |
| `sage`           | `#667268` | Decorative icons, separators (non-text)  |
| `stone`          | `#8D8B87` | Labels, tertiary text                    |
| `mist`           | `#989B8F` | Body copy                                |
| `pale`           | `#AFAFA1` | Emphasised body copy                     |
| `bone`           | `#C9C8BF` | Headings, primary text                   |
| `rose`           | `#E2C2B9` | Links, focus rings, CTAs, italic accents |

### Contrast (WCAG 2.1, computed against the surface actually used)

| Pair                 | Ratio   | Use                              |
| -------------------- | ------- | -------------------------------- |
| `bone` on `canvas`   | 12.03:1 | Headings — AAA                   |
| `pale` on `canvas`   | 9.12:1  | Emphasis text — AAA              |
| `mist` on `canvas`   | 7.14:1  | Body copy — AAA                  |
| `stone` on `canvas`  | 5.95:1  | Labels, captions — AA            |
| `sage` on `canvas`   | 4.02:1  | **Decorative only** — never text |
| `rose` on `canvas`   | 12.18:1 | Links, accents — AAA             |
| `canvas` on `rose`   | 12.18:1 | Button label — AAA               |
| `mist` on `surface`  | 6.43:1  | Body copy on cards — AA+         |
| `stone` on `surface` | 5.35:1  | Labels on cards — AA             |

Rule of thumb: **`sage` never carries words.** It is a line and icon colour (4.02:1 fails AA for
text). Anything that must be read uses `stone` or lighter.

## 2. Typography

| Role      | Family                    | Usage                                  |
| --------- | ------------------------- | -------------------------------------- |
| Display   | Fraunces (variable serif) | `h1`–`h2`, section statements, numbers |
| Body / UI | Inter                     | Paragraphs, labels, buttons, nav       |
| Mono      | System monospace stack    | Indices (`01`), counters, dates        |

Scale (desktop): `4.25rem` hero → `2.6rem` section → `1.5rem` card title → `1rem` lead →
`0.875rem` body → `0.75rem` micro-label.

Rules:

- Display headings use `letter-spacing: -0.02em` and `line-height: 1.02`.
- Body copy is capped at `65ch`; long-form text never spans the full grid.
- Micro-labels are uppercase with `0.16–0.28em` tracking. This is what makes the layout read as
  _engineered_ rather than _styled_.
- Italic serif in `rose` is the signature emphasis — used for one phrase per heading, never two.

## 3. Space, radius, elevation

- Spacing follows a 4px base; sections are `py-20` (mobile) → `py-24` (desktop).
- Container: `max-w-6xl` with `px-6` / `px-8`.
- Radii: `rounded-lg` (8) for icon tiles, `rounded-xl` (12) for inputs, `rounded-2xl` (16) for
  cards, `rounded-[28px]` for hero panels.
- Elevation is _light_, not shadow: hover raises the surface value and adds
  `--shadow-lift` (`0 30px 70px -40px`). There is no dramatic drop shadow anywhere.

## 4. Components

| Component                   | Contract                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `Button` / `ButtonLink`     | Three variants (`primary`, `secondary`, `ghost`), three sizes. One class builder feeds both |
| `Badge`                     | `neutral`, `accent`, `muted`; uppercase, 11px, tracked                                      |
| `StatusDot`                 | Pulsing availability indicator; `aria-hidden`                                               |
| `Section`                   | Vertical rhythm + optional hairline divider                                                 |
| `SectionHeading`            | Eyebrow, display title, description — always the same order                                 |
| `PageHeader`                | Inner-route masthead with aurora + blueprint backdrop                                       |
| `Reveal`                    | Single scroll entrance; disabled under reduced motion                                       |
| `card` / `card-interactive` | Surface + hairline; interactive adds lift on hover                                          |
| `SocialLinks`               | `inline` (icon + label) or `chips` (icon only), brand marks only                            |

Interactive states are consistent across every component:

1. **Rest** — `surface` at 60% opacity, `line` hairline.
2. **Hover** — border shifts to `line-strong` or `rose/60`, surface rises, translate `-2px`.
3. **Focus** — 2px `rose` outline with 3px offset (global rule, never removed).
4. **Active** — translate back to `0` so the control feels physical.

## 5. Motion

- One primitive: fade + 18px rise, 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Applied only to blocks that start below the fold, and only after mount. Content is never
  rendered invisible, so the page still reads with JavaScript disabled and crawlers see real text.
- Max stagger: 60ms per item — long cascades feel slow on mid-range devices.
- Anything that loops (status dot) is `aria-hidden` and stops under reduced motion.
- No parallax, no scroll-jacking, no entrance animation on text that is already on screen.

## 6. Texture

Three generated layers, zero image files:

1. **Grain** — inline SVG `feTurbulence` at 4% opacity, `soft-light`, fixed to the viewport.
2. **Aurora** — three radial gradients (moss, rose, sage) at 10–16% alpha behind the hero and
   mastheads.
3. **Blueprint** — a 64px grid, masked to fade toward the edges, at ~50% of the hairline colour.

They exist to stop flat `#060701` from reading as "unfinished dark theme". All three are inert:
`pointer-events: none`, `aria-hidden`.

## 7. Do / don't

| Do                                       | Don't                                     |
| ---------------------------------------- | ----------------------------------------- |
| One accent per view                      | Tint brand icons in six different colours |
| `stone` for labels                       | `sage` for text (fails AA at 4.02:1)      |
| Hairlines and value shifts for hierarchy | Heavy drop shadows                        |
| Serif italic for one phrase              | Italic in body copy                       |
| Labelled "coming soon" states            | Dead links or empty `href`                |
| 65ch measure                             | Full-width paragraphs                     |
