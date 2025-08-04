# @berenjena/react-dev-panel

## 2.0.0

### Major Changes

-   af4f1e0: feat: major architecture improvements with auto-mounting and createPortal

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

### Minor Changes

-   fd83152: feat: refactor design system and add theme customization

    -   **Refactored design system** for better consistency and maintainability
    -   **Added theme customization** capabilities with store/restore functionality
    -   **Added MultiSelect control** as a new component option
    -   **Refactored Color control** with enhanced functionality
    -   **Changed drag & drop events to pointer events** for better cross-device support
    -   **Enhanced controls documentation** for improved developer experience
    -   **Removed autodocs** to streamline documentation approach
    -   **Minor general improvements** across the codebase

-   7078bcc: feat: integrate changesets for versioning and release management

    -   Added changesets configuration files and README for usage guidance.
    -   Updated package.json to include changesets CLI and new scripts for release management.
    -   Created GitHub Actions workflow for automated release process on main branch.
    -   Added CONTRIBUTING.md to guide contributors on using changesets for updates.
    -   Introduced a new changeset for tracking the addition of changesets functionality.

### Patch Changes

-   c00cbcd: Fixed multi select dropdown position on dev panel drag
