# Next.js Features Application

## Introduction

An application which demonstrates the major features of Next.js

Features
- [X] Routing
    - [X] Basic Routing
    - [X] Dynamic Routing
- [.] Rendering and Data Fetching
    - [X] SSR
    - [ ] SSG
        - [ ] Make request using Gemini API
    - [ ] Erro boundaries - test with SSG
    - [ ] ISR
- home page
    - change feature description text
    - Icons??

Cleanup, Refactor and Final Actions
- Use env vars for API urls
- Rename Routes
- NotFound page
- Route length limit
- refactor types
- refactor Header component logic
- routeTitles
    - convert routeTitles to output of reducing pageRoutes
    - Refactor routePath array calculation
- Change description text on all pages
- Accessibility
- SEO and Metadata
- Tests?
- README

### Routing

Basic routing - `/routes/basic`
- A page using basic routing.
- Access the route and display it to the user.

Dynamic routing - `/routes/dynamic/[slug]`
- A page containing a dynamic route segment `[slug]`.
- Display the dynamic segment back to the user.
- Pre-render certain unique dynamic routes.

### Rendering and Data Fetching

SSR - `/rendering/ssr`
- A page that displays data that changes frequently, like current stock prices or a real-time news feed.
- Use server component
- Use a loading UI
- May also add manual delay for testing

SSG - `/rendering/ssg`
- A static page that pre-renders during build time.
- Example: A static blog page with a few pre-rendered posts.

ISR - `/rendering/isr`
- A page that displays content (e.g., a product list) that is mostly static but might need occasional updates.
- Show how the content updates after a specified revalidate time without a full redeploy.
- Example: ISR page that shows time and date, caches page for 30s and then renders it again with new time and date

CSR - `/rendering/csr`
- Using `useEffect` or a client-side data fetching library (like SWR or React Query) in a Client Component.
- Add some dynamic features

### Streaming (with Suspense)

Streaming  - `/streaming`
- A page that loads different parts of its content over time, using Suspense boundaries to show loading indicators while waiting for data.
- Streams in 3 components one after another
- based on server components and suspense boundaries
- each component has a timeout of 2s
- components are nested within each other

### Server Actions

Server Action - `/server-action`.
- A page with a form that uses a Server Action to update some data and then revalidates cached data or updates the UI without a separate API route.
 
### Route Handlers

GET request - `/route-handlers/GET`
- A basic GET request made to a route handler.
- The Route Handler fetches data from an external API.

POST request - `/route-handlers/POST`
- Create a simple form (e.g., name, email, message).
- On submission, use fetch to POST the data to the Route.
- Display a success message or error to the user.
- On success, show what the user entered.

### Middleware

AB-testing - `/middleware/ab-testing`
- Redirect a percentage of users to an alternative version of a page (e.g., `/home-a` vs. `/home-b`) or inject a feature flag into the request, which components can then read to render different UI.

User Info logging - `/middleware/log`
- Log the user's IP, useragent, requested path, timestamp

### Image Optimization??

A page with several images, demonstrating lazy loading, different image sizes for responsiveness, and improved performance metrics.

## Partial Prerendering??

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

