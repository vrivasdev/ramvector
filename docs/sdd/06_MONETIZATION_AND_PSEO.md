# SDD-06: Passive Monetization & Programmatic SEO (pSEO)

## 1. Ethical Developer Ads Architecture
- Dedicated sponsor card positioned below the core workspace to avoid accidental clicks and preserve high developer trust.
- Strict Cumulative Layout Shift guard (CLS = 0) with a pre-rendered reserved skeleton height (`min-h-[100px]`).
- Supports primary network (EthicalAds / Carbon) with privacy-friendly text-and-logo units.
- Fallback script loaders for supplementary networks (Adsterra / Monetag / Infolinks / A-Ads) targeting ~$150-$375/month passive revenue.

## 2. Programmatic SEO (pSEO) Architecture
- Static content pages compiled with prerendered metadata:
  - `/tools/compress-figma-svg`
  - `/tools/svg-xss-sanitizer`
  - `/tools/svg-to-react-jsx`
  - `/tools/clean-illustrator-svg`
- High-intent keyword targeting, OpenGraph tags, and valid Schema.org `WebApplication` structured data.
