/// <reference path="../jsx.d.ts" />

import { createElement } from "typed-html";

export function Fragment({ children }: { children?: unknown | unknown[] }): JSX.Element {
	if (Array.isArray(children)) return children.map(sanitizer).join('\n');
	return sanitizer(children)
}

/**
 * Configuration for the JSX runtime.
 */
export const config = {
	/**
	 * These attributes' record values be converted to JSON strings.
	 */
	jsonAttributes: ["hx-vals", "hx-headers", "data-hx-vals", "data-hx-headers"],
	/**
	 * The sanitizer to be used by the runtime.
	 * Accepts a function of the signature `(raw: string, originalType: string) => string`.
	 */
	sanitize: false as Sanitizer,
};

function sanitizer(value: unknown): string {
	const str = value || value === 0 ? value.toString() : '';
	if (!config.sanitize) return str;
	return config.sanitize(str, typeof value);
}

type Sanitizer = false | ((raw: string, originalType: string) => string);

function expandLiterals(props: Record<string, unknown>) {
	for (const attr of config.jsonAttributes) {
		if (!(attr in props)) continue;
		const value = props[attr];
		if (typeof value === "object") {
			props[attr] = { toString: () => JSON.stringify(value) };
		}
	}
}

export function jsx(tag: any, { children, ...props }: { children?: unknown | unknown[] }): JSX.Element {
	expandLiterals(props);
	const contents = Array.isArray(children) ? children.map(sanitizer) : [sanitizer(children)];
	return createElement(tag, props, ...contents);
}

export function jsxs(tag: any, { children, ...props }: { children: unknown[] }): JSX.Element {
	expandLiterals(props);
	return createElement(tag, props, ...children.map(sanitizer));
}
