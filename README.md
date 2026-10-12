# RamVector 🚀
> **Blazing-Fast, Zero-Server SVG Optimizer & Sanitizer in Your Browser's RAM.**

RamVector is a client-side micro web tool engineered to compress, clean, and sanitize SVG files directly inside client RAM using Web Workers and WebAssembly. No files ever leave your device.

## ✨ Core Pillars
- **Zero-Server Trust:** 100% in-browser processing. Zero data uploads, zero privacy compromises.
- **In-RAM Speed:** Parallel multi-core Web Worker optimization pipeline via Comlink.
- **Visual Studio Inspector:** Draggable before/after split slider canvas with zoom/pan and coordinate precision control (0-5 decimals).
- **Security-First Sanitization:** Strips malicious `<script>` tags, inline event handlers, and XXE attack vectors.
- **Developer Code Generators:** 1-Click exports to Clean SVG, React Component (JSX/TSX), Vue 3 SFC, Svelte, and CSS Data URI.
- **Batch Processing:** Multi-file drag-and-drop queue with instant client-side `.zip` download.

## 📁 Repository Structure
```
├── agents/             # Multi-agent roster (Coordinator, Senior Dev, QA, Analyst, UX/UI, WASM, SEO)
├── docs/sdd/           # Software Design Documents (SDD-01 to SDD-06)
├── skills/             # Engineering and design skills (frontend-design, vue-best-practices, qa-tests, etc.)
└── CONSTITUTION.md     # Product constitution & non-negotiables
```

## 🛠️ Tech Stack
- **Framework:** Vue 3 + TypeScript
- **Styling:** Tailwind CSS v4 (Dark Obsidian Theme)
- **Worker RPC:** Comlink
- **Optimizer Engine:** SVGO in-worker
- **Packaging:** fflate (In-memory ZIP)

## 📄 License
MIT License.
