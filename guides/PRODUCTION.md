# Production & SSR

How to disable the panel in production, what that does (and does **not**) do to your
bundle, and how to strip the code out entirely.

## Disabling at runtime with `enabled`

`useDevPanel` accepts an `enabled` flag in its third argument. When it is `false`, the
call becomes a no-op: the section is not registered, persisted values are not restored,
and the panel is not mounted.

```tsx
useDevPanel(
	"Settings",
	{
		name: { type: "text", value: name, onChange: setName },
	},
	{
		// Vite
		enabled: import.meta.env.DEV,
		// Webpack / Next / CRA
		// enabled: process.env.NODE_ENV !== "production",
	},
);
```

-   Defaults to `true`, so existing code keeps working unchanged.
-   It is **per call**. The panel still renders as long as at least one `useDevPanel`
    call is enabled, so you can disable individual sections independently.
-   You can flip it at runtime (e.g. behind a feature flag) — turning it off unregisters a
    section that was previously shown.

## ⚠️ `enabled` does not remove the code from your bundle

This is important: `enabled: false` stops the panel from **running**, but the library
code is still **imported and bundled**. Your users still download it.

`enabled` is the right tool for hiding the panel in production. It is **not** a
bundle-size optimization. If you also want the code gone from the production bundle, you
need build-time stripping — see below.

## Removing the panel from the production bundle

### Option A — Conditional import (no tooling)

Keep the import out of your production graph by loading the panel only in development.
Because the import never happens in production, bundlers tree-shake it away.

```tsx
// useDevTools.ts
export function useDevTools(section: string, controls: unknown): void {
	if (import.meta.env.DEV) {
		// Dynamically imported only in dev builds.
		import("@berenjena/react-dev-panel").then(({ useDevPanel }) => {
			// ...wire up controls
		});
	}
}
```

This works but is awkward with the hook (you can't call a hook from inside a `.then`).
In practice the cleanest "no code in prod" approach is a build plugin that replaces the
package with a no-op — Option B.

### Option B — A Vite plugin that stubs the package (idea)

> This is an **illustrative example**, not part of the library. Adapt it to your setup
> and test it against your build before relying on it.

Rather than trying to rewrite every call site, the simplest and most robust approach is
to replace the whole package with a tiny no-op module during production builds. The real
package is then never pulled into the graph, so the bundler drops it completely — no
regex, no scanning of your source.

```ts
// vite-plugin-stub-dev-panel.ts
import type { Plugin } from "vite";

export interface StubDevPanelOptions {
	/**
	 * Force the plugin on/off. When omitted, it activates automatically on
	 * production builds (`vite build`) and stays off for `vite serve` (dev).
	 */
	strip?: boolean;
	/** Package id to replace. Defaults to the dev-panel package. */
	moduleId?: string;
}

const VIRTUAL_STUB = "\0virtual:dev-panel-stub";

export function stubDevPanel(options: StubDevPanelOptions = {}): Plugin {
	const moduleId = options.moduleId ?? "@berenjena/react-dev-panel";
	let active = options.strip ?? false;

	return {
		name: "stub-dev-panel",
		// Only relevant at build time; dev server keeps the real panel.
		apply: "build",

		config(_config, env) {
			if (options.strip === undefined) {
				active = env.command === "build";
			}
		},

		resolveId(id) {
			// Intercept any import of the package and point it at our stub.
			return active && id === moduleId ? VIRTUAL_STUB : null;
		},

		load(id) {
			if (id !== VIRTUAL_STUB) return null;

			// No-op replacements for the public runtime API. Types are erased at
			// build time, so only the runtime exports need a stub.
			return ["export function useDevPanel() {}", "export default {};"].join("\n");
		},
	};
}
```

Wire it up so it only strips production builds:

```ts
// vite.config.ts
import { defineConfig } from "vite";

import { stubDevPanel } from "./vite-plugin-stub-dev-panel";

export default defineConfig({
	plugins: [
		// ...your other plugins
		stubDevPanel(), // auto-strips on `vite build`, no-op in dev
	],
});
```

Now `import { useDevPanel } from "@berenjena/react-dev-panel"` resolves to an empty
function in production builds, and the panel's code never reaches your users — while
`npm run dev` keeps the full panel.

Pair this with `enabled: import.meta.env.DEV` at the call sites for defense in depth: the
flag guarantees correct runtime behaviour even in builds where the plugin is not present,
and the plugin guarantees the bytes are gone where it is.

## SSR / Next.js

The package is import-safe in non-browser environments: importing it on the server does
not touch `document` or `localStorage`, and the build ships the `"use client"` directive,
so it works under the Next.js App Router (React Server Components). The panel itself only
mounts and renders on the client.
