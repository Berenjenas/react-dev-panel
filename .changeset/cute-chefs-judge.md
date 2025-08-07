---
"@berenjena/react-dev-panel": minor
---

## New Features

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
