# Fonts

Self-hosted variable fonts, loaded with `next/font/local` in `src/app/layout.tsx`.
No runtime request is made to Google Fonts, so the site stays fully static and GDPR-friendly.

| File                            | Family        | Source                                                    |
| ------------------------------- | ------------- | --------------------------------------------------------- |
| `inter-latin-wght-normal.woff2` | Inter         | `@fontsource-variable/inter` (mirror of Google Fonts)      |
| `fraunces-latin-full-normal.woff2` | Fraunces   | `@fontsource-variable/fraunces` (mirror of Google Fonts)   |

Both families are licensed under the **SIL Open Font License 1.1**:

- Inter — https://github.com/rsms/inter/blob/master/LICENSE.txt
- Fraunces — https://github.com/undercasetype/Fraunces/blob/master/OFL.txt

The OFL permits bundling and self-hosting, provided the font is not sold on its own and
reserved font names are respected. Keep this notice with the files if the repo is ever
redistributed.
