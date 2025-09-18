# Hayot Edu Management — Multilingual Landing

**Stack:** Next.js 14 (App Router) · Tailwind · next-intl · Nodemailer

## Quick start
```bash
npm install
npm run dev
# http://localhost:3000/en
```

## Configure environment
Copy `.env.example` to `.env.local` and set:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
TO_EMAIL=
PLAUSIBLE_DOMAIN=yourdomain.com  # optional
```

## Contact form
- API route: `app/api/contact/route.ts` (Nodemailer). Includes a honeypot field and basic rate limiting.
- Edit the WhatsApp link in `app/[locale]/page.tsx` (search for `wa.me`).

## i18n
Localized messages live in `/messages/*.json`. Add/adjust copy per language.

## Deploy (Vercel)
- Import from GitHub, set env vars above.
- Build command: default (Next.js).
- After deploy, verify `/en`, `/ru`, `/ky`, `/kk` and SEO (`/sitemap.xml`).

## Brand pages
Starter pages at `/[locale]/brands/<slug>` for Twin Science, Elecfreaks, Acebott, Edutech CPT, ClassVR, Makeblock.
