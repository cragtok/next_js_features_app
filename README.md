# Next.js Features Application

## Introduction

This is a Next.js application that serves as a demonstration of Next.js's major features. I made this app to learn Next.js and practice what I have learned. It's an ideal resource for developers looking to understand various Next.js functionalities and can also be used as a practical project for practicing deployments on platforms like Vercel or a custom VPS.

The following features are demonstrated on this app:
- ⚛️ Client Components
- 🖥️ Server Components
- 🔗 Static Routing
- 🔄 Dynamic Routing
- 🖼️ Rendering
- 📥 Data Fetching
- 🌊 Streaming
- ⚡ Server Actions
- 🛣️ Route Handlers
- 🚦 Middleware

## Contents

*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
*   [Running](#running)
    *   [Installation](#installation)
    *   [Setting Environment Variables](#setting-environment-variables)
    *   [Running Development Build](#running-development-build)
    *   [Running Production Build](#running-production-build)
*   [Tests](#tests)
    *   [End-to-End (E2E) Tests](#end-to-end-e2e-tests)
    *   [Component Tests](#component-tests)
*   [Features](#features)
    *   [🍱 Components](#-components)
        *   [Server Components](#server-components)
        *   [Client Components](#client-components)
    *   [🛣 Routing](#-routing)
        *   [Static Routing](#static-routing)
        *   [Dynamic Routing](#dynamic-routing)
    *   [🖼️ Rendering and 📥 Data Fetching](#️-rendering-and--data-fetching)
        *   [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
        *   [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
        *   [Static Site Generation (SSG)](#static-site-generation-ssg)
        *   [Client-Side Rendering (CSR)](#client-side-rendering-csr)
    *   [🌊 Streaming](#-streaming)
        *   [Streaming With Loading.tsx](#streaming-with-loadingtsx)
        *   [Streaming With Suspense](#streaming-with-suspense)
    *   [⚡ Server Actions](#-server-actions)
    *   [🛣️ Route Handlers](#️-route-handlers)
    *   [🚦 Middleware](#-middleware)
        *   [A/B Testing](#ab-testing)
        *   [Request Logging](#request-logging)
*   [🗄️ Database](#️-database)
*   [Built With](#built-with)
*   [License](#license)

## Getting Started

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/en/) (version 18 or higher)
* [pnpm](https://pnpm.io/) (recommended) or [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)

You will need API keys from these services:
- [Twelve Data](https://twelvedata.com/)
- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Turso](https://turso.tech/)

## Running

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/cragtok/next_js_features_app.git
    cd next_js_features_app
    ```

2.  **Install dependencies:**

    It is recommended to use `pnpm` as a package manager for this project. If you don't have `pnpm` installed, you can install it globally:

    ```bash
    npm install -g pnpm
    ```

    Then, install the project dependencies using `pnpm`:

    ```bash
    pnpm install

    ```

    Alternatively, you can use `npm` if required:

    ```bash
    npm install
    ```

### Setting Environment Variables

Before running the application, you need to set up the environment variables.

This project uses environment variables for different modes (development, production, and testing). Template files are provided in the root directory:
*   `.env.development.template`
*   `.env.production.template`
*   `.env.test.template`

To set up your environment variables:
1.  **Rename the appropriate template file:** For example, to run the app in development mode, rename `.env.development.template` to `.env.development`.
2.  **Fill in the values:** Open the renamed `.env` file and replace all `<your value here>` placeholders with your actual API keys and URLs.
    1. `GEMINI_API_KEY`: API key from Google AI Studio.
    2. `TWELVE_DATA_API_KEY`: API key from Twelve Data.
    3. `DOMAIN_URL`: The URL of the running application in development or production. Should be `http://localhost:<port>` (where `<port>` is usually `3000` or some other port) if running locally in development mode, or the domain name of the hosted production application if running on a VPS or PaaS.
    4. `TURSO_DATABASE_URL`: The URL of the SQLite database that is hosted on Turso.
    5. `TURSO_AUTH_TOKEN`: The authentication token used access the SQLite database that is hosted on Turso.
    6. `NODE_ENV`: Set to `"production"`, `"development"` or `"test"`, depending on which file is being used.

### Running Development Build

1.  **Seed the database (optional)**

    If you want to clear the SQLite database and populate it with some sample data, run the database seed script:

    ```bash
    pnpm db:seed:dev
    ```

    Alternatively, using `npm`:

    ```bash
    npm run db:seed:dev
    ```

2.  **Run the development server:**

    Using `pnpm`:

    ```bash
    pnpm dev
    ```

    Alternatively, using `npm`:

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000` (or another port if 3000 is in use).

### Running Production Build

1.  **Seed the database (optional)**

    If you want to clear the SQLite database and populate it with some sample data, run the database seed script:

    ```bash
    pnpm db:seed:prod
    ```

    Alternatively, using `npm`:

    ```bash
    npm run db:seed:prod
    ```

2.  **Generate production build:**

    Using `pnpm`:

    ```bash
    pnpm build
    ```

    Alternatively, using `npm`:

    ```bash
    npm run build
    ```

3.  **Start production server:**

    Using `pnpm`:

    ```bash
    pnpm start
    ```

    Alternatively, using `npm`:

    ```bash
    npm run start
    ```

    The production application will also be accessible at `http://localhost:3000` (or another port if 3000 is in use).

**Build Minimization**

The `app/api` folder contains an API that is used in [End-to-End (E2E) testing](#end-to-end-e2e-tests) to clear and seed the database when running tests.
- This API is only needed in E2E testing, and is therefore excluded from the production build of the application.
- This is done by running a `scripts/preinstall.ts` script before the production build, which temporarily moves the `app/api` folder out of the `app` folder, and a `scripts/postinstall.ts` script which returns it back after the build has finished.
- The `build` script defined in `package.json` performs these steps automatically.
- On the other hand, the `build:test` script is used to run a production build specifically for E2E testing. This script simply runs the normal `next build` command while including the `app/api` folder in the production build.

## Tests

This project includes both End-to-End (E2E) tests and Component (Unit) tests to ensure the application's functionality and reliability.

Before running the tests, ensure that you have set up environment variables as demonstrated in the [environment variables section](#setting-environment-variables).

### End-to-End (E2E) Tests

End-to-End (E2E) tests simulate real user interactions with the deployed application in a browser environment. They verify that the entire application flow, from the user interface to the backend, works as expected. You can find these tests in the `cypress/e2e/` directory.

To run the E2E tests:

1.  **Generate testing production build:**

    Using `pnpm`:

    ```bash
    pnpm build:test
    ```

    Alternatively, using `npm`:

    ```bash
    npm run build:test
    ```

2.  **Start production server:**

    Using `pnpm`:

    ```bash
    pnpm start
    ```

    Alternatively, using `npm`:

    ```bash
    npm run start
    ```

    The production application will also be accessible at `http://localhost:3000` (or another port if 3000 is in use).

3.  **Run E2E tests**

    Run in headless mode (CLI):

    Using `pnpm`:

    ```bash
    pnpm cypress:run
    ```

    Alternatively, using `npm`:

    ```bash
    npm run cypress:run
    ```

    To run a specific test file:

    ```bash
    pnpm cypress:run --spec "cypress/e2e/path/to/your/test.cy.ts"
    # or with npm
    npm run cypress:run --spec "cypress/e2e/path/to/your/test.cy.ts"
    ```

    Alternatively, to open the Cypress Test Runner UI and run tests from there:

    Using `pnpm`:

    ```bash
    pnpm cypress:open
    ```

    Alternatively, using `npm`:

    ```bash
    npm run cypress:open
    ```

### Component Tests

Component tests (also known as unit tests) focus on testing individual React components in isolation. They ensure that each component renders correctly, responds to props and state changes, and behaves as expected without relying on the full application stack. These tests are located in the `__tests__/` directory.

To run the Component tests:

*   **Run all tests:**

    Using `pnpm`:

    ```bash
    pnpm test
    ```

    Alternatively, using `npm`:

    ```bash
    npm run test
    ```

*   **Run tests in watch mode (for development):**

    Using `pnpm`:

    ```bash
    pnpm test:watch
    ```

    Alternatively, using `npm`:

    ```bash
    npm run test:watch
    ```

## Features

Here is an explanation of all the different Next.js features the app demonstrates.

### 🍱 Components

**Route Folder:** `app/components/`

Demonstrates the use of server and client components in Next.js.

#### Server Components

**Route:** `/components/server`

A simple page demonstrating the use of Server Components in Next.js. For each request, it sends the time on the server and a random number to the client.

#### Client Components

**Route:** `/components/client`

A simple page demonstrating the use of Client Components in Next.js. It contains a simple Client Component consisting of a button that increments a counter when clicked.

### 🛣 Routing

**Route Folder:** `app/routing/`

Demonstrates how routing works in Next.js.

#### Static Routing

**Route:** `/routing/static`

A simple page demonstrating the use of Static Routing in Next.js. It is just a static page with a fixed route.

#### Dynamic Routing

**Routes:** `/routing/dynamic`, `/routing/dynamic/[...slug]`

Consists of a page at `/routing/dynamic` that contains a form where the user can enter a string representing a dynamic route segment.
- Submitting the form navigates to the page represented by the `/routing/dynamic/[...slug]` route where the `[...slug]` represents the catch-all dynamic route entered by the user.
- This page simply accesses the dynamic route segment and displays it back to the user.

### 🖼️ Rendering and 📥 Data Fetching

**Route Folder:** `app/rendering/`

Demonstrates the different rendering strategies in Next.js, along with data fetching for each strategy.

#### Server-Side Rendering (SSR)

**Route:** `/rendering/ssr`

A page that demonstrates SSR by fetching a random quote on the server from [The Quotes Hub API](https://thequoteshub.com) on each request.

#### Incremental Static Regeneration (ISR)

**Route:** `/rendering/isr`

A page that demonstrates ISR by fetching the prices of various cryptocurrencies on the server from [Twelve Data API](https://twelvedata.com/). The prices are re-fetched after a revalidation time of 10 seconds.

#### Static Site Generation (SSG)

**Route:** `/rendering/ssg`

A page that demonstrates SSG by showing the result of fetching the dates and times of various cities around the world at build time. Google's Gemini model is prompted for the dates and times at build time, and the reponse is formatted and embedded on the page.

#### Client-Side Rendering (CSR)

**Route:** `/rendering/csr`

A page that demonstrates CSR by fetching a random joke from the [icanhazdadjoke](https://icanhazdadjoke.com/) API each time a button is clicked. The fetch is done completely on the client using React Query.

### 🌊 Streaming

**Route Folder:** `app/streaming/`

Demonstrates the different ways of streaming content from the server to the client in Next.js.

#### Streaming With Loading.tsx

**Route:** `/streaming/loading`

A page that demonstrates how a loading UI in a `loading.tsx` file can be shown while content is being streamed.

#### Streaming With Suspense

**Route:** `/streaming/suspense`

A page that demonstrates using React `Suspense` boundaries with a fallback loading UI while content is being streamed.

### ⚡ Server Actions

**Route Folder:** `app/server-actions`

Demonstrates the use of server actions to submit form data from the client to the server.

**Route:** `/server-actions`

A page consisting of a list of users fetched from a database and a form for creating new users.
- The user inputs the information of a into the form.
- Submiting the form passes the data to a server action that processes the data and uses it to create a new user in the database.
- More information on the database can be found in the [database section](#️-database)

### 🛣️ Route Handlers

**Route Folder:** `app/route-handlers`

Demonstrates using route handlers to create a basic REST API that can perform CRUD operations on a database.

**Route:** `/route-handlers`

A page consisting of a list of users fetched from a database and a form for creating/editing new users.
- The form interacts with the route handlers to perform CRUD operations.

**API:** `/route-handlers/my-api`

This is an API built using route handlers for performing CRUD operations on users in the SQLite database.
- More information on the database can be found in the [database section](#️-database)

### 🚦 Middleware

**Route Folder:** `app/middleware`

Demonstrates the use of middleware in Next.js.

#### A/B Testing

**Route:** `/middleware/ab-testing`

A page that demonstrates simple A/B Testing using Next.js middleware.
- When the page is requested by the user, middleware randomly places a user in one of two groups by setting a cookie whose value is the group.
- The page shows some text that varies in content and color based on the cookie value.

#### Request Logging

**Route:** `/middleware/log`

A page that shows the values of various request headers set by middleware.

## 🗄️ Database

An SQLite database is used in this app to demonstrate server action mutations and route handler CRUD operations.
- The database is hosted on [Turso](https://turso.tech/) and [Drizzle](https://orm.drizzle.team/) is used as the ORM layer.
- It contains just one table called "users".
- The `lib/database` folder handles any database-related functionality in application.
    - The `db.ts` file creates the database client that is used throughout the application.
    - The `databaseHandler.ts` file contains the interface used to perform operations on the database.
    - The schema for the "users" table can be found in the `schema.ts` file.
    - In the `constants.ts` file, the `MAX_USERS` constant specifies the maximum number of items which are allowed in the database.
        - When a new item is added, and this limit is exceeded, the oldest item in the database will be deleted to make room for the new item.
- To clear the table and seed it with some sample users, run the `scripts/seed.ts` script which can be run using `pnpm` or `npm`.
    - The `db:seed:dev` package.json script seeds the development database (defined in the development environment variable file), while `db:seed:prod` seeds the production database (defined in the production environment variable file).
    - The seed script will also create the table in the database if it does not already exist.

## Built With

* [Next.js](https://nextjs.org/) - A React framework for building full-stack web applications.
* [React](https://react.dev/) - A JavaScript library for building user interfaces.
* [TypeScript](https://www.typescriptlang.org/) - A strongly typed superset of JavaScript that compiles to plain JavaScript.
* [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
* [Shadcn/ui](https://ui.shadcn.com/) - A collection of reusable components built using Radix UI and Tailwind CSS.
* [Jest](https://jestjs.io/) - A delightful JavaScript Testing Framework used for component tests.
* [React Testing Library](https://testing-library.com/react/) - A set of utilities for testing React components.
* [Cypress](https://www.cypress.io/) - A fast, easy, and reliable testing for anything that runs in a browser, used for E2E tests.
* [libSQL](https://github.com/tursodatabase/libsql) - An open source, open contribution fork of SQLite, created and maintained by [Turso](https://turso.tech/).
* [Drizzle](https://orm.drizzle.team/) - A simple and lighweight TypeScript ORM.
* [pnpm](https://pnpm.io/) - A fast, disk space efficient package manager used for managing project dependencies.
* [Lucide React](https://lucide.dev/) - A collection of beautiful and customizable open-source icons.
* [Zod](https://zod.dev/) - A TypeScript-first schema declaration and validation library.
* [Pino](https://getpino.io/) - A very fast, low overhead Node.js logger.

## License

This project is licensed under the [MIT License](LICENSE).
