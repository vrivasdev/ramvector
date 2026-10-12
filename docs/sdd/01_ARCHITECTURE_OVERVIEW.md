# SDD-01: Architecture & Technical Overview

## 1. System Vision & Constraints
RamVector is a client-side micro web application engineered to optimize, clean, and sanitize SVG assets strictly inside client browser RAM using Web Workers and WebAssembly.

### 1.1 Architectural Constraints
- **Zero-Server Trust:** Zero SVG data payloads or telemetry containing user content may be transmitted to external servers.
- **Main Thread Isolation (60 FPS):** All heavy parsing, AST transformations, and minification operations must run off-thread via Web Workers (`Comlink`).
- **Memory Bounds & Zero Leaks:** In-memory Object URLs and Blob references must be explicitly revoked via `URL.revokeObjectURL()` on file removal or reset.

## 2. Technology Stack
- **Framework:** Vue 3 (Composition API, `<script setup>`, TypeScript).
- **Build Tool:** Vite 6 with PWA support.
- **Worker Communication:** `comlink` (Google Chrome Labs).
- **Core Optimization Engine:** `svgo-browser` / WASM AST pipeline with custom security AST sanitizer.
- **Packaging:** `fflate` for client-side asynchronous ZIP creation.
- **Styling:** Tailwind CSS v4 with dark obsidian aesthetic tokens (`#0a0d14`).
- **State Management:** Reactive composables (`useOptimizer`, `useBatchQueue`, `useStudioState`) backed by `idb-keyval` for persistent settings.

## 3. High-Level Component Architecture
```
App.vue
├── HeaderBar.vue (Brand Logo, In-RAM Privacy Badge, GitHub Link)
├── MainContainer.vue
│   ├── ModeSwitcher.vue (Studio Mode vs. Batch Drop Mode)
│   ├── BatchView.vue (Active in Batch Mode)
│   │   ├── DropZone.vue (Drag-and-Drop, File Picker, Multi-SVG validation)
│   │   ├── BatchQueueList.vue (File cards, % savings, mini preview)
│   │   └── BatchActionBar.vue (Global Precision, Download All ZIP, Clear)
│   └── StudioView.vue (Active in Single/Studio Mode)
│       ├── CanvasViewport.vue (Before/After Split Slider, Pan/Zoom controls)
│       ├── TelemetryPanel.vue (Exact byte deltas, % saved, parse latency)
│       ├── PrecisionSlider.vue (0-5 decimal places)
│       ├── PluginToggles.vue (Figma cruft, Illustrator cruft, Comments, XSS)
│       └── CodeExportDrawer.vue (Raw SVG, React JSX, Vue 3 SFC, Data URI)
└── EthicalAdBanner.vue (Non-intrusive sponsor unit, CLS=0 reserved container)
```
