# SDD-04: Developer Component Code Generator

## 1. Supported Formats
Every optimized SVG can be exported into multiple developer targets in 1 click:
1. **Raw SVG Markup:** Clean, minified XML string.
2. **React JSX / TSX Component:**
   - Converts standard SVG attributes to camelCase (`stroke-width` → `strokeWidth`, `fill-rule` → `fillRule`, `class` → `className`).
   - Inserts `{...props}` forwarding.
   - Auto-replaces fixed color with `currentColor` when enabled.
3. **Vue 3 SFC:** `<template><svg ...></template>` component ready for direct import.
4. **Svelte Component:** `<svg ... {...$$restProps}></svg>`.
5. **Base64 Data URI:** `data:image/svg+xml;utf8,...` (URL-encoded or base64) for direct CSS `background-image` usage.

## 2. Clipboard Ergonomics
- Syntax-highlighted code drawer using Shiki / prism styling.
- 1-Click "Copy to Clipboard" with animated tooltip confirming copy success.
- Direct ".svg" download button for single asset workflow.
