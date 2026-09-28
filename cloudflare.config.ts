import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "mental-modelling",
		compatibilityDate: "2026-08-01",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: "src/index.ts",
		workersDev: true,
		observability: {
			enabled: true,
		},
	},
});
