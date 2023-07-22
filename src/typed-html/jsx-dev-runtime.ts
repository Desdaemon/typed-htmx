/// <reference path="../jsx.d.ts" />

export { Fragment } from "./jsx-runtime";
import { jsx, jsxs } from "./jsx-runtime";

export function jsxDEV(
	tag: any,
	props: any,
	_key: unknown,
	_isStatic: boolean,
	source: unknown,
	_self: unknown,
): JSX.Element {
	try {
		return Array.isArray(props.children) ? jsxs(tag, props) : jsx(tag, props);
	} catch (error) {
		const cause = error instanceof Error && error.cause;
		console.error(`Error encountered while rendering ${tag}`, { error, cause, source });
		throw error;
	}
}
