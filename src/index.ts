/// <reference path="./jsx.d.ts" />

/**
 * Configuration for the JSX runtime.
 */
export const jsxConfig: JsxConfig = {
	jsonAttributes: new Set(["hx-vals", "hx-headers", "data-hx-vals", "data-hx-headers"]),
	sanitize: false,
	trusted: false,
};

export interface JsxConfig {
	/**
	 * When these attributes' values are set to object literals, they will be stringified to JSON.
	 */
	jsonAttributes: Set<string>;
	/**
	 * The sanitizer to be used by the runtime.
	 * Accepts a function of the signature `(raw: string, originalType: string) => string`.
	 * @note {@link JsxConfig.trusted} must be false for elements to be sanitized.
	 * @see {@link Sanitizer}
	 */
	sanitize: Sanitizer;
	/**
	 * If false, value interpolations inside of JSX will be sanitized.
	 * @note Sanitization will change the return type of JSX functions to an object that overrides `toString`.
	 * 			 In most cases it will function as expected, but you might sometimes need to manually coerce the JSX tree to a string.
	 */
	trusted: boolean;
}

export type Sanitizer = false | ((raw: string, originalType: string) => string);

export type InterpValue =
	| { $$child: unknown }
	| { $$children: unknown[] }
	| { $$spread: unknown }
	| Record<string, unknown>;

export type HtmlTemplator<Output = string> = (raw: TemplateStringsArray, ...values: InterpValue[]) => Output;

const attrPattern = /[<>&"']/g;
const attrPatternWithoutDQ = /[<>&']/g;
const attrReplacements: Record<string, string> = {
	"<": "&lt;",
	">": "&gt;",
	"&": "&amp;",
	'"': "&quot;",
	"'": "&#39;",
};

type Renderable = 0 | {};
function isRenderable(value: unknown): value is Renderable {
	return value === 0 || !!value;
}
function attrSanitizer(raw: Renderable): string {
	return String(raw).replace(attrPattern, (sub) => attrReplacements[sub] || sub);
}
function attrSanitizerWithoutDQ(raw: Renderable): string {
	return String(raw).replace(attrPatternWithoutDQ, (sub) => attrReplacements[sub] || sub);
}
function htmlSanitizer(raw: Renderable): string {
	const out = String(raw);
	if (jsxConfig.trusted) return out;
	return jsxConfig.sanitize ? jsxConfig.sanitize(out, typeof raw) : out;
}

function isObject(value: unknown): value is {} {
	return typeof value === "object" && value !== null;
}

function htmlTransformChildren(value: InterpValue): string {
	if ("$$child" in value) return isRenderable(value.$$child) ? htmlSanitizer(value.$$child) : "";
	if ("$$children" in value) {
		const out: string[] = [];
		for (const child of value.$$children as unknown[]) {
			if (isRenderable(child)) out.push(htmlSanitizer(child));
		}
		return out.join(" ");
	}

	let obj: Record<string, unknown>;
	if ("$$spread" in value && isObject(value.$$spread)) obj = value.$$spread;
	else if (isObject(value)) obj = value;
	else return "";
	const out: string[] = [];
	for (const key of Object.keys(obj)) {
		const attr = obj[key];
		// @ts-expect-error !Renderable is not null | undefined
		if (!isRenderable(attr) && attr !== "") continue;
		if (jsxConfig.jsonAttributes.has(key)) {
			out.push(`${key}='${attrSanitizerWithoutDQ(JSON.stringify(attr))}'`);
		} else {
			out.push(`${key}="${attrSanitizer(attr)}"`);
		}
	}
	return out.join(" ");
}

/**
 * A [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
 * that interprets different kinds of {@link InterpValue values} into escaped HTML.
 *
 * ```ts twoslash
 * import { html } from 'typed-htmx';
 * function assertEqual(left: any, right: any) {}
 * // ---cut---
 * const template = html`
 *   <div hx-vals=${{ foo: 'bar' }} />
 * `;
 * assertEqual(template, `<div hx-vals='{"foo":"bar"}' />`);
 * ```
 */
export const html: HtmlTemplator = (raw, ...values) => {
	const values_ = values.map(htmlTransformChildren);
	return String.raw(raw, ...values_);
};
