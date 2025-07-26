// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config([
	globalIgnores(["dist", "coverage"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs["recommended-latest"], reactRefresh.configs.vite],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: { "simple-import-sort": simpleImportSort },
		rules: {
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
