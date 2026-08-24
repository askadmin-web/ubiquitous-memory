# Portfolio site — structure

## The one rule

**All page metadata lives in `pages.js`.** The nav bar and the portfolio
index both build themselves from it. To add a page, add one entry to
`pages.js`. Nothing else needs editing — not the index, not the nav.

Previously a new page meant editing `index.html` *and* `nav.html` and
keeping the two in sync by hand. That's what stopped scaling.

## Adding a page

**Start from `_template.html`.** Copy it, rename it kebab-case with no date
suffix, fill in the four spots marked `▼ FILL IN ▼`, write the content, then
add one entry to the right group in `pages.js`. Done.

The template already contains the correct `<head>`, the analytics and `?ref=`
capture, the dark-mode script, the nav wiring in the right order, and the
standard content blocks (section label, prose, bullet list, two-panel grid,
callout, pill) so you're not copying them out of an old page.

Two things in the template to remember:

- Delete `<meta name="robots" content="noindex">` when the page goes live.
- The leading underscore in `_template.html` keeps GitHub Pages from
  publishing it. Keep the underscore on the template; your new page should
  **not** have one.

Wiring a page by hand instead: `<link rel="stylesheet" href="nav.css">` in the
`<head>`, and near the top of `<body>`:

```html
<div id="nav-placeholder"></div>
<script src="pages.js"></script>
<script src="nav-inject.js"></script>
```

`pages.js` must load before `nav-inject.js`.

Set `status: "draft"` to build a page without publishing it — it stays in
the manifest but drops out of both the nav and the index.

## Categories

| Group | Holds | Index layout |
|---|---|---|
| Credentials & Evidence | Resume, Global Reach | 3-across cards |
| Delivery Practice | Frameworks, essays, interactives about the work | full-width |
| How It Was Built | Process pieces about the artifacts themselves | full-width |

Most new work lands in **Delivery Practice**.

## Files

| File | Role |
|---|---|
| `pages.js` | Manifest. The only file you edit to add or retire a page. |
| `nav-inject.js` | Builds the nav from the manifest. Never needs editing. |
| `nav.css` | Nav styling. |
| `index.html` | Portfolio index. Renders from the manifest. |
| `_template.html` | Starter for new pages. Underscore keeps it unpublished. |
| `_wide-blocks.html` | Reference sheet for map / image / table / chart pages. |

`nav.html` is **obsolete** — delete it from the server. The nav is now
generated rather than fetched, which also means pages preview correctly
when opened directly from disk (the old `fetch('nav.html')` failed on
`file://`).

## Renames — 2026-08-12

| Old | New |
|---|---|
| `implementation.html` | `implementation-framework.html` |
| `complexity_080626.html` | `institutional-complexity.html` |
| `scaling_080626.html` | `delivery-at-scale.html` |
| `built-interactive.html` | `built-jd-comparison.html` |
| `roleplay_q2_q4_072726.html` | `role-play-rooms.html` |

`resume.html`, `global-reach.html` and `built-resume.html` were already
clean and did not change.

Each old filename now holds a **redirect stub** so links already sent to
recruiters still land correctly, carrying any `?ref=` parameter across.
Keep them for a few months, then delete.

## Map, image, table and chart pages

Text pages start from `_template.html`. Visual pages start there too, then
copy the blocks they need out of **`_wide-blocks.html`** — open it in a
browser, find the section, copy the markup *and* its CSS.

That CSS is deliberately not in `_template.html`. Table and chart styling is
a few hundred lines that an essay page never uses, so it's kept separate and
paid for only on the pages that need it.

### What's in there

| § | Block | Notes |
|---|---|---|
| 1 | Page width | Change `.page` **and** `.nav-inner` together — 900px is the Global Reach default. Changing only `.page` leaves the nav narrower than the content. |
| 2 | `.figure` | One wrapper for maps, images, charts, SVG. Never fixed-height, so nothing gets a nested scrollbar on a phone. Caption sits below. |
| 3 | `.stat-row` | The summary numbers strip. |
| 4 | `table.data` | Sticky header, sideways scroll, `.num` for right-aligned tabular figures. |
| 5 | Chart palette | `--series-1…5`, light and dark steps, plus the series cap rules. |
| 6 | Tooltip | Page-level `#tooltip`; working version is in `global-reach.html`. |

### Structify exports and other tabular data

Export to CSV, convert it to a JS array of objects (any AI session does this
in one pass), and keep the array at the bottom of the page — the table renders
from it. Same pattern as `pages.js`, and the same one Global Reach already
uses for its city list. Hand-writing forty rows of `<td>` is where mistakes
come from.

Past a few hundred rows, save the data as a separate `.json` file and
`fetch()` it instead, the way Global Reach fetches its world atlas.

Numeric columns get `class="num"` — right-aligned with tabular figures so the
digits line up. Leave text columns alone; tabular figures make prose look loose.

### Chart color — the short version

Series colors are defined once as `--series-1` … `--series-5`, with separate
steps selected for dark mode (not an automatic flip). **Assign them in order,
top down.** Never invent an extra hue.

The cap depends on whether two series can end up touching:

- **Bars, stacked bars, lines** — fixed order, only neighbors need to
  separate. Up to 5 is fine.
- **Maps, scatter, bubble** — any two categories can land side by side, so
  every pair must separate. **Three is the honest cap.** Past three: fold into
  "Other," use small multiples, or add a second channel (marker shape, direct
  labels).

Grid lines and axes are always gray, never a series color. Labels and values
stay in text colors — a colored pip beside a label carries identity. A legend
is required from two series up.

**About the existing Global Reach map:** its four region colors don't fully
separate — teal against blue is close enough that some readers, and most
colorblind readers, can't reliably distinguish them. The page gets away with
it because color isn't working alone: legend, hover tooltip naming each city,
and a full city list with a colored pip per row. If that map is ever rebuilt,
either use three colors plus a distinct marker shape for the fourth region, or
keep four colors *and* keep the city list.

## Known inconsistency — for a later pass

Three pages use a different design system from the rest:

- `institutional-complexity.html`
- `delivery-at-scale.html`
- `built-jd-comparison.html`

They're IBM Plex + teal with their own inline `Portfolio /` breadcrumb,
rather than the system font + shared nav + dark mode used everywhere else.
They work and they link back correctly, so this is cosmetic — but bringing
them onto the shared nav is the obvious next job.

Also: `institutional-complexity.html` and `delivery-at-scale.html` carried
`<meta name="robots" content="noindex, nofollow">` from when they were
unlisted. That's been removed now that they're linked from the index.
