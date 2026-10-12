# SDD-03: UI/UX Studio & Canvas Design Specification

## 1. Visual Design Tokens
- **Theme:** High-contrast developer obsidian dark mode.
- **Palette:**
  - Base: `#0a0d14` (Deep Space)
  - Surface: `#111726` (Slate Card)
  - Border: `#1e293b` (Subtle boundary)
  - Accents: `#10b981` (Emerald), `#06b6d4` (Cyan)
- **Typography:**
  - UI Labels: Inter / System sans-serif.
  - Numbers, Metrics, Code: JetBrains Mono / Monospace.

## 2. Interactive Canvas Split-Slider Specifications
- **Synchronized Viewport:** Two superimposed canvas/SVG view layers inside a single bounding container.
- **Divider Handle:** Draggable vertical split slider positioned between 0% and 100% width.
- **Comparison Modes:**
  - Split slider (left = original, right = optimized).
  - Side-by-side toggle.
  - Diff highlight overlay.
- **Pan & Zoom Controls:**
  - Zoom range: 25% to 800% with mouse wheel and pinch gestures.
  - 100% 1:1 Reset button with active zoom indicator.
