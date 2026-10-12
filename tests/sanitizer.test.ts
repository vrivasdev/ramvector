import { describe, it, expect } from 'vitest';
import { sanitizeSvg } from '../src/services/sanitizer';

describe('SVG Security Sanitizer', () => {
  it('purges <script> tags and inner code', () => {
    const malicious = '<svg><script>alert("xss")</script><circle cx="5" cy="5" r="5"/></svg>';
    const cleaned = sanitizeSvg(malicious);
    expect(cleaned).not.toContain('<script');
    expect(cleaned).not.toContain('alert("xss")');
    expect(cleaned).toContain('<circle cx="5" cy="5" r="5"/>');
  });

  it('purges inline event handlers like onload, onerror, onclick', () => {
    const malicious = '<svg onload="alert(1)"><circle cx="5" cy="5" r="5" onclick="fetch(\'bad.com\')"/></svg>';
    const cleaned = sanitizeSvg(malicious);
    expect(cleaned).not.toContain('onload');
    expect(cleaned).not.toContain('onclick');
    expect(cleaned).not.toContain('alert(1)');
  });

  it('purges javascript: and vbscript: URIs in xlink:href and href', () => {
    const malicious = '<svg><a xlink:href="javascript:alert(1)"><text>Click</text></a></svg>';
    const cleaned = sanitizeSvg(malicious);
    expect(cleaned).not.toContain('javascript:alert(1)');
  });

  it('strips XXE and harmful DOCTYPE declarations', () => {
    const malicious = '<!DOCTYPE svg SYSTEM "http://evil.com/xxe.dtd"><svg><circle r="10"/></svg>';
    const cleaned = sanitizeSvg(malicious);
    expect(cleaned).not.toContain('<!DOCTYPE');
    expect(cleaned).toContain('<circle r="10"/>');
  });

  it('strips Inkscape and Illustrator editor cruft when enabled', () => {
    const bloated = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape">
        <!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <sodipodi:namedview id="base"/>
        <path inkscape:connector-curvature="0" d="M0 0 L10 10"/>
      </svg>
    `;
    const cleaned = sanitizeSvg(bloated, true);
    expect(cleaned).not.toContain('xmlns:inkscape');
    expect(cleaned).not.toContain('inkscape:connector-curvature');
    expect(cleaned).not.toContain('sodipodi:namedview');
    expect(cleaned).not.toContain('Adobe Illustrator');
    expect(cleaned).toContain('d="M0 0 L10 10"');
  });
});
