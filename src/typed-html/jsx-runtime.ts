/// <reference path="../jsx.d.ts" />

import { createElement } from "typed-html";
import { jsxConfig } from "../index";

type Element = JSX.Element | Node;

export class Node {
	constructor(private children: Element | Element[]) {}

	toString(): string {
		if (Array.isArray(this.children)) return this.children.join("\n");
		return this.children.toString();
	}
}

export function Fragment({ children }: { children?: unknown }): Element {
	if (Array.isArray(children)) return new Node(children.map(sanitizer));
	return sanitizer(children);
}

function sanitizer(value: unknown): Element {
	const str = value || value === 0 ? value.toString() : "";
	if (!jsxConfig.sanitize || jsxConfig.trusted) return str;
	if (value instanceof Node) return value;
	return jsxConfig.sanitize(str, typeof value);
}

function expandLiterals(props: Record<string, unknown>) {
	for (const attr of jsxConfig.jsonAttributes) {
		if (!(attr in props)) continue;
		const value = props[attr];
		if (typeof value === "object") {
			props[attr] = { toString: () => JSON.stringify(value) };
		}
	}
}

export function jsx(tag: any, { children, ...props }: { children?: unknown }): Element {
	expandLiterals(props);
	const contents = Array.isArray(children) ? children.map(sanitizer) : [sanitizer(children)];
	const elt = createElement(tag, props, ...(contents as any[]));
	return jsxConfig.trusted ? elt : new Node(elt);
}

export function jsxs(tag: any, { children, ...props }: { children: unknown[] }): Element {
	expandLiterals(props);
	const elt = createElement(tag, props, ...(children.map(sanitizer) as any[]));
	return jsxConfig.trusted ? elt : new Node(elt);
}
