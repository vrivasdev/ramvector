# SDD-02: Core Optimizer & Security Sanitizer Engine

## 1. Engine Pipeline Architecture
The optimization pipeline executes inside a dedicated Web Worker via Comlink RPC to prevent UI stutter.

```
Raw SVG Input (Text/Blob)
  ↓
1. Security Pre-Sanitizer (AST Parser)
   - Strip `<script>`, `onload`, `onerror`, `onclick`, inline JS
   - Strip `xlink:href="javascript:..."` & external entity definitions
  ↓
2. Editor Cruft Purger
   - Strip `inkscape:*`, `sodipodi:*`, Adobe Illustrator private XML tags
   - Strip Sketch & Figma editor IDs and namespaces
  ↓
3. SVGO Plugin Pipeline (Customized Matrix)
   - `cleanupAttrs`, `removeDoctype`, `removeXMLProcInst`, `removeComments`
   - `removeMetadata`, `removeTitle`, `removeDesc`, `removeUselessDefs`
   - `cleanupNumericValues` (Precision = N)
   - `convertPathData`, `convertTransform`, `removeEmptyAttrs`
  ↓
4. Precision Normalizer (Float decimal limiter: 0 to 5)
  ↓
Clean Optimized SVG Output + Telemetry Metrics (Bytes saved, % ratio, time taken)
```

## 2. Worker Interface Definition
```typescript
export interface OptimizerConfig {
  precision: number; // 0 to 5, default: 3
  removeComments: boolean;
  stripEditorCruft: boolean;
  purgeScriptsAndEvents: boolean;
  multipass: boolean;
  cleanViewBox: boolean;
}

export interface OptimizationResult {
  id: string;
  name: string;
  originalSize: number;
  optimizedSize: number;
  savingsPercentage: number;
  optimizedSvgText: string;
  durationMs: number;
}
```
