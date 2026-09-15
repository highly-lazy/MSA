# MSA Transportation Inc — Website

A responsive, multi-page React website for MSA Transportation Inc
(Dry Van &amp; Reefer trucking, MC-1153963 / USDOT 3498597).

## Run it locally (edit & develop)

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build for hosting

```bash
npm install
npm run build
```

This creates a `dist/` folder with the finished static site — upload the
contents of `dist/` to any web host (Netlify, Vercel, GoDaddy, Hostinger,
cPanel, etc.).

A ready-made copy of this build is already included in this package under
`dist-prebuilt/` — you can upload that folder as-is without running any
commands, if you just want to publish the site quickly.

### Important: this is a multi-page app with client-side routing

The site has four pages (Home, Services, Careers, Contact) handled by
React Router in the browser, not separate HTML files. That means the
server needs to send `index.html` for *any* URL (e.g. a visitor opening
`yoursite.com/services` directly, or refreshing that page), not just `/`.
Both `dist/` and `dist-prebuilt/` already include the config files for
this:

- `_redirects` — works automatically on Netlify
- `.htaccess` — works automatically on Apache-based hosts (GoDaddy,
  Hostinger, cPanel) as long as `mod_rewrite` is enabled
- `vercel.json` (project root) — works automatically on Vercel

If your host doesn't support any of the above, ask their support how to
set up an SPA fallback / rewrite rule to `index.html`.

## Before you publish — update these

Open `src/constants.js` and check the contact details:

- **Address, MC and USDOT numbers** come from public FMCSA records and
  should already be correct.
- **Phone** is the number on file with FMCSA — confirm it's the one you
  want listed publicly (dispatch line, cell, etc.).
- **Dispatch and recruiting emails are placeholders** — replace
  `dispatch@msatransportationinc.com` and
  `careers@msatransportationinc.com` with real inboxes you check.
- **The footer map** embeds Google Maps for the address in
  `CONTACT.address` (`src/constants.js`) — no API key needed, it just
  uses the free `google.com/maps?...&output=embed` URL format.

The quote-request form (Services page), driver application form
(Careers page) and contact form (Contact page) are front-end only (no
backend yet) — they show a confirmation message on submit. To actually
receive submissions, connect them to a form service (e.g. Formspree,
Netlify Forms) or your own backend endpoint.

## Structure

- `src/pages/` — one file per page: Home, Services, Careers, Contact
- `src/components/` — shared building blocks (Header with the
  full-screen overlay menu, Footer with the Google Maps embed, Logo,
  PageHero, StatsBar, TrustFeatures, StatesCoverage interactive map,
  FAQ, CTABand, the three forms, Reveal scroll-animation wrapper, etc.)
- `src/content.jsx` — service descriptions, why-us points, career
  tracks, driver requirements, fleet specs, trust features, FAQ content
- `src/constants.js` — contact info, nav links, image paths, Google
  Maps links — edit here first
- `src/styles.css` — all styling (blue/white brand palette), animations
  and hover effects, fully responsive (desktop, tablet, mobile)
- `public/us-states-map.svg` — public-domain (CC0) blank US states map
  used by `StatesCoverage.jsx`; it's fetched and colored at runtime, and
  the HQ marker is positioned from the Pennsylvania state path's own
  bounding box (no hand-picked x/y coordinates). If the company ever
  relocates to a different state, update the `.pa` selector in
  `StatesCoverage.jsx` to that state's two-letter class (e.g. `.tx`).

## Logo

The header/footer logo (`src/components/Logo.jsx`) is a hand-built SVG
recreation of the company's shield logo — built this way because it
scales crisply at any size with no image file to manage. If you have
the original logo artwork, you can swap it in: drop the file in
`public/` and replace the `<Logo />` usages in `Header.jsx` and
`Footer.jsx` with an `<img>` tag pointing to it.

## Images

The hero banner (`public/images/hero-cascadia.jpg`) and the services /
equipment banner (`public/images/reefer-cascadia.jpg`, a Freightliner
pulling a Carrier reefer trailer) are real photos from Wikimedia
Commons — chosen deliberately so the truck and trailer shown match
what a US dry-van-and-reefer carrier actually runs. They're credited
in the footer, which is required by their CC BY-SA 4.0 licenses; keep
that credit line if you keep the photos. The remaining photos are
royalty-free stock from Unsplash, linked directly by URL in
`src/constants.js`. Replace any of them with real photos of your own
trucks, trailers and drivers whenever you have them, for the most
authentic result.
