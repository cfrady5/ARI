# About page — leadership image assets

Drop real leadership headshots here to replace the placeholders. Keep the
**exact filenames** below so no code changes are needed — just overwrite the
file (upload a new file with the same name) and the About page picks it up.

| File                   | Person           | Role on About page                 |
| ---------------------- | ---------------- | ---------------------------------- |
| `andrew-kossack.jpg`   | Andrew Kossack   | Chief Executive Officer & President|
| `leslie-wolfe.jpg`     | Leslie Wolfe     | EVP Finance & Operations, CFO      |
| `benjamin-griffin.jpg` | Benjamin Griffin | EVP of Innovation & Impact         |
| `william-kiser.jpg`    | William Kiser    | EVP Science & Technology           |
| `trevor-foughty.jpg`   | Trevor Foughty   | EVP of Public Affairs              |

## Image guidelines

- **Format:** `.jpg` (keep the same name + extension as above).
- **Orientation:** portrait. The cards crop with `object-fit: cover`, so the
  subject is centered automatically — anything close to a 4:5 / 5:6 portrait
  works well.
- **Recommended size:** ~600 × 700 px or larger (square-ish portrait is fine).
- **Background:** any. A neutral / professional background reads best against
  the dark theme.

`avatar-placeholder.svg` is the neutral silhouette source used to generate the
current placeholder `.jpg` files. Leave it in place as a fallback/source.

## LinkedIn links

Each card has a LinkedIn icon that currently points to ARI's company page
(`https://www.linkedin.com/company/theari`). To link an individual profile,
edit that person's `href` in `about/index.html` (search for the matching
`aria-label`, e.g. `aria-label="Andrew Kossack on LinkedIn"`).
