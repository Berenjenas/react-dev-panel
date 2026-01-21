# Bundle Size Tracking

This document explains how bundle size is tracked and monitored in the react-dev-panel library.

## Overview

We use a combination of tools to ensure the library stays lightweight:

-   **size-limit**: Sets size budgets for different import patterns
-   **bundlewatch**: Tracks bundle size changes in PRs
-   **Custom analyzer**: Provides detailed bundle composition reports

## Current Bundle Size

The library is optimized to be as small as possible:

-   **Full library import**: ~16 KB (gzipped)
-   **useDevPanel hook only**: ~16 KB (gzipped)
-   **DevPanel component**: ~15 KB (gzipped)
-   **All controls (lazy loaded)**: ~11 KB (gzipped)
-   **Store services**: ~2.5 KB (gzipped)

## Commands

### Check bundle size

```bash
npm run size
```

This runs size-limit to check if the bundle is within configured limits.

### Detailed analysis

```bash
npm run size:analyze
```

This command:

1. Builds the library
2. Runs size-limit checks
3. Generates a detailed report with:
    - Total bundle size
    - Size breakdown by file type
    - Size breakdown by directory
    - Top 10 largest files
    - Optimization recommendations

### Watch for changes

```bash
npm run size:watch
```

Uses bundlewatch to track size changes (primarily for CI/CD).

## Size Limits

We maintain strict size limits defined in `.size-limit.json`:

| Package               | Limit | Current |
| --------------------- | ----- | ------- |
| Full library import   | 50 KB | ~16 KB  |
| useDevPanel hook only | 30 KB | ~16 KB  |
| DevPanel component    | 25 KB | ~15 KB  |
| All controls          | 40 KB | ~11 KB  |
| Store services        | 15 KB | ~2.5 KB |

These limits are enforced in:

-   Pre-publish hooks
-   CI/CD pipelines
-   Pull request checks

## Automated PR Checks

When you create a pull request, the `bundle-size.yml` workflow automatically:

1. **Builds both versions**: PR branch and base branch
2. **Compares sizes**: Calculates the difference
3. **Posts a comment**: Shows a detailed comparison table
4. **Applies status indicators**:
    - 🟢 Size decreased
    - 🟡 Size increased (< 5%)
    - 🔴 Size increased significantly (> 5%)
    - ⚪ No change

Example PR comment:

```
## 📦 Bundle Size Report

| Package | Current | Base | Change |
|---------|---------|------|--------|
| 🟢 Full library import | 15.5 KB | 16.0 KB | -0.5 KB (-3.12%) |
| ⚪ useDevPanel hook only | 16.0 KB | 16.0 KB | 0 B (0.00%) |
| 🟡 DevPanel component | 15.5 KB | 15.0 KB | +0.5 KB (+3.33%) |

✅ All size checks passed!
```

## How to Keep Bundle Size Small

### 1. Lazy Load Components

Controls are already lazy-loaded using `React.lazy()`:

```typescript
const controls = Object.freeze({
	boolean: lazy(() => import("./BooleanControl")),
	button: lazy(() => import("./ButtonControl")),
	// ...
});
```

This ensures users only download the controls they use.

### 2. Tree-Shaking Friendly

The library uses ES modules exclusively, which enables tree-shaking:

```json
{
	"module": "./dist/index.js",
	"formats": ["es"]
}
```

### 3. Minimal Dependencies

The library has zero runtime dependencies, only peer dependencies:

```json
{
	"peerDependencies": {
		"react": ">=18.0.0",
		"react-dom": ">=18.0.0"
	}
}
```

### 4. Optimized CSS

-   Use CSS custom properties instead of CSS-in-JS
-   Split CSS per component (automatic via Vite)
-   Minify CSS in production

### 5. Code Splitting

The build configuration creates separate chunks:

```typescript
input: Object.fromEntries(globSync(["src/**/*.{ts,tsx}"]).map(/* ... */));
```

## Troubleshooting

### Size limit exceeded

If you see this error:

```
Package size limit has exceeded by X KB
```

**Solutions:**

1. **Review recent changes**: What code was added?
2. **Check dependencies**: Did you add a new package?
3. **Analyze the bundle**: Run `npm run size:analyze`
4. **Look for duplicates**: Check if code is duplicated
5. **Consider lazy loading**: Can the feature be loaded on-demand?

### High CSS bundle

If CSS is >15 KB:

1. **Remove unused styles**: Use PurgeCSS or similar
2. **Check custom properties**: Are there duplicate variables?
3. **Review theme files**: Can themes be optimized?
4. **Split strategically**: Separate common vs. theme styles

### Too many files

If file count is >100:

1. **Consolidate utilities**: Group related utilities
2. **Review output structure**: Check Vite config
3. **Consider barrel exports**: Use index files wisely

## Best Practices

### Before committing

```bash
# Build and check size
npm run build
npm run size

# Detailed analysis
npm run size:analyze
```

### Before releasing

```bash
# Full pre-release check (includes size check)
npm run prerelease
```

### When adding features

1. Build before and after
2. Compare sizes: `npm run size:analyze`
3. Ensure increase is justified
4. Document if intentional size increase

## Configuration Files

### `.size-limit.json`

Defines size budgets for different import patterns.

```json
[
	{
		"name": "Full library import",
		"path": "dist/index.js",
		"import": "*",
		"limit": "50 KB",
		"gzip": true,
		"brotli": true
	}
]
```

### `.bundlewatch.config.json`

Configures bundlewatch for CI/CD.

```json
{
	"files": [
		{
			"path": "dist/index.js",
			"maxSize": "50kb"
		}
	],
	"ci": {
		"trackBranches": ["main", "develop"]
	}
}
```

### `scripts/analyze-bundle.js`

Custom analyzer that provides detailed reports.

## CI/CD Integration

The bundle size check is integrated into GitHub Actions:

-   **Workflow**: `.github/workflows/bundle-size.yml`
-   **Triggers**: Pull requests to main/develop
-   **Actions**:
    -   Builds PR and base branch
    -   Compares sizes
    -   Posts comment with results
    -   Fails if limits exceeded

## Further Reading

-   [size-limit documentation](https://github.com/ai/size-limit)
-   [bundlewatch documentation](https://github.com/bundlewatch/bundlewatch)
-   [Vite build optimization](https://vitejs.dev/guide/build.html)
-   [Tree-shaking guide](https://webpack.js.org/guides/tree-shaking/)
