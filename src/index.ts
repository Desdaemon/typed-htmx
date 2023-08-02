/// <reference path="./jsx.d.ts" />

/**
 * Configuration for the JSX runtime.
 */
export const jsxConfig: JsxConfig = {
	jsonAttributes: ["hx-vals", "hx-headers", "data-hx-vals", "data-hx-headers"],
	sanitize: false,
	trusted: false,
};

export interface JsxConfig {
	/**
	 * When these attributes' values are set to object literals, they will be stringified to JSON.
	 */
	jsonAttributes: string[];
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
