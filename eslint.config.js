import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config([
	globalIgnores(["dist", "docs", "guides", "coverage"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [js.configs["recommended"], tseslint.configs["recommended"], reactHooks.configs["recommended-latest"]],
		plugins: {
			react,
			"simple-import-sort": simpleImportSort,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			"react/jsx-newline": ["error", { prevent: false }],
			"react/jsx-tag-spacing": [
				"error",
				{
					closingSlash: "never",
					beforeSelfClosing: "always",
					afterOpening: "never",
					beforeClosing: "never",
				},
			],
			"react/jsx-curly-newline": [
				"error",
				{
					multiline: "consistent",
					singleline: "consistent",
				},
			],
			"react/jsx-wrap-multilines": [
				"error",
				{
					declaration: "parens-new-line",
					assignment: "parens-new-line",
					return: "parens-new-line",
					arrow: "parens-new-line",
					condition: "parens-new-line",
					logical: "parens-new-line",
					prop: "parens-new-line",
				},
			],
			"react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
			"react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
			"react/jsx-closing-bracket-location": ["error", "tag-aligned"],
			"react/jsx-closing-tag-location": "error",
			// General formatting rules
			"padding-line-between-statements": [
				"error",
				// Require blank line before return statements
				{ blankLine: "always", prev: "*", next: "return" },
				// Require blank line after variable declarations
				{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
				{ blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
				// Require blank line before and after function declarations
				{ blankLine: "always", prev: "*", next: "function" },
				{ blankLine: "always", prev: "function", next: "*" },
				// Require blank line before and after class declarations
				{ blankLine: "always", prev: "*", next: "class" },
				{ blankLine: "always", prev: "class", next: "*" },
				// Require blank line before and after if statements
				{ blankLine: "always", prev: "*", next: "if" },
				{ blankLine: "always", prev: "if", next: "*" },
				// Require blank line before and after for/while loops
				{ blankLine: "always", prev: "*", next: ["for", "while"] },
				{ blankLine: "always", prev: ["for", "while"], next: "*" },
				// Require blank line before and after try-catch
				{ blankLine: "always", prev: "*", next: "try" },
				{ blankLine: "always", prev: "try", next: "*" },
			],
			"object-curly-newline": [
				"error",
				{
					ObjectExpression: { multiline: true, consistent: true },
					ObjectPattern: { multiline: true, consistent: true },
					ImportDeclaration: { multiline: true, consistent: true },
					ExportDeclaration: { multiline: true, consistent: true },
				},
			],
			"function-paren-newline": ["error", "multiline-arguments"],
			"func-style": ["warn", "declaration"],
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
				},
			],
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						// Node.js builtins
						["^node:"],
						// Packages
						["^react", "^@?\\w"],
						// Local imports with aliases
						["^@/"],
						// Side effect imports
						["^\\u0000"],
						// Parent imports
						["^\\.\\.(?!/?$)", "^\\.\\./?$"],
						// Other relative imports
						["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
						// Style imports
						["^.+\\.s?(css|scss)$"],
					],
				},
			],
		},
	},
	{
		files: ["**/*.stories.tsx", "**/*.stories.jsx"],
		plugins: { storybook },
		rules: {
			...storybook.configs["flat/recommended"].rules,
		},
	},
]);
