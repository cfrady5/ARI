# Brand assets

Drop the official ARI logo here to replace the typographic fallback used in
the site header and footer.

## Files used by the site

- **`ari-mark-white.png`** — white "ARI" mark (transparent bg). Used in the
  header/footer next to the typographic "Applied Research Institute" wordmark.
  This is the file the `Logo` component renders.
- `ari-logo-full-color.png` / `ari-mark-color.png` — color (green/navy)
  variants kept for light-background use; not used on the dark site.

## How to add it

1. On GitHub: open this `public/brand/` folder → **Add file → Upload files**.
2. Upload your white logo as `ari-logo-white.png`.
3. Commit. The deploy workflow rebuilds and the real logo appears automatically.

## Using an SVG instead (sharper)

If you have an SVG, upload it as `ari-logo-white.svg` and change the extension
in `src/components/layout/Logo.tsx` (`LOGO_SRC`) from `.png` to `.svg`.
SVG stays crisp at every size and is the preferred format for logos.
