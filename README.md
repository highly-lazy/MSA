# MSA Transportation Inc — Website

Single-page marketing site for MSA Transportation Inc (dry van & reefer
truckload, Jamison PA — USDOT 3498597 / MC-1153963). React + Vite +
React Router, no animation library: motion is CSS plus tiny IntersectionObserver
/ requestAnimationFrame hooks.

```bash
npm install
npm run dev        # develop
npm run build      # production build → dist/
npm run preview    # serve the build locally
```

Visitor journey (top to bottom): **WOW** hero → **TRUST** credentials →
**EXPERIENCE** story & stats → **PEOPLE** our trucks → **SAFETY** → **SERVICES** →
fleet → **PROCESS** → departments & team → coverage map → **PROOF** customer
promises → driver recruiting → FAQ → quote / contact → footer.

## Replace placeholders with real data

Everything factual lives in `src/data/`. Nothing is invented: anything that is
not verified is `null` and renders as `XX+` / `[X]+ Years` / `[Add …]` until
you fill it in.

| What | File | Notes |
| --- | --- | --- |
| Phone, emails, address, MC/DOT, social links | `src/data/company.js` (`CONTACT`, `SOCIAL`) | The two emails are placeholders — use real inboxes. Social icons only render for URLs you add. |
| Stats (drivers, miles, loads) | `src/data/company.js` (`STATS`) | Set `value` from `null` to a number; counters animate automatically. Years / fleet size / states are already set from verified data. |
| Leadership faces | `src/data/people.js` (`LEADERS`) | Portrait photos, ~4:5. |
| Departments | `src/data/people.js` (`DEPARTMENTS`) | Delete any department MSA does not actually staff. |
| Testimonials | `src/data/operations.js` (`TESTIMONIALS`) | Marked "Placeholder" until you set `placeholder: false`. |
| Driver pay / home time / benefits | `src/data/operations.js` (`DRIVER_INFO`) | Items with `todo` show a dashed placeholder. |
| Services, fleet, own trucks, safety, process, FAQ | `src/data/operations.js` | Services: dry van, reefer, power only, dedicated lanes, interstate truckload. |
| Service area | `src/data/company.js` (`COVERAGE`) | `served: 'all48'` reflects the company's stated coverage — change to a list of state codes if that is not accurate. Lane arcs on the map are illustrative. |

## Hero photo, video and seasons

- **Hero background photo:** drop a file in `public/images/` (e.g. `hero-bg.webp`) and set
  `IMAGES.heroBg` in `src/data/company.js`. It is blended under the headline; leave `null` for the
  current animated backdrop. Wide (≥1920px), dark or low-contrast photos work best.
- **"Delivering Excellence. Driving Trust." band:** a built-in animated dusk highway drawn on a canvas (no image or video
  file): twinkling stars, three parallax skyline layers, perspective road with lamps, long-exposure light trails, a
  truck driving ahead and wet-road reflections. It runs only while on screen and shows one still frame for
  reduced-motion visitors. To use a real background video instead, put a silent, seamless 10–20 s loop in
  `public/videos/` and set `VIDEO.src` / `VIDEO.webm` in `src/data/company.js`; it fades in over the scene.
- **Fleet slider:** swipe / drag / arrows / dots (wraps around) with a gentle autoplay that pauses on hover, focus and touch. Slides come from `FLEET`.
- **Seasons:** `public/images/seasons.webp` is sliced into four panels by CSS (no extra files). Copy is in
  `SEASONS` (`src/data/operations.js`). The picture is illustrative, not MSA's own fleet.

## Forms

The quote, driver-application and callback forms use `src/lib/submitForm.js`:

- Set **`VITE_FORM_ENDPOINT`** at build time (e.g. a Formspree URL) and submissions are
  POSTed there as JSON.
- If it is not set, the form opens the visitor's email app with the details
  pre-filled (to `CONTACT.email` / `CONTACT.recruiting`) so nothing is silently dropped.

## Images

`public/images/` holds WebP files, all real MSA / supplied photos:

- `own-042*.webp`, `own-035*.webp` — the company's own trucks, kept at native resolution (plus 480px versions for
  phones). They feed the **Our trucks** gallery (`OWN_TRUCKS` in `src/data/operations.js` — add an entry and
  the gallery grows; each photo opens full-size in a lightbox), the story section and the safety scanner
  (`safety-truck.webp`, unit 035 — hotspot positions, in % of the photo, live in `SAFETY_HOTSPOTS`).
- `trailer-dry.webp`, `trailer-reefer.webp`, `tractor-volvo.webp` — the supplied product shots with the white
  background removed (transparent WebP). The reefer source is only 590px wide, so a larger one would look sharper.
- `truck-blue.webp` is the hero cut-out (Peterbilt, background removed) — confirm you have the rights, or swap in your own.

Drop new photos in `public/images/` and reference them from `IMAGES` in `src/data/company.js`.

## Hosting

Upload the contents of `dist/` (or the pre-built copy in `dist-prebuilt/`).
Because the site uses client-side routing (`/privacy`, `/terms`), the host must
serve `index.html` for unknown URLs — `_redirects` (Netlify), `.htaccess`
(Apache) and `vercel.json` (Vercel) are already included. The old `/services`,
`/careers` and `/contact` URLs redirect to the matching section of the home page.

Before launch, check the domain in `index.html` (canonical / Open Graph URLs) — it assumes
`msa-transportation.com`.
`/privacy` and `/terms` are draft copy in `src/pages/Legal.jsx` — have counsel review.

## Structure

- `src/pages/Home.jsx` — section order · `src/pages/Legal.jsx` — Privacy / Terms
- `src/components/` — one component per section (Hero, Story, Drivers, Safety,
  Services, Fleet, Process, Departments, People, Coverage, Partner, Recruit,
  FAQ, Quote, Footer) plus Header, HelpWidget, MobileBar, Reveal, Icon, Art
- `src/styles/` — `base.css` (tokens, buttons, header), `hero.css`, `sections*.css`, `conversion.css`
- `public/us-states-map.svg` — public-domain state map used by the coverage section
