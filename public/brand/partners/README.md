# Partner logos (hero marquee)

Drop **all-white** partner logos here (transparent background) to replace the
text in the auto-scrolling strip at the bottom of the hero.

The marquee looks for these exact filenames (see `src/data/partners.ts`):

| File | Partner |
|------|---------|
| `darpaconnect.png` | DARPAConnect |
| `platform-one.png` | Platform One / Marketplace One |
| `heartland-bioworks.png` | Heartland BioWorks |
| `scitechconnect.png` | DoW SciTechCONNECT |
| `silicon-crossroads.png` | Silicon Crossroads |
| `tradewinds.png` | Tradewinds |
| `indiana-research-consortium.png` | Indiana Research Consortium |

Notes
- Each logo renders at ~32–36px tall; width auto. Wide, transparent PNGs (or
  SVGs) work best. For SVG, change the extension in `src/data/partners.ts`.
- Any missing file gracefully falls back to the partner name as text.
- To add/remove/reorder partners, edit `src/data/partners.ts`.
