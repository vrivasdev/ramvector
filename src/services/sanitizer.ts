/**
 * RamVector SVG Security Sanitizer & Cruft Stripper
 * Enforces zero-trust in-RAM sanitization against XSS and editor bloat.
 */

export function sanitizeSvg(rawSvg: string, stripCruft = true): string {
  if (!rawSvg || typeof rawSvg !== 'string') {
    return '';
  }

  let cleaned = rawSvg;

  // 1. Strip XML External Entity (XXE) and harmful DOCTYPE declarations
  cleaned = cleaned.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
  cleaned = cleaned.replace(/<!ENTITY[\s\S]*?>/gi, '');

  // 2. Remove all <script>...</script> tags and self-closing <script/> tags
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleaned = cleaned.replace(/<script\b[^>]*\/>/gi, '');

  // 3. Remove all inline event handlers (onabort, onclick, onerror, onload, onmouseover, etc.)
  cleaned = cleaned.replace(/\s+on[a-z]+\s*=\s*(['"]).*?\1/gi, '');
  cleaned = cleaned.replace(/\s+on[a-z]+\s*=\s*[^"'\s>]+/gi, '');

  // 4. Remove dangerous javascript: / data: pseudo-protocols in href and xlink:href
  cleaned = cleaned.replace(/\s+(?:xlink:)?href\s*=\s*(['"])\s*javascript:.*?\1/gi, '');
  cleaned = cleaned.replace(/\s+(?:xlink:)?href\s*=\s*(['"])\s*vbscript:.*?\1/gi, '');

  // 5. Remove suspicious <foreignObject> tags containing scripts or embeds
  cleaned = cleaned.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '');

  // 6. Strip Adobe Illustrator, Inkscape, and Figma editor cruft
  if (stripCruft) {
    // Strip XML namespaces for sodipodi and inkscape
    cleaned = cleaned.replace(/\s+xmlns:inkscape\s*=\s*['"][^'"]*['"]/gi, '');
    cleaned = cleaned.replace(/\s+xmlns:sodipodi\s*=\s*['"][^'"]*['"]/gi, '');
    cleaned = cleaned.replace(/\s+xmlns:sketch\s*=\s*['"][^'"]*['"]/gi, '');
    cleaned = cleaned.replace(/\s+xmlns:i\s*=\s*['"][^'"]*['"]/gi, '');
    cleaned = cleaned.replace(/\s+xmlns:graph\s*=\s*['"][^'"]*['"]/gi, '');

    // Strip editor attributes like inkscape:*, sodipodi:*, sketch:type, etc.
    cleaned = cleaned.replace(/\s+inkscape:[a-z0-9_-]+\s*=\s*(['"]).*?\1/gi, '');
    cleaned = cleaned.replace(/\s+sodipodi:[a-z0-9_-]+\s*=\s*(['"]).*?\1/gi, '');
    cleaned = cleaned.replace(/\s+sketch:[a-z0-9_-]+\s*=\s*(['"]).*?\1/gi, '');
    cleaned = cleaned.replace(/\s+i:[a-z0-9_-]+\s*=\s*(['"]).*?\1/gi, '');

    // Strip sodipodi:namedview tags
    cleaned = cleaned.replace(/<sodipodi:namedview[\s\S]*?\/>/gi, '');
    cleaned = cleaned.replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/gi, '');

    // Strip Adobe Illustrator metadata comments and tags
    cleaned = cleaned.replace(/<!--\s*Generator:\s*Adobe Illustrator[\s\S]*?-->/gi, '');
    cleaned = cleaned.replace(/<!--\s*Created with Inkscape[\s\S]*?-->/gi, '');
  }

  return cleaned.trim();
}
