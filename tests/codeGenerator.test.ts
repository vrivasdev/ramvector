import { describe, it, expect } from 'vitest';
import { generateExportCode, convertToReact, convertToVue, convertToDataUri } from '../src/services/codeGenerator';

describe('Developer Code Generator', () => {
  const sampleSvg = '<svg viewBox="0 0 24 24" stroke-width="2" fill-rule="evenodd"><path d="M0 0h24v24H0z"/></svg>';

  it('converts to React with camelCase props and {...props}', () => {
    const reactCode = convertToReact(sampleSvg, 'HeartIcon');
    expect(reactCode).toContain('export const HeartIcon');
    expect(reactCode).toContain('strokeWidth="2"');
    expect(reactCode).toContain('fillRule="evenodd"');
    expect(reactCode).toContain('{...props}');
    expect(reactCode).not.toContain('stroke-width');
    expect(reactCode).not.toContain('fill-rule');
  });

  it('converts to Vue 3 Single File Component', () => {
    const vueCode = convertToVue(sampleSvg);
    expect(vueCode).toContain('<template>');
    expect(vueCode).toContain('<script setup lang="ts">');
    expect(vueCode).toContain('<svg viewBox="0 0 24 24"');
  });

  it('converts to CSS Data URI', () => {
    const dataUri = convertToDataUri(sampleSvg);
    expect(dataUri).toMatch(/^data:image\/svg\+xml,/);
    expect(dataUri).toContain('%3Csvg');
  });

  it('dispatches properly through generateExportCode', () => {
    const raw = generateExportCode(sampleSvg, 'raw');
    expect(raw).toBe(sampleSvg);

    const svelte = generateExportCode(sampleSvg, 'svelte');
    expect(svelte).toContain('{...$$restProps}');
  });
});
