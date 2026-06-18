---
"@berenjena/react-dev-panel": minor
---

Improve SSR/Next.js compatibility and runtime robustness:

-   **`enabled` flag**: `useDevPanel`'s third argument accepts `enabled?: boolean` (default `true`). When `false` the call is a no-op — its section is not registered and the panel is not mounted — so consumers can disable the panel at runtime in production, e.g. `useDevPanel("Home", controls, { enabled: import.meta.env.DEV })`.

-   **SSR-safe imports**: stores no longer touch `document`/`localStorage` at module-import time, so the package can be imported in Node/SSR environments (Next.js, Remix, Astro) without `document is not defined`.
-   **Next.js App Router**: emit the `"use client"` directive on built chunks so the panel works in React Server Components setups.
-   **Auto-mount lifecycle**: the portal root is now tracked and can be torn down/re-mounted cleanly (no orphaned roots or stuck global flag on HMR).
-   **Persisted value validation**: values restored from `localStorage` are type-checked against their control before being applied; mismatched/corrupt values are dropped instead of injected into consumer state.
-   **Error isolation**: each control renders inside an error boundary, and consumer `onChange` errors are caught — a single broken control can no longer crash the whole panel.
-   **Persistence resilience**: `localStorage` quota/serialization failures are reported once instead of failing silently.
-   **Subpath exports**: `package.json` now exposes subpath `exports` for tree-shakeable per-module imports.
-   **Leaner CSS output**: the design-token `:root` block is no longer duplicated into every component's stylesheet — it's emitted once and loaded with the panel, shrinking the shipped CSS.
-   Replaced fragile double-`JSON.stringify` comparisons with a structural `deepEqual` (key-order independent, detects handler-only changes).
-   Fixed a missing `HotkeyConfig` type import that degraded `hotKeyConfig` typings to `any` for consumers.
