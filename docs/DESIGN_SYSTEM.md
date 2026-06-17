# Design System — Glenda Timola Real Estate

## Aesthetic
**Modern Luxury** — warm, premium, inviting. Editorial feel that reflects Filipino hospitality with a high-end touch.

## Theme
- **Mode:** Light
- **Mood:** Warm, premium, trustworthy, sophisticated

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-navy` | `#1B2A4A` | Primary — headings, nav background, accents |
| `--color-gold` | `#C9A84C` | Accent — CTAs, highlights, decorative elements |
| `--color-cream` | `#F5F0EB` | Background — sections, cards |
| `--color-white` | `#FFFFFF` | White backgrounds |
| `--color-taupe` | `#A0917B` | Secondary text, muted elements |
| `--color-charcoal` | `#2D2D2D` | Body text |
| `--color-light-gold` | `#F0E6C8` | Subtle accents, hover states |

## Typography

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Display / Headings** | Bricolage Grotesque | 700–800 | sans-serif |
| **Body** | Sora | 300–500 | sans-serif |
| **Accent / Small caps** | Bricolage Grotesque | 500 (uppercase) | sans-serif |

- **Scale:** 1.25 (Major Third)
- **Base:** 16px body
- **Headings:** clamp() for fluid typography

## Spacing
- **Base unit:** 4px
- **Section padding:** 80px–120px vertical
- **Card gaps:** 24px–32px

## Border Radius
- **Cards:** 12px
- **Buttons:** 8px
- **Modals:** 16px

## Shadows
- **Cards:** `0 2px 8px rgba(27, 42, 74, 0.08)`
- **Hover:** `0 8px 24px rgba(27, 42, 74, 0.12)`
- **Nav:** `0 1px 4px rgba(0, 0, 0, 0.06)`

## Components
1. **Navbar** — Sticky, transparent → solid cream on scroll, gold underline on active
2. **Hero** — Full-viewport, navy gradient overlay on background, gold accent CTA
3. **Section Headers** — Editorial style, gold decorative divider
4. **Listing Card** — Image thumbnail, price overlay, beds/baths/sqft badge
5. **Listing Detail** — Separate route, image carousel (CSS-driven), full caption (markdown rendered)
6. **Testimonial Card** — Quote styling, subtle shadow, gold accent quotation
7. **Contact Form** — Cream background, navy inputs on focus, gold submit button
8. **Footer** — Navy background, gold accent links
