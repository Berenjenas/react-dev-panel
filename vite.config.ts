/// <reference types="vite/client" />
/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { globSync } from "glob";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

import { peerDependencies } from "./package.json";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: "./src/setup-tests.ts",
		coverage: {
			include: ["src/components"],
			exclude: ["**/*.stories.tsx"],
		},
	},
	plugins: [
		react(),
		libInjectCss(),
		dts({
			exclude: [
				"**/*.stories.tsx",
				"src/test",
				"**/*.test.tsx",
				"**/*-env.d.ts",
				"**/*.spec.ts",
				"**/*-tests.ts",
				"src/components/Logger/**",
				"src/utils/matrixEffect/**",
			],
			tsconfigPath: "tsconfig.app.json",
			rollupTypes: false,
			insertTypesEntry: true,
			copyDtsFiles: true,
		}),
	],
	build: {
		target: "esnext",
		minify: true,
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react/jsx-runtime", ...Object.keys(peerDependencies)],
			// https://rollupjs.org/configuration-options/#input
			input: Object.fromEntries(
				globSync(["src/**/*.{ts,tsx}"], {
					ignore: [
						"src/**/*.d.ts",
						"src/**/*.stories.tsx",
						"src/**/*.test.tsx",
						"src/**/*.spec.ts",
						"src/setup-tests.ts",
						"src/components/Logger/**",
						"src/utils/matrixEffect/**",
					],
				}).map((file) => {
					const entryName = relative("src", file.slice(0, file.length - extname(file).length));
					const entryUrl = fileURLToPath(new URL(file, import.meta.url));

					return [entryName, entryUrl];
				}),
			),
			output: {
				entryFileNames: "[name].js",
				assetFileNames: "assets/[name][extname]",
				globals: {
					"react/jsx-runtime": "jsxRuntime",
					...Object.fromEntries(Object.keys(peerDependencies).map((dep) => [dep, dep.replace(/-/g, "").toUpperCase()])),
				},
			},
		},
	},
});
