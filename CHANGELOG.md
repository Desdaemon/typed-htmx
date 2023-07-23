# Changelog

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
