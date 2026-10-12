import { describe, it, expect } from 'vitest';
import { createZipArchive } from '../src/services/zipPackager';
import { unzipSync, strFromU8 } from 'fflate';

describe('In-RAM ZIP Packager', () => {
  it('bundles multiple SVGs into a valid in-memory zip archive', () => {
    const files = [
      { name: 'icon1.svg', content: '<svg id="1"></svg>' },
      { name: 'icon2.svg', content: '<svg id="2"></svg>' }
    ];

    const zipBytes = createZipArchive(files);
    expect(zipBytes).toBeInstanceOf(Uint8Array);
    expect(zipBytes.length).toBeGreaterThan(0);

    // Verify unzipping matches original contents
    const unzipped = unzipSync(zipBytes);
    expect(Object.keys(unzipped)).toContain('icon1.svg');
    expect(Object.keys(unzipped)).toContain('icon2.svg');
    expect(strFromU8(unzipped['icon1.svg'])).toBe('<svg id="1"></svg>');
    expect(strFromU8(unzipped['icon2.svg'])).toBe('<svg id="2"></svg>');
  });

  it('appends .svg extension if missing', () => {
    const files = [{ name: 'star', content: '<svg></svg>' }];
    const zipBytes = createZipArchive(files);
    const unzipped = unzipSync(zipBytes);
    expect(Object.keys(unzipped)).toContain('star.svg');
  });
});
