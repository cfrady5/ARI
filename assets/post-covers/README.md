# Post cover images

Cover images for Press & Insights cards. Each card shows the cover as a banner
above the title.

## How a card picks its cover (in order)

1. **Custom cover** — whatever you put in the portal's *Cover image* field for
   that post (a full `https://…` URL or a site path like
   `assets/post-covers/my-file.jpg`).
2. **Per-type default image** — if no custom cover, the card uses the default
   image for its type (filenames below). Drop these in and every post of that
   type without its own cover picks it up automatically.
3. **Per-type color** — if that default image file doesn't exist, the card
   falls back to the type's color scheme (the `.post-cover--*` rules in
   `styles.css`).

## Per-type default filenames

Upload with these exact names (lowercase, `.jpg`):

| Post type | Default file |
| --- | --- |
| Press Release | `press-release.jpg` |
| Initiative Update | `initiative-update.jpg` |
| Insight | `insight.jpg` |
| Report | `report.jpg` |
| Op-Ed | `op-ed.jpg` |
| In the Media | `in-the-media.jpg` |

Recommended: landscape JPG ~1000px wide, under ~250 KB.
