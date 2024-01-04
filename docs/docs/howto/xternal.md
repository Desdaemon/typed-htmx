# Augmenting external JSX libraries

typed-htmx is extremely minimal and requires the user to manually augment external JSX libraries that provide their own types.

## Common guidance

- Create a `types.d.ts` (any name is fine, as long as it ends in `.d.ts`) at the top of your src/ folder,
  or anywhere within the configured `include` of your tsconfig.json
- Write a JSX element, e.g. `<div />`, and inspect its type
- If you see React-related types, you are good to go
- If not, try to discover the common namespace under which all HTML attributes go.

Let's use [Hono](https://hono.dev/top) as an example.

```tsx twoslash
// @jsxImportSource: hono/jsx
// In tsconfig.json, jsxImportSource = "hono/jsx"

// The type we are augmenting in this case is `Hono.HTMLAttributes`.
// hx-boost is not recognized as a proper attribute yet.
<div hx-boost="bogus" />
//^?
```

With this knowledge, we can now augment the type of `Hono.HTMLAttributes` assuming it is an interface:

```tsx twoslash
// @errors: 2322
// @jsxImportSource: hono/jsx
/// <reference types="typed-htmx" />

declare global {
  namespace Hono {
    interface HTMLAttributes extends HtmxAttributes {}
  }
}

<div hx-boost="bogus"
     style={{}}
/>
```

## Hono

```ts twoslash
import 'typed-htmx';

declare global {
  namespace Hono {
    interface HTMLAttributes extends HtmxAttributes {}
  }
}
```

## Astro

```ts twoslash
import 'typed-htmx';

declare global {
  namespace astroHTML.JSX {
    interface IntrinsicAttributes extends HtmxAttributes {}
  }
}
```
