# Changelog

## 0.3.0

- Update definitions for htmx 1.9.10

## 0.2.3

- Fix bug introduced in previous version that breaks the built-in HTML renderer

## 0.2.2

- Fix ESM imports when not using bundlers

## 0.2.1

- Fix types when not using typed-html

## 0.2.0

- _(Breaking)_ `jsxConfig.jsonAttributes` changed to be a Set
- New template function `html` for compatibility with swc-plugin-static-jsx

## 0.1.4

- Do not doubly sanitize fragment children

## 0.1.3

- Rename `config` to `jsxConfig`; imported directly from `typed-htmx`
- When `jsxConfig.trusted` is false (default) and `jsxConfig.sanitize` is
  defined, plain text and interpolated values are sanitized
  - Slight reduction in performance, dependent on the sanitizer supplied

## 0.1.2

- Fix `Fragment` not accepting non-array children and not sanitizing children
- Increase jsx robustness against falsy values
- Fix the value 0 not being rendered

## 0.1.1

- Allow `jsx` to process arrays of children, unblocks Bun

## 0.1.0

- Initialize package
