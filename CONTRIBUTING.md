# Contributing to React Dev Panel

Thank you for your interest in contributing to React Dev Panel! This guide will help you get started.

## Quick Start

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run storybook`
4. **Make your changes** with proper tests
5. **Add a changeset**: `npm run changeset`
6. **Commit using conventional format**: `npm run commit`
7. **Submit a pull request**

## Code Quality Standards

This project maintains high code quality through automated tooling:

### Automated Quality Checks

All code is automatically checked via pre-commit hooks:

-   **ESLint** - TypeScript/React linting
-   **Prettier** - Code formatting
-   **Stylelint** - CSS/SCSS linting
-   **Commitlint** - Conventional commit validation

### Running Quality Checks Manually

```bash
npm run lint:fix      # Fix linting issues
npm run format:fix    # Fix formatting issues
npm run stylelint:fix # Fix style issues
npm run commit        # Interactive conventional commit
```

## Changesets Workflow

This repo uses [changesets](https://github.com/changesets/changesets) to make releasing updates easier.

### Adding a Changeset

When you've got your changes ready, run:

```bash
npm run changeset
```

This will prompt you to:

1. Select the type of change (patch, minor, major)
2. Write a summary of your changes

### What to Include

-   **patch**: Bug fixes, documentation updates, minor improvements
-   **minor**: New features, new control types, API enhancements
-   **major**: Breaking changes, major refactors

For more details, see the [changesets documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md#i-am-in-a-single-package-repository).

## Development Guidelines

### Commit Messages

Use conventional commit format (automatically enforced):

```
type(scope): description

Examples:
feat(core): add new MultiSelect control
fix(ui): resolve panel positioning issue
docs(readme): update installation guide
```

### Code Style

-   All code style is automatically enforced via pre-commit hooks
-   TypeScript is required for all new code
-   Follow existing patterns and naming conventions
-   Use CSS Modules for component styles

### Testing

-   Add tests for new functionality
-   Ensure existing tests pass: `npm run test`
-   Update Storybook stories for UI components

## Pull Request Guidelines

-   Provide clear description of changes
-   Include relevant tests and documentation updates
-   Ensure all automated checks pass
-   Reference any related issues

## Getting Help

-   Check existing [issues](https://github.com/Berenjenas/react-dev-panel/issues)
-   Review the [development guide](./guides/DEVELOPMENT.md)

Thank you for contributing! 🎉
