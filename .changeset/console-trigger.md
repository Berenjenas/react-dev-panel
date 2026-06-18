---
"@berenjena/react-dev-panel": minor
---

Add a browser-console API for the panel. When the panel is in use, `window.devPanel` exposes `open()`, `close()` and `toggle()`, so developers can drive the panel from the console in addition to the keyboard hotkey. It's registered alongside the panel lifecycle (SSR-safe, not present when the panel is disabled) and a one-line discovery hint is logged on mount. The `DevPanelConsoleApi` type is exported for typing `window.devPanel`.
