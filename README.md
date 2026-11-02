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
