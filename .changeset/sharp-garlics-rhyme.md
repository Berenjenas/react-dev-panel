---
"@berenjena/react-dev-panel": minor
---

## Documentation and Portal Management Improvements

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
