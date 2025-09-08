# @berenjena/react-dev-panel

## 2.3.0

### Minor Changes

-   a3eb29d: # Automatic Control Persistence

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

### Patch Changes

-   8573d88: style: enhance word-breaking and overflow handling in select control

## 2.2.0

### Minor Changes

-   edd7244: ## New Features

    ### Drag and Drop Control Component

    -   **New Component**: Added `DragAndDropControl` component for file uploads with drag and drop functionality
    -   **File Type Validation**: Supports configurable file type restrictions (e.g., images only)
    -   **Visual Feedback**: Provides drag-over styling and file validation feedback
    -   **Error Handling**: Comprehensive error handling for invalid files and upload failures
    -   **Accessibility**: Full keyboard and screen reader support

    ### Color Extractor Utility

    -   **New Utility**: Added comprehensive color extraction functionality from images
    -   **Smart Analysis**: Extracts dominant colors with configurable options:
        -   Maximum number of colors to extract
        -   Color tolerance for grouping similar colors
        -   Quality settings for performance optimization
        -   Brightness filtering (exclude dark/light colors)
        -   Minimum percentage thresholds
    -   **Multiple Export Functions**:
        -   `extractColorsFromFile()` - Main extraction function
        -   `extractColorsFromFileInfo()` - Convenience wrapper for DragAndDropControl
        -   `getDominantColor()` - Get single most dominant color
        -   `createColorPalette()` - Generate color palette arrays
    -   **TypeScript Support**: Full type definitions with `ColorInfo` and `ColorExtractionOptions` interfaces

    ### Integration Stories

    -   **Color Extractor Demo**: Interactive Storybook story demonstrating color extraction from uploaded images
    -   **Profile Card Demo**: Example implementation showing practical usage patterns
    -   **Matrix Demo**: Enhanced styling organization

    ## Technical Improvements

    ### Component Architecture

    -   Extended `ControlRenderer` to support the new drag-and-drop control type
    -   Updated control type definitions and mappings
    -   Enhanced `DevPanel` component integration

    ### File Organization

    -   Refactored CSS modules to standard CSS for better organization
    -   Added comprehensive type definitions for all new components
    -   Modular utility structure for color extraction functionality

    ### Developer Experience

    -   Complete Storybook integration with interactive demos
    -   Comprehensive JSDoc documentation
    -   Example usage patterns and configuration options
    -   Error handling demonstrations

-   06fe8f4: Updated Text control to use an auto-expanding textarea

## 2.1.0

### Minor Changes

-   d4ad506: ## Bundle Size Optimization and Enhanced Documentation

    ### ✨ New Features

    -   Added comprehensive Storybook stories for all control types with interactive examples
    -   Enhanced Select component with improved dropdown positioning and viewport awareness
    -   Introduced Theme Builder utility for custom theme creation and export
    -   Added detailed JSDoc documentation for all control components

    ### 🎨 UI Improvements

    -   Improved component styling consistency across all controls
    -   Enhanced Select dropdown positioning with better portal-based rendering
    -   Streamlined theme variables and modernized SCSS architecture
    -   Better visual feedback and accessibility improvements

    ### 📦 Bundle Size Reduction

    -   Optimized build configuration to exclude story files and tests from production bundle
    -   Removed deprecated theme files and unused SCSS modules
    -   Improved tree-shaking efficiency through better file organization
    -   Eliminated dead code from theme system and utilities

    ### 🏗️ Code Organization

    -   Reorganized stories into structured `src/stories/` directory layout
    -   Cleaned up project structure by removing redundant files
    -   Improved component architecture with better separation of concerns
    -   Enhanced TypeScript compilation settings for smaller output

    ### 🔧 Technical Improvements

    -   Better event handling and accessibility in Select components
    -   More efficient CSS variable management in theme system
    -   Streamlined build process for faster compilation
    -   Improved developer experience with comprehensive examples

    This release significantly reduces bundle size while providing enhanced documentation and improved component functionality.

-   96ae079: ## Documentation and Portal Management Improvements

    ### 📚 Documentation Enhancements

    -   **Complete API documentation overhaul**: Updated `Doc.mdx` and `README.md` to reflect the simplified architecture where `useDevPanel` is the only export
    -   **HTML table format**: Converted Markdown tables to HTML for better compatibility in MDX
    -   **Accurate hotkey documentation**: Fixed hotkey configuration examples to show the correct `hotKeyConfig` object format instead of string-based config
    -   **Zero-configuration emphasis**: Updated documentation to highlight that no providers, components, or additional setup is required

    ### 🔧 Portal Management Improvements

    -   **Smart auto-unmounting**: Enhanced `DevPanelPortal` to automatically unmount when no sections are active, reducing DOM footprint
    -   **Better lifecycle management**: Improved integration between `DevPanelManager` and portal rendering for cleaner component lifecycle

    ### 🎨 Storybook Configuration

    -   **Manager customization**: Added `.storybook/manager.ts` with custom layout settings for better development experience
    -   **Enhanced Matrix story**: Improved theming and visual effects in the Matrix demo story

    ### 🎯 Style Refinements

    -   **Select component**: Simplified dropdown styles and removed unused CSS rules
    -   **Range control**: Minor styling adjustments for better visual consistency

    This release focuses on improving the developer experience through better documentation and more efficient portal management, while maintaining full backward compatibility.

### Patch Changes

-   28e0ee4: Removed barrel imports

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
