#!/usr/bin/env node
/**
 * Bundle size analyzer - Provides detailed analysis of bundle composition
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_PATH = join(__dirname, "..", "dist");
const SIZE_LIMIT_OUTPUT = join(__dirname, "..", ".size-limit-output.json");

// ANSI color codes
const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	cyan: "\x1b[36m",
};

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Get all files recursively from directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
	const files = readdirSync(dirPath);

	files.forEach((file) => {
		const filePath = join(dirPath, file);
		if (statSync(filePath).isDirectory()) {
			arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
		} else {
			arrayOfFiles.push(filePath);
		}
	});

	return arrayOfFiles;
}

/**
 * Analyze bundle structure
 */
function analyzeBundleStructure() {
	const files = getAllFiles(DIST_PATH);

	const structure = {
		total: 0,
		byType: {},
		byDirectory: {},
		files: [],
	};

	files.forEach((filePath) => {
		const stats = statSync(filePath);
		const size = stats.size;
		const relativePath = filePath.replace(DIST_PATH + "/", "");
		const ext = relativePath.split(".").pop();
		const dir = relativePath.split("/")[0];

		structure.total += size;
		structure.files.push({
			path: relativePath,
			size,
			formattedSize: formatBytes(size),
		});

		// By file type
		if (!structure.byType[ext]) {
			structure.byType[ext] = { count: 0, size: 0 };
		}
		structure.byType[ext].count++;
		structure.byType[ext].size += size;

		// By directory
		if (!structure.byDirectory[dir]) {
			structure.byDirectory[dir] = { count: 0, size: 0 };
		}
		structure.byDirectory[dir].count++;
		structure.byDirectory[dir].size += size;
	});

	return structure;
}

/**
 * Print bundle analysis report
 */
function printReport(structure, sizeLimitData) {
	console.log("\n" + colors.bright + colors.blue + "━".repeat(80) + colors.reset);
	console.log(colors.bright + "📦 Bundle Size Analysis Report" + colors.reset);
	console.log(colors.blue + "━".repeat(80) + colors.reset + "\n");

	// Total size
	console.log(colors.bright + "Total Bundle Size:" + colors.reset);
	console.log(`  ${colors.cyan}${formatBytes(structure.total)}${colors.reset}\n`);

	// Size-limit results
	if (sizeLimitData && sizeLimitData.length > 0) {
		console.log(colors.bright + "Size Limit Checks:" + colors.reset);
		sizeLimitData.forEach((item) => {
			const status = item.passed ? colors.green + "✓" : colors.red + "✗";
			const size = colors.cyan + formatBytes(item.size);
			const limit = colors.dim + `(limit: ${item.limit})` + colors.reset;
			console.log(`  ${status} ${item.name}: ${size} ${limit}${colors.reset}`);
		});
		console.log("");
	}

	// By file type
	console.log(colors.bright + "By File Type:" + colors.reset);
	Object.entries(structure.byType)
		.sort((a, b) => b[1].size - a[1].size)
		.forEach(([type, data]) => {
			const percentage = ((data.size / structure.total) * 100).toFixed(1);
			console.log(
				`  ${colors.yellow}.${type.padEnd(8)}${colors.reset} ${formatBytes(data.size).padEnd(10)} ${colors.dim}(${percentage}% - ${
					data.count
				} files)${colors.reset}`,
			);
		});
	console.log("");

	// By directory
	console.log(colors.bright + "By Directory:" + colors.reset);
	Object.entries(structure.byDirectory)
		.sort((a, b) => b[1].size - a[1].size)
		.forEach(([dir, data]) => {
			const percentage = ((data.size / structure.total) * 100).toFixed(1);
			console.log(
				`  ${colors.green}${dir.padEnd(20)}${colors.reset} ${formatBytes(data.size).padEnd(10)} ${colors.dim}(${percentage}% - ${
					data.count
				} files)${colors.reset}`,
			);
		});
	console.log("");

	// Largest files
	console.log(colors.bright + "Top 10 Largest Files:" + colors.reset);
	structure.files
		.sort((a, b) => b.size - a.size)
		.slice(0, 10)
		.forEach((file, index) => {
			const percentage = ((file.size / structure.total) * 100).toFixed(1);
			console.log(
				`  ${colors.dim}${(index + 1).toString().padStart(2)}${colors.reset}. ${file.path.padEnd(50)} ${
					colors.cyan
				}${file.formattedSize.padEnd(10)}${colors.reset} ${colors.dim}(${percentage}%)${colors.reset}`,
			);
		});
	console.log("");

	// Recommendations
	console.log(colors.bright + "Recommendations:" + colors.reset);
	const cssSize = structure.byType["css"]?.size || 0;
	const jsSize = structure.byType["js"]?.size || 0;

	if (cssSize > 15000) {
		console.log(`  ${colors.yellow}⚠${colors.reset}  CSS bundle is large (${formatBytes(cssSize)}). Consider:
     - Using PurgeCSS to remove unused styles
     - Splitting CSS by component
     - Reviewing custom properties usage`);
	}

	if (jsSize > 100000) {
		console.log(`  ${colors.yellow}⚠${colors.reset}  JavaScript bundle is large (${formatBytes(jsSize)}). Consider:
     - Ensure all controls are lazy-loaded
     - Review dependencies for tree-shaking
     - Check for duplicate code`);
	}

	if (structure.files.length > 100) {
		console.log(`  ${colors.yellow}⚠${colors.reset}  High file count (${structure.files.length}). Consider:
     - Consolidating small utility files
     - Reviewing output structure`);
	}

	if (!sizeLimitData || sizeLimitData.some((item) => !item.passed)) {
		console.log(`  ${colors.red}✗${colors.reset}  Bundle size exceeded limits!`);
	} else {
		console.log(`  ${colors.green}✓${colors.reset}  All bundle size checks passed!`);
	}

	console.log("\n" + colors.blue + "━".repeat(80) + colors.reset + "\n");
}

/**
 * Main execution
 */
try {
	console.log(colors.dim + "Analyzing bundle..." + colors.reset);

	const structure = analyzeBundleStructure();

	let sizeLimitData = null;
	try {
		const rawData = readFileSync(SIZE_LIMIT_OUTPUT, "utf-8");
		sizeLimitData = JSON.parse(rawData);
	} catch (err) {
		console.log(colors.yellow + "Warning: Could not read size-limit output. Run with --json flag." + colors.reset);
	}

	printReport(structure, sizeLimitData);

	// Exit with error if size limits exceeded
	if (sizeLimitData && sizeLimitData.some((item) => !item.passed)) {
		process.exit(1);
	}
} catch (error) {
	console.error(colors.red + "Error analyzing bundle:" + colors.reset, error.message);
	process.exit(1);
}
