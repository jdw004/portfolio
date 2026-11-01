# John Welch

My personal website, built with React, Vite, and Tailwind CSS.

[john-welch.dev](https://www.john-welch.dev/)

## Run locally

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build
npm run deploy
```

## Career map

The `/map/` page shares internship entries with the home timeline in
`src/data/experiences.js`. Set each internship's `location` to
`{ city: 'City name', state: 'Full state name' }`, or `{ remote: true }`.
Use `excludeFromMap: true` to omit an entry from the map. States highlight automatically;
hovering or selecting one shows its roles in an overlay. Company-logo markers
use the city positions in `src/data/mapCities.js`. Clicking or tapping keeps the
details open until closed, dismissed with Escape, or dismissed by clicking outside.

`src/data/usStates.json` contains SVG paths derived from
[U.S. Atlas 3.0.1](https://github.com/topojson/us-atlas)'s
`states-albers-10m.json` (975 × 610 Albers USA projection, 2017 Census boundaries).
The map is bundled locally and requires no external API or map service.
The upstream license is included in `public/licenses/us-atlas.txt`.

Company logos are stored locally in `public/images/companies/`: Apple's navigation
logo from [apple.com](https://www.apple.com/), Stripe's wordmark from
[stripe.com](https://stripe.com/), and the user-selected LPL Financial icon from
[Built In](https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=scale-down,w=200,h=200/sites/www.builtin.com/files/2021-09/1625136906659.jpeg).
Apple's SVG viewBox is trimmed to the mark; Stripe's wordmark uses its purple brand color.
