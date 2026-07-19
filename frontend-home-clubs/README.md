# ClubHub — Frontend (Home & Clubs)

Module 1 deliverable: Home Page, Club Directory, Club Details, and the shared
Navigation/Footer, built against the tech stack in the brief.

## Tech stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Data fetching:** TanStack React Query
- **HTTP client:** Axios
- **Icons:** lucide-react

## Design concept

A campus "cork board & flyer" identity — each club is a pinned flyer card,
the homepage hero is a literal cork-textured board, and the club details
page reads like a full poster with a torn-paper header and a ticket-stub
sidebar for meeting info. Palette: warm cork brown, ink black, flyer yellow,
and poster red/moss accents. Display type is a bold condensed poster face
(Anton), body copy is Inter, and meta/data (tags, member counts, meeting
info) use a monospace face (JetBrains Mono) to read like stamped flyer
details.

## Getting started

```bash
npm install
npm run dev
```

The app runs standalone out of the box — no backend required. Requests made
through `src/lib/axiosClient.ts` are intercepted by `src/lib/mockAdapter.ts`,
which simulates the real REST contract (with network delay) using the mock
dataset in `src/data/mockClubs.ts`.

## Connecting the real Clubs API

1. Remove the `import "./lib/mockAdapter"` line in `src/main.tsx`.
2. Create a `.env` file with:

   ```
   VITE_API_BASE_URL=https://your-api-host/v1
   ```

3. The app expects these endpoints (already implemented in
   `src/lib/clubsApi.ts`):

   - `GET /clubs?search=&category=` → `Club[]`
   - `GET /clubs/:slug` → `Club`
   - `GET /categories` → `ClubCategory[]`

   Match the `Club` shape in `src/types/club.ts`, or adjust that file to fit
   the real API response.

## Project structure

```
src/
  components/
    layout/      Navbar, Footer, Layout (route shell)
    ui/          PinnedCard, Tag, CardSkeleton, EmptyState, ErrorState
  data/          mockClubs.ts — local dataset for the mock API
  lib/           axiosClient, mockAdapter, clubsApi, queries (React Query hooks), colorMap
  pages/         Home, ClubDirectory, ClubDetails, NotFound
  types/         club.ts — shared domain types
```

## Notes

- Fully responsive from mobile up (hamburger nav below `sm`).
- Loading, empty, and error states are handled on both the Directory and
  Details pages.
- Directory search + category filters are reflected in the URL
  (`/clubs?search=...&category=...`), so filtered views are shareable and
  back-button friendly.
- Keyboard focus is visible everywhere (`:focus-visible` ring), and
  `prefers-reduced-motion` disables the smooth-scroll/animation timing.
