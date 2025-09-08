---
"@berenjena/react-dev-panel": minor
---

# Automatic Control Persistence

Added built-in persistence functionality to React Dev Panel controls. Controls can now automatically save and restore their values across page reloads using localStorage.

## New Features

-   **`persist` property**: Add `persist: true` to any control to enable automatic persistence
-   **`controlPersistenceService`**: New service for manual persistence control
-   **`getInitialValue` helper**: Utility function for initializing state with persisted values
-   **Automatic cleanup**: Persisted values are automatically cleaned up when components unmount

## Breaking Changes

None - this is a fully backward-compatible addition.

## Documentation

-   Added comprehensive persistence guide (`guides/PERSISTENCE.md`)
-   Updated all control documentation with persistence examples
-   Enhanced advanced usage guide with persistence patterns
-   Updated README with persistence feature overview

This enhancement improves developer experience by eliminating the need for manual localStorage implementation while providing fine-grained control over which values should persist.
