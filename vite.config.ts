/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { glob } from "glob";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			tsconfigPath: "./tsconfig.app.json",
			rollupTypes: false,
			insertTypesEntry: true,
			copyDtsFiles: true,
			include: ["src/**/*"],
			exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx", "src/**/*.spec.ts"],
		}),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	build: {
		copyPublicDir: false,
		lib: {
			entry: "src/index.ts",
			name: "react-dev-panel",
			fileName: "index",
			formats: ["es"],
		},
		rollupOptions: {
			// Make sure to externalize deps that shouldn't be bundled
			external: ["react", "react-dom", "zustand", "react/jsx-runtime", "zustand/middleware", "zustand/react/shallow"],
			input: Object.fromEntries(
				glob
					.sync("src/**/*.{ts,tsx}", {
						ignore: ["src/**/*.d.ts", "src/**/*.stories.tsx", "src/**/*.test.tsx", "src/**/*.spec.ts"],
					})
					.map((file) => [
						// The name of the entry point
						// lib/nested/foo.ts becomes nested/foo
						relative("src", file.slice(0, file.length - extname(file).length)),
						// The absolute path to the entry file
						// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
						fileURLToPath(new URL(file, import.meta.url)),
					]),
			),
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					zustand: "Zustand",
					"react/jsx-runtime": "jsxRuntime",
					"zustand/middleware": "zustandMiddleware",
					"zustand/react/shallow": "zustandReactShallow",
				},
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js",
			},
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
	},
});
