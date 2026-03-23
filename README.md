# Portfolio — Glass Edition

A premium glassmorphism portfolio built with React + Vite + GSAP.

## Stack
- **React 18** + **React Router**
- **Vite** — build tool
- **Tailwind CSS** — utility classes
- **GSAP** — animations
- **Glass Design System** — custom CSS with backdrop-filter

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Import this repo into [Vercel](https://vercel.com/new).
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

> Add `vercel.json` at root for SPA routing:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
> ```
