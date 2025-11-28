# SOLUTION.md

## Architecture Overview

This project is built using `NextJS` (React + TypeScript). The app is organized into feature-based folders, separating API logic, UI components, hooks, and context providers. Data is served via a custom mock REST API using local JSON stubs and handlers using `MSW`, ensuring no third-party APIs are used.

## State Management Approach

- **View State (Search/Filter/Sort):**
  - Managed via Next.js router and URL query parameters. All search, filter, and sort states are encoded in the URL, enabling shareable links. UI components read from and update the URL, not just local state.
- **Global State (Saved Items):**
  - Some state is managed using React Context (`SavedProductsProvider`). Persistence is achieved via localStorage, ensuring saved items remain across browser sessions. Custom hook (`useLocalStorage`) abstracts localStorage logic for reliability and testability.
- **Component State:**
  - Used for transient UI states (loading, error, etc.), keeping components simple and focused.

**Trade-offs:**

- URL-based state for shareability and navigation.
- Context for cross-component state with persistence.
- Avoided Redux/Zustand for simplicity.

## API Abstraction

- All data fetching is abstracted into dedicated server-side utilities (e.g., `serverGetProduct.ts`, `serverGetSearch.ts`).
- UI components never fetch data directly; they consume data via props or hooks.
- The mock API is implemented using local JSON and handler files, simulating REST endpoints for products, search, and tags.

**Trade-offs:**

- Initially started building a separate `NestJS` app to server as the api for the frontend, but scrapped that to save time.

## Responsiveness & Accessibility

- Layouts and components use responsive CSS (SCSS modules) and flex/grid for mobile-first design.
- Touch targets are sized for mobile accessibility.
- ARIA attributes and keyboard navigation are implemented for screen reader support.

**Trade-offs:**

- Would have loved more time to flesh this out more, keyboard navigation on the search screen could be much better.

## Performance & Reliability

- Pagination is used to efficiently handle large product datasets.
- Loading and error states are handled gracefully in all major components.
- Error boundaries to handle unexpected errors and communicate issue to users.

## Running Locally

1. **Install dependencies:**
   ```sh
   yarn
   ```
2. **Start the development server:**
   ```sh
   yarn dev
   ```

---
