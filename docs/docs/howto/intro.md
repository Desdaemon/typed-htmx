# Intro

## Demo

```tsx twoslash
// @errors: 2322

function MyComponent({ children }) {
  return (
    "<!DOCTYPE html>" +
    (
      <html lang="en">
        <head>
          <title>My Website</title>
        </head>
        <body hx-boost hx-ext="sse">
          <div id="main">
            {children}
            <form
              hx-post="/purchase"
              hx-swap="outerHTML"
              hx-vals={{ foo: "bar" }}
            >
              <button type="submit">Buy Now</button>
            </form>
          </div>
        </body>
      </html>
    )
  );
}
```

## Install

```shell
npm i typed-htmx
```

You can also install as a dev dependency if you're only using the type definitions.

## Usage

You can configure typed-htmx either as pure type declarations, or as a JSX
templating engine.

### As type declarations

Configure your `tsconfig.json` as follows:

```jsonc
{
  "compilerOptions": {
    "jsx": "react",
    "moduleResolution": "node16", // or "nodenext"
    "types": ["typed-htmx" /** and any other types you need */]
  }
}
```

An alternative is to include a _[triple-slash directive]_ wherever you need
completions for htmx attributes:

```jsx twoslash
/// <reference types="typed-htmx" />

function MyComponent({ children }) {
  return <div hx-get="/asd">{children}</div>;
  //          ^?
}
```

### As a JSX templating engine

If you prefer to use JSX only for its templating capabilities in the vein of
[typed-html], you can use `typed-htmx/typed-html` which is included with this
library and optimized for htmx usage:

- Attributes such as [`hx-vals`](https://htmx.org/attributes/hx-vals/) and
  [`hx-headers`](https://htmx.org/attributes/hx-headers/) may also accept an object
  literal, which will be stringified on demand.
- Configurable [options](#configuring-the-jsx-runtime) for sanitization, defaults to a no-op.

Configure your `tsconfig.json` as follows:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "typed-htmx/typed-html",
    "moduleResolution": "node16" // or "nodenext"
  }
}
```

## Tips

### Configuring the JSX runtime

If you don't have any other JSX runtimes like React or Preact set up, you can use
`typed-htmx/typed-html`, which will convert JSX into strings at runtime.
You can configure the runtime using [`jsxConfig`](/typed-htmx/docs/api/module.index/Variables/variable.jsxConfig-1):

```js twoslash
import { jsxConfig } from "typed-htmx";
// Set to true to allow all text and skip sanitization
jsxConfig.trusted = true;
// Bring your own sanitizer
jsxConfig.sanitize = (raw, originalType) => `..`;
```

### Compiling JSX templates

JSX functions are fairly fast and will unlikely to be a bottleneck in your server.
However, it is possible to achieve higher performance via techniques such as code transformations à la Babel.
For example, you can use [`swc-plugin-static-jsx`](https://github.com/Desdaemon/swc-plugin-static-jsx)
which will transform the demo snippet into pure string interpolation:

```ts twoslash
// Use typed-htmx's template function
import { html } from "typed-htmx";

// Or provide your own
function myHtml(raw: TemplateStringsArray, ...args: unknown[]): string {
  return `..`;
}

function MyComponent({ children }) {
  return (
    "<!DOCTYPE html>" +
    html`<html lang="en">
      <head>
        <title>My Website</title>
      </head>
      <body hx-boost hx-ext="sse">
        <div id="main">
          ${{ $$child: children }}
          <form
            hx-post="/purchase"
            hx-swap="outerHTML"
            ${{ "hx-vals": { foo: "bar" } }}
          >
            <button type="submit">Buy Now</button>
          </form>
        </div>
      </body>
    </html>`
  );
}
```

[typed-html]: https://github.com/nicojs/typed-html
[triple-slash directive]: https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html
