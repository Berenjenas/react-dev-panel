export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [2, "always", ["feature", "bugfix", "docs", "style", "refactor", "test", "build", "ci", "chore", "revert"]],
		"type-case": [2, "always", "lower-case"],
		"scope-enum": [2, "always", ["core", "ui", "docs", "tests", "workflow"]],
		"scope-case": [2, "always", "lower-case"],
		"subject-case": [2, "always", "sentence-case"],
		"subject-empty": [2, "never"],
	},
};
