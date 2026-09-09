# EduSolo

AI-powered educational tourism platform for Solo Raya. Discover, filter, and get personalized recommendations for family-friendly destinations across Surakarta and its 6 surrounding regencies.

Backend API: [edusolo-general-api](https://github.com/IL-BengawanSolo/edusolo-general-api) — REST API for destinations, auth, and AI recommendations.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Live Demo:** https://edusolo-fe.vercel.app  
**API:** https://edusolo-general-api.vercel.app/api/v1  
**Backend Repo:** https://github.com/IL-BengawanSolo/edusolo-general-api

![EduSolo Preview](./public/images/home/destination.png)

## Overview

EduSolo brings together 200+ educational tourism spots in Solo Raya and helps families find the right place by age, budget, region, and opening hours. It combines a curated catalog, an interactive map with clustering and GeoJSON boundaries, a short AI quiz that returns 8 tailored destinations, and a 24/7 assistant chatbot.

Built mobile-first with a focus on performance and accessibility.

## Features

- **Explore & Filter** — Search with debounce, URL-synced filters (region, category, place type, open days, price, age), infinite scroll, and responsive cards. Shareable links and back-button support out of the box.
- **Interactive Map** — Leaflet with marker clustering, custom SVG pins, popups with price and categories, and a GeoJSON overlay for Solo Raya.
- **AI Recommendations** — 5-question quiz → AI engine → 8 personalized results with retake flow and result persistence.
- **Destination Detail** — Image gallery with keyboard navigation, scroll-spy tabs, activities, facilities, location, opening hours, and a similar-destinations carousel.
- **EduBot Chat** — Persistent chat history, markdown rendering with sanitization, and a streaming-ready API hook.
- **Authentication** — JWT-based login/register, protected routes, and SPA fallback handling.

## Tech Stack

- **Framework:** React 19, React Router 7
- **Build:** Vite 6, @vitejs/plugin-react
- **Styling:** Tailwind CSS 4, tw-animate-css, Radix UI, shadcn/ui
- **Icons:** lucide-react, FontAwesome 6, react-iconly
- **Map:** Leaflet 1.9, react-leaflet 5, react-leaflet-markercluster
- **Forms:** React Hook Form, Zod, @hookform/resolvers
- **HTTP:** Axios
- **Carousel:** Embla Carousel
- **Utilities:** clsx, tailwind-merge, class-variance-authority
- **Testing:** Vitest, Testing Library, jsdom
- **Deployment:** Vercel

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
git clone https://github.com/your-username/edusolo-fe.git
cd edusolo-fe
npm install
```

Create an environment file for local development:

```bash
cp .env.example .env.development.local
# Edit .env.development.local if needed:
# VITE_API_BASE_URL=http://localhost:5500/api/v1  (for local BE)
```

**How env files work (Vite):**
- `npm run dev` → loads `.env.development.local` (local BE) — gitignored, never committed
- `npm run build` / Vercel → loads `.env.production` or Vercel Dashboard Env `VITE_API_BASE_URL` — set `https://edusolo-general-api.vercel.app/api/v1` in Vercel Project Settings → Environment Variables (Production)
- Only 2 files per project: `.env.example` (template, committed) + `.env.development.local` (real secrets, ignored). No need for 5 files.

**.env.example**

```
VITE_API_BASE_URL=https://edusolo-general-api.vercel.app/api/v1
```

**.env.development.local** (local)

```
VITE_API_BASE_URL=http://localhost:5500/api/v1
```

Run the app:

```bash
npm run dev      # http://localhost:5173 (uses .env.development.local)
npm run build    # production build to dist/ (uses Vercel Env)
npm run preview  # preview production build
npm run lint     # run ESLint
npm run test     # run unit tests
```

## Environment Variables

| Variable | Where to set | Description | Required |
|---|---|---|---|
| `VITE_API_BASE_URL` | `.env.development.local` (local) / Vercel Env (prod) | Base URL for the EduSolo API | Yes |

The app will warn in the console if `VITE_API_BASE_URL` is not set. For production on Vercel, do not commit `.env.production` — set it in Vercel Dashboard → Settings → Environment Variables.

## Project Structure

```
public/
  fonts/            # WOFF2 fonts (served statically)
  images/           # Images and generated WebP variants
  solo-raya.json    # GeoJSON for Solo Raya (fetched at runtime)
src/
  api/              # Data-fetching hooks
  assets/fonts/     # Source TTF files
  components/
    ui/             # Reusable UI primitives
    filter/         # Filtering UI
    destination-card/
    destination-detail/
    recommendation/
    utils/          # Auth, routing helpers
  hooks/            # Shared hooks
  layouts/          # App layouts
  lib/              # axios instance, utilities
  pages/            # Route components
  sections/         # Home sections
  constants/        # Static data
```

Routing is lazy-loaded with `React.lazy` and `Suspense`. The map component and chatbot are also lazy-loaded to keep the initial bundle small.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint with ESLint |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Watch mode |

## Deployment

Deployed on Vercel with SPA rewrites and security headers.

**vercel.json** handles:
- SPA fallback to `index.html`
- Long-term caching for `/fonts` and `/images`
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)

## Screenshots

| Home | Destinations | Detail | Recommendations |
|---|---|---|---|
| ![Home](./public/images/home/scenery.png) | ![Destinations](./public/images/home/map.png) | ![Detail](./public/images/home/destination.png) | ![AI](./public/images/home/ai.png) |

## License

MIT
