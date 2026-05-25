# AGENTS.md

This project's Baseline target is **Baseline 2024**.

## Stack

- Semantic HTML5 only — no React, Vue, or build tools
- Modern CSS: `oklch()`, `clamp()`, nesting, container queries where useful
- Vanilla ES modules pattern via single deferred `assets/js/main.js`
- Fonts: Fontshare (Satoshi + Cabinet Grotesk)

## Rules

- Do not add npm dependencies without explicit discussion
- Do not introduce Vite, Webpack, or Tailwind
- Performance: LCP &lt; 1.5s, CLS &lt; 0.1 — hero image uses `loading="eager"` and `fetchpriority="high"`
- Accessibility: WCAG AA contrast, keyboard nav, `aria-label` on icon-only controls
- Respect `prefers-reduced-motion`
- Copy changes use commit prefix `copy:`; custdev blocks (Hero, Problem) change only with hypothesis or interview data

## File map

- `index.html` — full landing
- `assets/css/tokens.css` — design tokens
- `assets/css/base.css` — reset and utilities
- `assets/css/main.css` — components
- `assets/js/main.js` — theme, form stub, Metrika goals

## Deploy

Push to `main` triggers GitHub Pages (~30–60s). Custom domain: `CNAME` → datagent.ru.
