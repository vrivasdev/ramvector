---
name: qa-tests
description: Protocol for designing, running, and verifying test suites, SVG sanitization, and WebAssembly worker benchmarks for RamVector.
---

# QA Tests Skill - RamVector

## Purpose
Ensure absolute client-side security, non-destructive SVG optimization, and rock-solid test coverage for RamVector.

## Core Test Pillars
1. **SVG Sanitization & XSS Defense:**
   - Verify complete stripping of `<script>`, `onload`, `onerror`, `xlink:href="javascript:..."`, `<foreignObject>`, and XML external entities (`XXE`).
   - Test against OWASP SVG XSS payload vectors to guarantee safe browser rendering.

2. **Visual Fidelity Verification (Lossless / Near-Lossless):**
   - Compare pre- and post-optimization SVGs for unintentional path clipping, fill-rule corruption, or viewBox distortion.
   - Assert coordinate precision bounds (decimals 0 to 5).

3. **Web Worker Performance & Memory Isolation:**
   - Verify batch jobs process in parallel without blocking the main event loop.
   - Benchmark throughput: 50 SVGs compressed in under 1.5 seconds.
   - Verify RAM cleanup on job completion (no memory leaks).

4. **Component Generation Accuracy:**
   - Assert React (JSX/TSX) output compiles cleanly with valid `camelCase` attributes.
   - Assert Vue 3 output valid single-file component template syntax.
   - Assert Data URI output is properly URL-encoded and displays in `<img>` tags.
