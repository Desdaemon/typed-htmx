/// <reference path="../jsx.d.ts" />

export { Fragment } from "./jsx-runtime.ts";
import { jsx, jsxs, type Node } from "./jsx-runtime.ts";

export function jsxDEV(
	tag: any,
	props: any,
	_key: unknown,
	_isStatic: boolean,
	source: unknown,
	_self: unknown,
): Node | JSX.Element {
	try {
		return Array.isArray(props.children) ? jsxs(tag, props) : jsx(tag, props);
	} catch (error) {
		const stack = error instanceof Error ? error.stack : "";
		console.error(`Error encountered while rendering ${tag}`, { error, source, stack });
		throw error;
	}
}
