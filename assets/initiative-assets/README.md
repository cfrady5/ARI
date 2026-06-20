# Initiative Background Images

Drop background photos here to fill the grey logo boxes on the **Initiatives** page
(`initiatives/index.html`) and the Featured Initiatives cards on the **home page**
(`index.html`). Each card shows a white knockout logo over a dark,
slightly-dimmed background image. Until a file exists, the card shows a plain
grey box (`#232826`) behind the logo — that's the intended placeholder.

## Expected filenames

Use these exact names (lowercase, `.jpg`). The page already references them, so
once you upload a file with the matching name it appears automatically:

| Initiative | Filename |
| --- | --- |
| Rapid Acquisition Marketplace | `ram.jpg` |
| Heartland BioWorks | `heartland-bioworks.jpg` |
| Silicon Crossroads | `silicon-crossroads.jpg` |
| DARPAConnect | `darpaconnect.jpg` |
| Tradewinds | `tradewinds.jpg` |
| SciTechCONNECT | `scitechconnect.jpg` |
| Midwest Defense Innovation Summit | `mdis.jpg` |
| Indiana Research Consortium | `indiana-research-consortium.jpg` |
| Midwest UAS Test Site | `midwest-uas.jpg` |
| Defense Innovation OnRamp Hubs | `onramp.jpg` |
| DARPA ERIS | `darpa-eris.jpg` |
| Platform One / Marketplace One | `platform-one.jpg` |

## Image guidance

- **Aspect / size:** landscape works best; the box is ~360&times;168px on desktop
  and the image is cropped to fill (`background-size: cover`). Aim for ~1200px wide.
- **Format:** `.jpg` (keep each file under ~300&nbsp;KB if possible).
- **Content:** the image is darkened with a 45&ndash;62% black overlay so the white
  logo stays legible, so choose photos that read well behind a logo (avoid busy or
  very light images).

To use a different filename, update the matching card's
`style="--card-bg:url('../assets/initiative-assets/NAME.jpg')"` in
`initiatives/index.html`.
