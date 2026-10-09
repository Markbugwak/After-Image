# AFTERIMAGE

**Some moments never really leave.**

AFTERIMAGE is a frontend-only, interactive visual experience about feelings, memory, and the moments we want to keep. It combines an editorial, Apple-inspired layout with soft generative visuals and a personal keepsake creator.

## Features

- Five moods: Nostalgia, Peace, Longing, Hope, and Joy
- Responsive, editorial layout with warm neutral colors
- Animated orb artwork with mood-driven colors
- Personal reflection prompt
- Personalized keepsake card
- Client-side PNG export using the Canvas API
- No account, backend, or external API required
- Keyboard-friendly controls and reduced-motion support
- Mobile responsive

## Tech stack

- React
- Vite
- CSS animations
- Lucide React icons
- Canvas API for downloadable artwork

## Run locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production-ready static site is generated in `dist/`.

## Deploy

### Vercel
Import this repository into Vercel. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

### Netlify
Build command: `npm run build`. Publish directory: `dist`.

## Project structure

```text
afterimage/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── styles.css
```

## Design direction

Ivory paper, soft amber light, editorial serif accents, precise mono labels, and motion that feels slow rather than loud. The intention is to make the experience feel like a small digital keepsake, not a conventional dashboard.

## Privacy

The reflection prompt and mood selection stay in the browser. No user data is sent to a server.

---

Made slowly, for a moment.