# CançãoOração

Personalized Christian song generation platform (Brazilian market). Users fill a 5-step questionnaire, the team composes custom worship songs, and customers pay via credit card or Pix.

## Tech Stack

- **Vue 3** + **TypeScript** + **Vite** — frontend SPA
- **Tailwind CSS v4** — utility-first styling
- **Pinia** — state management (funnel answers persisted across sessions)
- **Vue Router** + **Vue I18n** (pt-BR) — routing and translations
- **Firebase** — Firestore (database), Hosting, Cloud Functions (Node.js)
- **Dlocal** — payment processing (in Cloud Functions)
- **PostHog** + Meta Pixel — analytics

## Project Structure

```
src/
├── views/
│   ├── LandingPage/     # Homepage: hero, features, testimonials
│   ├── FunnelPage/      # 5-step questionnaire (FunnelStep1–5)
│   ├── PaymentPage/     # Checkout: Stripe card + Pix
│   ├── SuccessPage/     # Post-payment confirmation
│   ├── ReviewsPage/     # Customer testimonials
│   ├── TrackOrderPage/  # Order lookup by email
│   └── LegalPage/       # Terms & Privacy Policy
├── stores/
│   ├── funnel.ts        # Persisted funnel answers + step navigation
│   └── audio.ts         # Audio preview player state
├── composables/         # usePostHog, useIntersectionObserver
├── services/firebase.ts # Firebase init
├── i18n/index.ts        # All UI strings (600+ keys, pt-BR)
├── constants/index.ts   # Pricing, site name, support email
└── router/index.ts      # Route definitions
functions/src/index.ts   # Cloud Functions (Stripe webhooks, order processing)
public/                  # Static assets (images, audio samples, posters)
```

## Key Configuration

- **Firebase project**: `myprayersong-428ef` (`.firebaserc`)
- **Hosting site**: `cancaooracao.com`
- **Firestore region**: `nam5` (North America)
- **Pricing** (`src/constants/index.ts`): R$159 standard / R$238 express (50% discount active)
- **Support email**: suporte@cancaooracao.com
- **Skeleton loading**: Vite plugin injects `Skeleton.html` as initial loading state
- **Node version**: `^20.19.0` or `>=22.12.0`

## Patterns

- All UI text goes through Vue I18n (`src/i18n/index.ts`) — no hardcoded Portuguese strings
- Use and store color from the main.CSS, never hardcode color directly in the vue
- Funnel state is persisted via `pinia-plugin-persistedstate` so users can resume mid-form
- Analytics events fire on each funnel step and form submission (PostHog)
- SPA routing handled by Firebase Hosting rewrites (all paths → `index.html`)
- `@` alias maps to `src/`

## Code rules
* Keep things as simple as possible
* Don’t create functions that are unnecessary or not used yet
* Log errors, but not successful operations (Logger)
* Reuse existing code when possible; avoid boilerplate
* Separate each page, related pages and its components in separate folder
* Code each component in separate file / Reuse them when possible

