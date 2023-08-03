# Intro

## Demo

```tsx twoslash
// @errors: 2322

function MyComponent({ children }) {
  return '<!DOCTYPE html>' + (
    <html lang='en'>
      <head>
        <title>My Website</title>
      </head>
      <body hx-boost hx-ext='sse'>
        <div id='main'>
          {children}
          <form hx-post='/purchase' hx-swap='outerHTML' hx-vals={{foo: 'bar'}}>
            <button type='submit'>Buy Now</button>
          </form>
        </div>
      </body>
    </html>
  )
}
```

## Tips

### Configuring the JSX runtime

If you don't have any other JSX runtimes like React or Preact set up, you can use
the one bundled with typed-htmx which will compile JSX into strings at runtime.
You can also configure the runtime like this:

```js twoslash
import { jsxConfig } from 'typed-htmx'
// Set to true to allow all text and skip sanitization
jsxConfig.trusted = true
// Bring your own sanitizer
jsxConfig.sanitize = (raw, originalType) => `..`
```

### Compiling JSX templates

JSX functions are fairly fast and will unlikely to be a bottleneck in your server.
However, it is possible to achieve higher performance via techniques such as code transformations à la Babel.
For example, you can use [`swc-plugin-static-jsx`](https://github.com/Desdaemon/swc-plugin-static-jsx)
which will transform the demo snippet into pure string interpolation:

```ts
// User-provided template function
function html(raw: TemplateStringsArray, ...args: unknown[]): string {
  // ..
}

function MyComponent({ children }) {
  return '<!DOCTYPE html>' + html`
    <html lang="en">
      <head>
        <title>My Website</title>
      </head>
      <body hx-boost hx-ext="sse">
        <div id="main">
          ${{$$child: children}}
          <form hx-post="/purchase" hx-swap="outerHTML" ${{'hx-vals': {foo: 'bar'}}}>
            <button type="submit">Buy Now</button>
          </form>
        </div>
      </body>
    </html>`
}
```