# 🛠️ Development Guide

This guide covers everything you need to know about developing with and contributing to React Dev Panel.

## Prerequisites

-   **Node.js** 18+ (LTS recommended)
-   **React** 18+ (peer dependency)
-   **npm**, **yarn**, or **pnpm** package manager

### Development Environment Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/Berenjenas/react-dev-panel.git
    cd react-dev-panel
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Start development server**
    ```bash
    npm run dev
    ```

## Available Scripts

### Development

```bash
npm run dev          # Start Vite development server
npm run storybook    # Start Storybook for component development
```

### Building

```bash
npm run build        # Build library for production
npm run build-storybook  # Build Storybook for deployment
```

### Testing

```bash
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Check code formatting with Prettier
npm run format:fix   # Fix code formatting with Prettier
npm run stylelint    # Run Stylelint for CSS/SCSS
npm run stylelint:fix # Fix CSS/SCSS with Stylelint
npm run typecheck    # Run TypeScript type checking
```

## Project Structure

```
react-dev-panel/
├── src/
│   ├── components/          # React components
│   │   ├── DevPanel/       # Main panel component
│   │   ├── ControlRenderer/ # Control rendering logic
│   │   └── controls/       # Individual control components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # State management
│   ├── utils/              # Utility functions
│   └── styles.scss         # Global styles
├── docs/                   # Documentation files
├── stories/                # Storybook stories
└── tests/                  # Test files
```

## Code Quality & Standards

This project maintains high code quality standards through automated tooling and consistent formatting.

### Linting Configuration

#### ESLint

The project uses a comprehensive ESLint configuration with TypeScript support:

-   **Base Configuration**: Extends recommended configs for JavaScript, TypeScript, and React
-   **React Rules**: Comprehensive JSX formatting and React best practices
-   **TypeScript Rules**: Strict type checking and explicit function return types
-   **Import Sorting**: Automatic import organization with `eslint-plugin-simple-import-sort`
-   **Code Formatting**: Padding rules for consistent code structure

#### Stylelint

SCSS/CSS files are linted with Stylelint to maintain consistent styling:

```bash
npm run stylelint      # Check SCSS/CSS styles
npm run stylelint:fix  # Auto-fix style issues
```

#### Prettier

Code formatting is handled by Prettier with the following configuration:

-   **Print Width**: 150 characters
-   **Indentation**: Tabs (4 spaces)
-   **Semicolons**: Always required
-   **Quotes**: Double quotes
-   **Trailing Commas**: Always
-   **Line Endings**: LF

Prettier ignores build outputs, dependencies, and generated files via `.prettierignore`.

### Git Hooks & Automation

#### Pre-commit Hooks (Husky + lint-staged)

Automated quality checks run before each commit:

```json
{
	"*.scss": ["npm run stylelint:fix", "npm run format:fix"],
	"*.{js,jsx,ts,tsx}": ["npm run lint:fix", "npm run format:fix"]
}
```

This ensures that all committed code meets quality standards automatically.

#### Commit Message Format (Commitlint)

All commits must follow conventional commit format:

```
type(scope): description

Examples:
feat(core): add new control type
fix(ui): resolve panel positioning issue
docs(readme): update installation guide
style(css): improve component styling
refactor(hooks): optimize state management
test(utils): add unit tests for helpers
```

**Available Types**: `feature`, `bugfix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `revert`

**Available Scopes**: `core`, `ui`, `docs`, `tests`, `workflow`

### Development Workflow

### 1. Component Development

-   Use Storybook for isolated component development
-   Follow existing component patterns and naming conventions
-   Ensure TypeScript types are properly defined
-   Add comprehensive prop documentation

### 2. Testing

-   Write unit tests for all utility functions
-   Add integration tests for complex components
-   Ensure proper TypeScript coverage
-   Test both happy path and edge cases

### 3. Documentation

-   Update relevant documentation files
-   Add JSDoc comments for public APIs
-   Include usage examples in Storybook
-   Update type definitions as needed

## Contributing Guidelines

### Code Style

The project enforces consistent code style through automated tooling:

-   **TypeScript**: Use TypeScript for all new code with strict type checking
-   **Naming Conventions**: Follow existing patterns (camelCase for variables, PascalCase for components)
-   **Component Styles**: Use CSS Modules for component-specific styles
-   **Indentation**: Use tabs (4 spaces) as enforced by Prettier
-   **Linting**: All code is automatically linted and formatted via pre-commit hooks
-   **Import Organization**: Imports are automatically sorted by ESLint rules

> **Note**: Code style is automatically enforced via pre-commit hooks. Run `npm run lint:fix` and `npm run format:fix` to fix any style issues manually.

### Commit Messages

Commit messages are automatically validated using Commitlint. Use the interactive commit tool:

```bash
npm run commit  # Interactive commit with conventional format
```

Or follow the conventional commit format manually:

```
type(scope): description

feat(controls): add new range control
fix(panel): resolve positioning bug
docs(readme): update installation guide
```

> **Note**: Invalid commit messages will be rejected by the pre-commit hooks.

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper tests
4. Update documentation as needed
5. Ensure all automated checks pass (linting, formatting, tests)
6. Use `npm run commit` for conventional commit messages
7. Submit a pull request with clear description

> **Note**: All code quality checks are automated via pre-commit hooks. The CI pipeline will also verify that all standards are met.

## Component Development Guidelines

### Creating New Controls

1. **Create component file**

    ```typescript
    // src/components/controls/MyControl/MyControl.tsx
    import React from 'react';
    import { BaseControlProps } from '../types';

    interface MyControlProps extends BaseControlProps<string> {
      // Control-specific props
    }

    export const MyControl: React.FC<MyControlProps> = ({ ... }) => {
      // Implementation
    };
    ```

2. **Add to control renderer**

    ```typescript
    // src/components/ControlRenderer/ControlRenderer.tsx
    import { MyControl } from "../controls/MyControl";

    // Add to control mapping
    ```

3. **Create Storybook story**

    ```typescript
    // src/components/controls/MyControl/MyControl.stories.tsx
    export default {
    	title: "Controls/MyControl",
    	component: MyControl,
    };
    ```

4. **Add tests**
    ```typescript
    // src/components/controls/MyControl/MyControl.test.tsx
    import { render } from "@testing-library/react";
    import { MyControl } from "./MyControl";
    ```

### TypeScript Guidelines

-   Export all types from main index file
-   Use proper generic constraints
-   Provide comprehensive JSDoc comments
-   Maintain strict type checking

### Styling Guidelines

-   Use CSS Modules for component styles
-   Follow CSS custom properties for theming
-   Maintain responsive design principles
-   Test across different browsers

## Testing Strategy

### Unit Tests

-   Test individual components in isolation
-   Mock external dependencies
-   Focus on component behavior and props
-   Use React Testing Library best practices

### Integration Tests

-   Test component interactions
-   Verify state management
-   Test hook functionality
-   Ensure proper event handling

### Visual Tests (Storybook)

-   Create stories for all component variations
-   Test different prop combinations
-   Document component usage patterns
-   Verify responsive behavior

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases.

### Adding Changes

When making changes, add a changeset to describe your changes:

```bash
npm run changeset
```

This will prompt you to:

1. Select which packages are affected (for monorepos)
2. Choose the type of change (patch, minor, major)
3. Write a summary of the changes

### Release Workflow

1. **Create Changeset**

    ```bash
    npm run changeset  # Add changeset for your changes
    ```

2. **Build and Test**

    ```bash
    npm run build
    npm run test
    ```

3. **Release** (Maintainers only)
    ```bash
    npm run release   # Publishes packages and updates changelog
    ```

### Automated Releases

-   Releases are automated via GitHub Actions when changesets are merged to main
-   Version bumps and changelog updates are handled automatically
-   NPM publishing happens automatically on successful builds

For more details, see the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).

## Troubleshooting

### Common Issues

**TypeScript Errors**

-   Ensure all dependencies are up to date
-   Check for proper type imports
-   Verify generic type constraints

**Build Failures**

-   Clear node_modules and reinstall
-   Check for circular dependencies
-   Ensure all imports are correct

**Test Failures**

-   Update snapshots if intentional changes
-   Check for proper test environment setup
-   Verify mock implementations

### Getting Help

-   Check existing issues on GitHub
-   Review documentation thoroughly
-   Ask questions in discussions
-   Follow contribution guidelines
