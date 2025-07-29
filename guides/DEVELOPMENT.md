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

## Development Workflow

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

-   Use TypeScript for all new code
-   Follow existing naming conventions
-   Use CSS Modules for component styles
-   Maintain consistent indentation (tabs)

### Commit Messages

Follow conventional commit format:

```
type(scope): description

feat(controls): add new range control
fix(panel): resolve positioning bug
docs(readme): update installation guide
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper tests
4. Update documentation as needed
5. Ensure all tests pass
6. Submit a pull request with clear description

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

1. **Version Bump**

    ```bash
    npm version patch|minor|major
    ```

2. **Build and Test**

    ```bash
    npm run build
    npm run test
    ```

3. **Publish**

    ```bash
    npm publish
    ```

4. **Tag Release**
    ```bash
    git push --tags
    ```

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
