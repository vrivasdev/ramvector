# RamVector - Product Constitution & Strategic Blueprint
> **Codename:** RamVector  
> **Tagline:** Blazing-Fast, Zero-Server SVG Optimizer & Sanitizer in Your Browser's RAM.  
> **Target Audience:** Software Engineers, Indie Hackers, UI/UX Designers & DevSecOps.  
> **License & Monetization:** 100% Free & Open Micro Tool supported by Ethical Developer Ads (Passive Income).

---

## 1. Executive Summary & Vision

### 1.1 The Core Problem & Friction
- **Server-Side Privacy Violations:** Mainstream optimizers (TinyPNG, cloud converters) require users to upload proprietary SVG assets, corporate logos, and confidential UI vectors to remote servers.
- **Predatory SaaS Subscriptions:** Simple utilities lock basic batch processing behind recurring $10-$29/month subscription paywalls.
- **Outdated & Fragmented Alternatives:** Existing free client-side tools (like SVGOMG) feature decade-old UIs, lack multi-file batch workflows, lack modern developer exports (React/Vue/JSX/Data URI), and do not sanitize against SVG-based XSS vectors.
- **Designer Bloat in Production:** Exports from Figma, Adobe Illustrator, and Inkscape contain massive amounts of useless XML metadata (`inkscape:*`, `sodipodi:*`, Adobe Illustrator private data, unnecessary `<defs>`, unused masks, non-standard attributes) inflating file sizes by 40% to 85%.

### 1.2 The RamVector Solution
**RamVector** is a high-performance, client-side micro web tool that optimizes, cleans, and sanitizes SVG files **100% inside client RAM and WebAssembly/Web Workers**. 
- **Zero Server Data Latency:** Files never leave the browser.
- **Instant Processing:** Sub-millisecond execution for single files; parallel Web Worker processing for batch assets.
- **Developer-First UX:** Combines the lightning drag-and-drop simplicity of TinyPNG with the deep surgical control of SVGOMG, plus instant export to modern frontend code (React JSX, Vue 3, Svelte, Base64 Data URI).
- **100% Free Tier Forever:** Unrestricted batch jobs, zero paywalls, zero watermarks, funded cleanly via non-intrusive ethical developer ads.

---

## 2. Competitive Landscape & Market Intelligence

We benchmark RamVector against the primary existing tools in the market:

| Feature / Dimension | SVGOMG (`svgomg.net`) | TinyPNG (`tinypng.com`) | ToolsLab (`toolslab.dev`) | Iconly (`iconly.io`) | SVGOptimizer (`svgoptimizer.com`) | **RamVector (Our Edge)** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Execution Environment** | Client Browser (JS) | Cloud Servers | Client Browser | Cloud / Client | Client Browser (WASM) | **100% Client RAM (WASM + Workers)** |
| **Privacy Guarantee** | High | Low (Uploads) | High | Variable | High | **Zero-Server Trust: 100% Private & Offline** |
| **Batch Processing** | ❌ Single file only | ✅ Up to 20 files | ❌ Single file | ❌ Single / Asset store | ✅ Up to 20 files (50MB) | **✅ Unlimited Parallel Batch + ZIP Packager** |
| **Visual Comparison** | Split Slider (Basic) | Static stats | Preview only | Basic Viewer | Canvas Split Slider + 100% Zoom | **Dual-Canvas Split Slider + Zoom/Pan Diff** |
| **Code Generation** | ❌ Raw SVG only | ❌ None | ❌ Raw SVG only | ❌ CSS Icon font | ❌ Raw download only | **✅ React (JSX/TSX), Vue 3, Svelte, Data URI** |
| **SVG Sanitizer (XSS)** | ❌ Limited | ❌ None | ❌ None | ❌ None | ❌ None | **✅ Security-First: Purges scripts, onload, XXE** |
| **Specialized Transforms** | Standard SVGO | Raster lossy | Basic minification | Strokes to Fills | Precision Slider (0-5) | **Precision Sliders + Strokes-to-Fills + Cruft Purge** |
| **UI Aesthetics & UX** | 2015 Material UI | Clean, standard | Minimal developer | Icon catalog UI | Generic Ad-heavy layout | **High-Density Cyber/Glass Dark UI (Tailwind/Vue)** |
| **Monetization Model** | Free / Open Source | $39+/yr Subscription | Free / Donations | Subscription / Pro Pack | Display Banner Ads | **100% Free (Ethical Ads: EthicalAds / Carbon)** |

---

## 3. Core Objectives & Product Pillars

### Objective 1: Zero-Trust Privacy & Absolute Security
- Process every vector within the user's browser sandbox (`RAM`).
- Sanitize SVGs by purging `<script>`, `onload`, `xlink:href="javascript:..."`, external entity attacks (`XXE`), and suspicious foreign objects.

### Objective 2: Unrivaled Speed & Performance
- Sub-50ms compression times using an optimized pipeline (SVGO in Web Worker / Rust-WASM compilation).
- Parallel processing for multi-file batch jobs using Web Workers (`navigator.hardwareConcurrency`).

### Objective 3: Developer & Designer Ergonomics
- **Dual Mode UX:**
  - **Drop & Run (Batch Mode):** Drag & drop multiple SVGs, observe live percentage savings bars, and download everything as a structured `.zip` archive in one click.
  - **Studio Inspector (Deep Dive):** Visual split slider, side-by-side diff, live XML code editor with syntax highlighting, granular plugin toggles, and coordinate precision sliders (0-5 decimal places).
- **1-Click Component Export:** Convert cleaned SVG directly into:
  - Clean, minified SVG markup
  - React Component (`<SvgIcon ... />` with auto-`currentColor` and props forwarding)
  - Vue 3 Component (`<template><svg ...></template>`)
  - Svelte Component
  - CSS Background Data URI (`data:image/svg+xml,...`)

### Objective 4: Pure Free-Tier Passive Monetization
- **100% Free Access for All Users:** Full access to batch processing, code generation, custom precision, and offline WebAssembly modes with zero gating.
- **Ethical Ad Monetization:** Supported by non-intrusive, privacy-respecting developer ad networks (EthicalAds, Carbon Ads, blended fallback networks: Adsterra / Monetag / Infolinks / A-Ads with Facebank USD payout) targeting ~$150 - $375/month passive income.

---

## 4. Architectural Stack & Technical Blueprint

### 4.1 Frontend Architecture
- **Framework:** Vue 3 (Composition API, `<script setup>`, TypeScript).
- **Styling & Design System:** High-density Tailwind CSS dark mode (Deep Obsidian, Neon Emerald/Cyan accents, glassmorphic panels, monospace telemetry).
- **Core Engine:** 
  - `svgo-browser` / WASM engine running inside dedicated Web Workers to keep UI responsive at 60 FPS.
  - `JSZip` for in-memory batch ZIP creation.
  - `DOMPurify` / Custom AST sanitization pipeline for strict security validation.
- **Local Persistence:** Client-side IndexedDB (via `idb` or `Dexie.js`) for user presets, recent history, and offline state.

### 4.2 Backend & Infrastructure Architecture (Serverless / Static)
- **Deployment:** 100% Client-side Static Web App (Cloudflare Pages, Vercel, or Netlify) with zero backend maintenance requirements.
- **Optional Telemetry / Health:** Minimalist health endpoint if needed (`GET /api/v1/health`), eliminating database overhead.

---

## 5. Modular MVP Implementation Roadmap

- [ ] **Phase 1: Foundation & Scaffold**
  - Vue 3 + Vite SPA setup with dark-mode theme, drag-and-drop file ingestion, and file validation.
- [ ] **Phase 2: In-RAM Optimization & Web Worker Engine**
  - Implement Web Worker SVGO pipeline, precision sliders, plugin toggles, and real-time before/after diff preview.
- [ ] **Phase 3: Batch Engine & Developer Code Generators**
  - Multi-file queue with parallel worker processing, ZIP packager, and React/Vue/DataURI 1-click export clipboard.
- [ ] **Phase 4: Ethical Ad Placement & UI Polish**
  - Integrate privacy-friendly developer ad units (EthicalAds/Carbon slots) seamlessly without disrupting UX.
- [ ] **Phase 5: Programmatic SEO & Distribution Landing Pages**
  - Static long-tail keyword landing pages ("compress figma svg", "svg xss sanitizer", "svg to react component").

---

## 6. Guiding Design Principles & Non-Negotiables

1. **Client Privacy First:** No user SVG file data shall ever touch a remote server.
2. **Instant Feedback Loop:** Every toggle change or slider adjustment must re-render the preview and file size delta in under 16ms (60 FPS feel).
3. **Zero Paywalls & Zero UI Clutter:** All optimization features remain 100% free and open, with clean, keyboard-navigable UX focused on developer productivity.
