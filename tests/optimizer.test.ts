import { describe, it, expect } from 'vitest';
import { runOptimization, DEFAULT_OPTIMIZER_CONFIG } from '../src/services/optimizer';

describe('SVGO In-RAM Optimizer', () => {
  const bloatedSvg = `
    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
      <!-- A comment that should be stripped -->
      <g>
        <circle cx="50.123456" cy="50.987654" r="40.000000" fill="#ff0000"/>
      </g>
    </svg>
  `;

  it('optimizes SVG and removes comments and metadata', () => {
    const result = runOptimization(bloatedSvg, { precision: 2 });
    expect(result.optimizedSize).toBeLessThan(result.originalSize);
    expect(result.savingsPercentage).toBeGreaterThan(0);
    expect(result.optimizedSvgText).not.toContain('Adobe Illustrator');
    expect(result.optimizedSvgText).not.toContain('A comment that should be stripped');
    expect(result.optimizedSvgText).toContain('<circle');
  });

  it('applies coordinate precision rounding', () => {
    const result = runOptimization(bloatedSvg, { precision: 1 });
    // precision 1 rounds 50.123456 -> 50.1
    expect(result.optimizedSvgText).not.toContain('50.123456');
  });

  it('handles invalid SVG without crashing and reports error', () => {
    const invalid = '<<<not a valid svg>>>';
    const result = runOptimization(invalid);
    expect(result.error).toBeDefined();
    expect(result.optimizedSvgText).toBe(invalid);
  });
});
