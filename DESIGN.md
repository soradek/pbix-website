# Design System – pbix.pl

## Color Strategy
**Restrained + Committed hybrid:**
- Tinted neutrals as foundation (grays tinted toward green)
- Single emerald accent at 15–25% of surface (primary actions, selected states, hero accents)
- No secondary or tertiary colors; emerald handles all accent duties

### Color Tokens
```
PRIMARY
  Emerald 600: #1e9953 (links, buttons, highlights, borders on hover)
  Emerald 700: #17803f (hover state, darker emphasis)
  Emerald 100: #d4f1e4 (light backgrounds, soft accents)

NEUTRALS
  Foreground: #1d1d1f (primary text)
  Secondary: #6e6e73 (supporting text, muted UI)
  Tertiary: #a6a6a7 (disabled, low-emphasis)
  Border: rgba(0,0,0,0.08) (subtle dividers)
  Background: #ffffff (primary)
  Alt background: #f5f5f7 (sections, cards on light page)

DARK (if used)
  Dark bg: #0f0f0f (never pure #000)
  Dark text: #ffffff (not pure white; off-white #f5f5f7)
```

## Typography

### Font Stack
**Display:** `Geist, -apple-system, sans-serif` (geometric, clean)
**Body:** `Inter, -apple-system, sans-serif` (readable, neutral)
**Code/Mono:** `Menlo, 'Courier New', monospace` (system fallback)

### Hierarchy & Scale
```
H1 (Hero/Page)
  Font-size: clamp(44px, 7vw, 92px)
  Font-weight: 700
  Letter-spacing: -0.03em
  Line-height: 1.1
  Example: "Zamień dane w wartość"

H2 (Section)
  Font-size: clamp(28px, 4vw, 52px)
  Font-weight: 700
  Letter-spacing: -0.02em
  Line-height: 1.2

H3 (Card/Subsection)
  Font-size: 20px
  Font-weight: 600
  Letter-spacing: -0.01em
  Line-height: 1.25

Body
  Font-size: 15–16px
  Font-weight: 400
  Line-height: 1.6–1.75
  Max-width: 65ch

Label/Badge
  Font-size: 11px
  Font-weight: 500
  Letter-spacing: 0.2em
  Text-transform: uppercase
```

## Spacing & Layout

### Base Unit
8px grid. All margins, paddings, gaps scale to multiples of 8.

### Section Padding
- **Desktop:** 120px vertical, 24px horizontal
- **Tablet:** 80px vertical, 20px horizontal  
- **Mobile:** 60px vertical, 16px horizontal

### Container
- Max-width: 1200px
- Margin: auto
- Padding: 0 24px (desktop), 0 16px (mobile)

### Component Spacing
- **Gap between items:** 24px (grid), 16px (list), 12px (compact)
- **Padding inside cards:** 32px (large), 24px (standard), 16px (compact)
- **Whitespace between sections:** Generous — 80–120px between major blocks

### Rhythm
Vary spacing deliberately:
- Hero: large intro + supporting text with 44px gap
- Stats: 56px padding (symmetrical, grounded)
- Cards: unequal top/bottom (top 24px, bottom 32px for optical balance)

## Elevation & Depth

### Shadows
```
Subtle (cards, minor elevation):
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.08)

Medium (floating, interactive):
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.12)

Focus/Hover:
  box-shadow: 0 20px 40px -15px rgba(30,153,83,0.15)
```

### Borders
- Default border: 1px solid rgba(0,0,0,0.08)
- Interactive border: 1px solid rgba(0,0,0,0.12) [hover/focus]
- Accent border: 1px solid #1e9953 [selected]

### Border Radius
- Large containers: 20–28px
- Cards: 16–20px
- Buttons: 980px (fully rounded pill)
- Small UI elements: 8–12px

## Motion & Interaction

### Easing
- Default transitions: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
- Duration: 200–300ms for interactive, 600ms+ for page reveals
- Never animate layout properties (`top`, `left`, `width`, `height`)

### Hover States
- Button: slight scale up (1.02) + shadow shift
- Card: border color + shadow upgrade
- Link: underline animate, color shift to darker green

### Focus (Keyboard)
- Focus ring: 2px solid #1e9953, 2px offset
- Always visible, never removed

## Components

### Buttons
- **Primary (CTA):** Background #1e9953, white text, 15px padding vertical, 32px horizontal
- **Secondary:** Border 1.5px #1e9953, text #1e9953, background transparent
- **Hover:** background darkens to #17803f, subtle shadow
- **Active:** scale 0.98, slight downward translate

### Cards
- Background: #ffffff
- Border: 1px rgba(0,0,0,0.08)
- Padding: 24–32px
- Radius: 16–20px
- Hover: border shifts to rgba(0,0,0,0.12), shadow upgrades, translate Y -4px

### Forms
- Input: white background, border 1px rgba(0,0,0,0.08), radius 8px
- Focus: border #1e9953, shadow focus ring
- Error: border #dc2626, supporting text red

### Navigation
- Fixed top, floating pill design (rounded)
- Backdrop blur for depth
- Active link: text color #1e9953, optional underline

## Images & Media

### Placeholders
Use `https://picsum.photos/seed/{identifier}/1920/1080` for consistency.

### Photography Style
- Clean, professional shots
- Real people over stock (if available)
- Well-lit, no harsh shadows
- Color graded warm (if applicable to green palette)

### Icons
- Source: Phosphor (Light weight, 1.5 stroke) or custom SVG
- Color: Inherit from text unless specified (#1e9953 for accent)
- Size: 20–24px standard, 16px compact, 32px+ display

## Dark Mode
**Not currently designed.** If implementing:
- Base dark: #0f0f0f
- Cards: #1a1a1a
- Text: #f5f5f7
- Accent: #1e9953 (unchanged, but test contrast)

---

**Last updated:** 2025-05-27
**Status:** Active
**Note:** This system is optimized for brand hierarchy, readability, and premium perception. Deviate only with strong justification.
