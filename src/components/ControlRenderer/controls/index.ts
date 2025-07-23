import { lazy } from "react";

/**
 * Exports all control components as a frozen object.
 * **Note:** This allows components to be loaded lazily.
 */
export const controls = Object.freeze({
	boolean: lazy(() => import("./BooleanControl").then((m) => ({ default: m.BooleanControl }))),
	button: lazy(() => import("./ButtonControl").then((m) => ({ default: m.ButtonControl }))),
	color: lazy(() => import("./ColorControl").then((m) => ({ default: m.ColorControl }))),
	number: lazy(() => import("./NumberControl").then((m) => ({ default: m.NumberControl }))),
	select: lazy(() => import("./SelectControl").then((m) => ({ default: m.SelectControl }))),
	text: lazy(() => import("./TextControl").then((m) => ({ default: m.TextControl }))),
	buttonGroup: lazy(() => import("./ButtonGroupControl").then((m) => ({ default: m.ButtonGroupControl }))),
});

export { ControlRenderer } from "..";
