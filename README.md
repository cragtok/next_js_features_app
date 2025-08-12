# Next.js Features Application

## Introduction

An application which demonstrates the major features of Next.js

### Routing

Basic routing - Homepage containing a menu of all the pages in the application.

Dynamic routing - A page containing a dynamic route segment.
- Display the segment to the user.
- Pre-render certain unique dynamic routes.

### Data Fetching

SSR - A page that displays data that changes frequently, like current stock prices or a real-time news feed.
- Use server component
- Use a loading UI
- May also add manual delay for testing

SSG - A static page that pre-renders in build time
- A static blog page with a few pre-rendered posts.
- Emphasize that these pages are fast because they're built once.

ISR - A page that displays content (e.g., a product list) that is mostly static but might need occasional updates.
- Show how the content updates after a specified revalidate time without a full redeploy.
- Example: ISR page that shows time and date, caches page for 30s and then renders it again with new time and date

CSR - Using `useEffect` or a client-side data fetching library (like SWR or React Query) in a Client Component.
- Add some dynamic features

### Streaming (with Suspense)

A page that loads different parts of its content over time, using Suspense boundaries to show loading indicators while waiting for data.
- streams in 3 components one after another
- based on server components and suspense boundaries
- each component has a timeout of 2s
- components are nested within each other

### Server Actions

A page with a form that uses a Server Action to update some data and then revalidates cached data or updates the UI without a separate API route.
 
### Middleware

Redirect a percentage of users to an alternative version of a page (e.g., `/home-a` vs. `/home-b`) or inject a feature flag into the request, which components can then read to render different UI.

### API Routes

API Route - Form Submission: A simple form that submits data to an API route, and the API route processes it (e.g., saves to a mock database or logs it).
API Route - Data Proxy: An API route that acts as a proxy to an external API, demonstrating how to keep API keys secure on the server.

### Image Optimization

A page with several images, demonstrating lazy loading, different image sizes for responsiveness, and improved performance metrics.

## Partial Prerendering

mabye

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

