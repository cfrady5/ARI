# ARI — Applied Research Institute Website

A premium, dark-mode marketing site for the Applied Research Institute (ARI),
built as a plain static site so it deploys to GitHub Pages and embeds cleanly
in Wix.

> ARI catalyzes opportunities that enhance national security and drive economic
> prosperity.

## Stack

Plain **HTML, CSS, and vanilla JavaScript** — no build step, no dependencies.
All internal links are **relative**, so the site works at any base path
(GitHub Pages project subpath, a custom domain, or inside a Wix embed).

## Structure

```
site/
├── index.html                 # Home
├── about/                     # About
├── initiatives/               # Initiatives
├── press-insights/            # Press & Insights
├── events/                    # Events
├── contact/                   # Contact (form)
├── privacy/ terms/ accessibility/   # Legal
├── styles.css                 # Design system (brand tokens + components)
├── script.js                  # Header, mobile nav, scroll-reveal, metric
│                              # count-up, contact form, hero wave canvas
├── assets/                    # ari-logo.png + partners/*.png
└── .nojekyll                  # serve files as-is on GitHub Pages
```

## Local preview

```bash
cd site
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploying

The GitHub Actions workflow in `.github/workflows/deploy.yml` publishes the
`site/` folder to GitHub Pages on every push to `main`. The live site is served
at `https://cfrady5.github.io/ARI/`.

Requires **Settings → Pages → Source = GitHub Actions**.

To embed in Wix, add an HTML/embed element pointing to the Pages URL, e.g.:

```html
<iframe src="https://cfrady5.github.io/ARI/" title="ARI"
        style="border:0;width:100%;height:100vh;"></iframe>
```

## Design system

Brand tokens live at the top of `site/styles.css`:

- **Canvas:** near-black `#030605` / `#000`
- **Surfaces:** ARI Navy `#1F3655` gradients
- **Accent:** ARI Green `#3BAE48 → #007941`
- **Type:** Plus Jakarta Sans

## Content to finalize

- **Contact form** posts client-side only — wire it to Formspree, a Wix CRM
  webhook, or a serverless endpoint.
- **Press & Insights / Events** use representative sample cards.
- **Partner logos:** add `darpaconnect.png`, `platform-one.png`,
  `silicon-crossroads.png` to `site/assets/partners/` and swap the matching
  text items in the home marquee for `<img>` tags.
