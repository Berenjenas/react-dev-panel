---
"@berenjena/react-dev-panel": major
---

feat: major architecture improvements with auto-mounting and createPortal

**BREAKING CHANGE**: Complete architectural refactor from manual DOM manipulation to React's createPortal system.

-   Refactored DevPanel to use React createPortal for proper React integration
-   Added auto-mounting system that eliminates need for manual DevPanel component placement
-   Implemented smart lifecycle management with 1s grace period to prevent unnecessary mount/unmount cycles
-   Added intelligent props merging from multiple useDevPanel calls
-   Enhanced useDevPanel hook with third parameter support for DevPanel configuration options
-   Created comprehensive Matrix story demonstrating reactive controls with Canvas Matrix effect
-   Enhanced Boolean story with Developer Triangle game demonstrating constraint logic
-   Added real-time configuration updates and dynamic control visibility
-   Reduced bundle size by eliminating custom DOM manipulation code
-   Updated all existing functionality to work seamlessly with zero migration required
-   Styles adjustment
