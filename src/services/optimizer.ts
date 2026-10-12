import { sanitizeSvg } from './sanitizer';
import type { OptimizerConfig, OptimizationResult } from '../types';

// Import the standalone browser distribution of SVGO
// @ts-ignore
import { optimize } from 'svgo/dist/svgo.browser.js';

export const DEFAULT_OPTIMIZER_CONFIG: OptimizerConfig = {
  precision: 3,
  removeComments: true,
  stripEditorCruft: true,
  purgeScriptsAndEvents: true,
  multipass: true,
  cleanViewBox: true,
  removeDimensions: false
};

export function runOptimization(
  svgString: string,
  config: Partial<OptimizerConfig> = {},
  fileName = 'vector.svg'
): OptimizationResult {
  const mergedConfig: OptimizerConfig = {
    ...DEFAULT_OPTIMIZER_CONFIG,
    ...config
  };

  const start = performance.now();
  const originalSize = new Blob([svgString]).size;

  try {
    // 1. Pre-sanitization pass
    let processed = svgString;
    if (mergedConfig.purgeScriptsAndEvents || mergedConfig.stripEditorCruft) {
      processed = sanitizeSvg(processed, mergedConfig.stripEditorCruft);
    }

    // 2. Configure SVGO plugins
    const plugins: any[] = [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeComments: mergedConfig.removeComments,
            removeDoctype: true,
            removeXMLProcInst: true,
            removeMetadata: true,
            removeEditorsNSData: mergedConfig.stripEditorCruft,
            cleanupNumericValues: {
              floatPrecision: mergedConfig.precision
            },
            convertPathData: {
              floatPrecision: mergedConfig.precision
            },
            convertTransform: {
              floatPrecision: mergedConfig.precision
            },
            removeViewBox: false // Preserve viewBox by default for responsive rendering
          }
        }
      }
    ];

    if (mergedConfig.removeDimensions) {
      plugins.push({ name: 'removeDimensions' });
    }

    const svgoResult = optimize(processed, {
      multipass: mergedConfig.multipass,
      plugins
    });

    const optimizedSvgText = svgoResult.data || processed;
    const optimizedSize = new Blob([optimizedSvgText]).size;
    const durationMs = Math.round(performance.now() - start);
    const savings = originalSize > 0 
      ? Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100))
      : 0;

    return {
      id: Math.random().toString(36).substring(2, 9),
      name: fileName,
      originalSize,
      optimizedSize,
      savingsPercentage: savings,
      originalSvgText: svgString,
      optimizedSvgText,
      durationMs
    };
  } catch (err: any) {
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: fileName,
      originalSize,
      optimizedSize: originalSize,
      savingsPercentage: 0,
      originalSvgText: svgString,
      optimizedSvgText: svgString,
      durationMs: Math.round(performance.now() - start),
      error: err?.message || 'Optimization failed'
    };
  }
}
