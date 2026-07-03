# RS Motors — Premium Car Dealership Platform

A production-ready car dealership website built for the Pakistani auto market with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui-style components**, **Framer Motion**, and a **Prisma-modeled data layer**.

## ⚠️ Important: Data Layer Note

This build was generated in a sandboxed environment **without network access to Prisma's binary engine servers** (`binaries.prisma.sh`), so `npx prisma generate` cannot fetch the native query engine here. To keep the app fully functional and production-realistic, the app currently runs on a **JSON-file data layer** (`/data/*.json` + `lib/data.ts`) that:

- Mirrors the exact Prisma schema shape (`prisma/schema.prisma`) field-for-field
- Exposes the same query functions you'd write with Prisma (`getAllCars`, `filterCars`, `createBooking`, etc.)
- Persists writes (bookings, reservations, inquiries, trade-ins, admin CRUD) to JSON files on disk

**To switch to a real database in your own environment** (where you have network access), it's a small swap:

1. Run `npx prisma generate` and `npx prisma migrate dev` (schema is already written in `prisma/schema.prisma`, using SQLite by default — swap the `datasource` provider to `postgresql`/`mysql` for production).
2. Run `npm run db:seed` to seed via `prisma/seed.ts` (already wired to the same car data used for the JSON demo, in `lib/seed-data.ts`).
3. Replace the contents of `lib/data.ts` with Prisma Client calls — the function signatures are already designed to match (e.g. `prisma.car.findMany()`, `prisma.car.findUnique({ where: { slug } })`, `prisma.booking.create({ data })`).
4. Update `app/api/admin/login/route.ts` to query `prisma.admin.findUnique()` and `bcrypt.compare()` instead of the hardcoded demo credential.

Everything else (pages, components, forms, EMI calculator, filters) works identically against either backend since they only ever call the functions exported from `lib/data.ts`.

## Also Note: Fonts

`next/font/google` (Inter, Playfair Display) requires fetching from `fonts.googleapis.com` at build time, which was also unavailable in this sandbox. The app currently uses system font fallbacks defined in `app/globals.css` (`--font-inter`, `--font-playfair` CSS variables). To restore the original Google Fonts, see the commented instructions at the top of `app/layout.tsx` — it's a 6-line swap.

## Getting Started

```bash
npm install

# Option A: JSON data layer (works out of the box, no DB needed)
npm run dev

# Option B: Real Prisma + SQLite (requires network access for the Prisma engine)
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Visit `http://localhost:3000`.

### Admin Dashboard

- URL: `/admin/login`
- Email: `admin@rsmotors.pk`
- Password: `RSMotors@2026`

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Route Handlers) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + custom design tokens (luxury red/black/white palette, glassmorphism utilities) |
| UI Primitives | Radix UI, styled in the shadcn/ui pattern (`components/ui/*`) |
| Animation | Framer Motion |
| Forms | react-hook-form + zod |
| Charts | Recharts (EMI breakdown, admin analytics) |
| State | Zustand (wishlist/compare, persisted to localStorage) |
| Auth | JWT (jsonwebtoken) in an httpOnly cookie, guarding `/admin/*` via a route-group layout |
| Data modeling | Prisma schema (`prisma/schema.prisma`) — SQLite by default, swappable to Postgres/MySQL |

## Project Structure

```
app/
  page.tsx                      Home
  inventory/page.tsx             Inventory (filters, sort, pagination, grid/list)
  inventory/[slug]/page.tsx      Car details (SSG via generateStaticParams)
  inventory/compare/page.tsx     Side-by-side comparison
  finance/page.tsx               EMI loan calculator
  trade-in/page.tsx              Trade-in valuation form
  about/page.tsx
  contact/page.tsx
  admin/
    login/page.tsx               Public login
    (dashboard)/layout.tsx       Auth-guarded shell (redirects to /login if no session)
    (dashboard)/dashboard/       Analytics
    (dashboard)/inventory/       CRUD table + add/edit dialog
    (dashboard)/inquiries/       Contact + trade-in submissions
    (dashboard)/bookings/        Test drives + reservations
  api/                           Route handlers (bookings, reservations, inquiries,
                                  trade-in, newsletter, admin login/logout, admin car CRUD)
  robots.ts / sitemap.ts         SEO

components/
  ui/                            Design-system primitives (button, card, dialog, select, ...)
  layout/                        Navbar, Footer, Logo
  shared/                        CarCard, ReviewCard, Breadcrumbs, FAQ, WhatsApp float, Map
  home/                          Hero, FeaturedCars, NewArrivals, WhyRsMotors, Reviews, CTA
  inventory/                     Filters sidebar, toolbar, pagination, compare bar, quick view
  car-details/                   Gallery (with 360° placeholder), specs, features, inspection,
                                  pricing sidebar, booking/reserve dialogs, similar cars
  finance/                       Loan calculator with live pie chart
  trade-in/                      Valuation form with image upload preview
  contact/                       Contact form
  admin/                         Sidebar, dashboard charts, inventory table, car form dialog

lib/
  data.ts                        Data access layer (JSON-backed; Prisma-ready function signatures)
  seed-data.ts                   Shared realistic Pakistani vehicle listings (26 cars)
  finance.ts                     EMI amortization calculation
  auth.ts                        JWT sign/verify + session helper
  store.ts                       Zustand wishlist/compare store
  constants.ts                   Brands, fuel types, cities, price ranges, etc.
  utils.ts                       cn(), formatPKR(), formatKm(), slugify(), timeAgo()

prisma/
  schema.prisma                  Full relational schema (Car, CarImage, InspectionItem,
                                  Inquiry, Booking, Reservation, TradeIn, Review, Admin, ...)
  seed.ts                        Prisma seed script (uses lib/seed-data.ts)

scripts/generate-json.ts         Generates /data/*.json from lib/seed-data.ts for the demo backend
```

## Features Implemented

- **Home**: hero with advanced search (brand/model/year/price/fuel/transmission/body type), featured cars, new arrivals (horizontal scroll), "Why RS Motors", customer reviews, CTA, embedded Google Map, footer with newsletter signup.
- **Inventory**: grid/list toggle, full filter sidebar (mobile drawer + desktop sticky), sorting, pagination, wishlist & compare (persisted), quick view modal.
- **Car Details**: image gallery with lightbox + 360° view placeholder, full specs table, features grid, inspection report checklist, sticky pricing sidebar with live mini-EMI, WhatsApp deep link, Book Test Drive & Reserve Car dialogs (write to API), similar vehicles.
- **Finance**: interactive EMI calculator (price, down payment, interest rate, tenure) with amortization pie chart and FAQ.
- **Trade-In**: vehicle valuation form with photo upload preview and an instant estimated value.
- **Contact**: validated contact form, phone/WhatsApp/email cards, business hours, embedded map.
- **Admin**: JWT-protected login, dashboard analytics (stat cards, brand bar chart, status breakdown), full inventory CRUD with multi-image upload, inquiries/trade-in list, bookings/reservations list.
- **SEO**: per-page metadata, Open Graph tags, JSON-LD (`AutoDealer` on the home page, `Vehicle`+`Offer` on each car page), `sitemap.xml`, `robots.txt`, Next/Image optimization throughout.
- **Design**: white/black/dark-gray/red luxury palette, glassmorphism navbar & search panel, rounded cards, dark/light mode via `next-themes`, Framer Motion micro-interactions, mobile-first responsive layout.

## Known Sandbox-Only Substitutions

| Real deployment | This sandbox build |
|---|---|
| `next/font/google` (Inter, Playfair Display) | System font fallback (see `app/globals.css` note) |
| Prisma Client + SQLite/Postgres | JSON-file data layer in `/data`, same query shape |
| Licensed showroom/vehicle photography | `picsum.photos` seeded placeholders (swap URLs in `lib/seed-data.ts` / uploads) |
| bcrypt-hashed admin password from DB | Hardcoded demo credential in `app/api/admin/login/route.ts` |

None of these affect the actual application code, routing, or UI — they're infrastructure swaps you'd make when deploying with full network/database access.
