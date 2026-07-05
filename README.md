# Architecture Portfolio

A portfolio site showcasing architectural work — built with plain HTML, CSS, and vanilla JavaScript (no framework, no build step).

**Live site:** https://olajmn.github.io/architecture-portfolio/

## Projects featured

- In the Quarry — Academic
- Shifted — Bachelor's thesis
- Women's House — Competition
- Lean-to — Academic
- Sagvåg Senior Garden — Master's Thesis
- Passage — Academic

## Tech

- Vanilla JavaScript (ES modules)
- CSS (no preprocessor)
- No frameworks, no bundler — runs directly in the browser

## Structure

```
index.html                 Landing page (grid + carousel)
projectPages/               Shared template for individual project pages
js/
  data.js                   Single source of truth for all project content
  appState.js                sessionStorage helpers (intro/animation state)
  modules/components/       One file per UI component (carousel, menu, ticker, ...)
css/
  shared/                   Reset, variables, typography, base styles
  components/               Per-component styles
  pages/                    Page-specific styles
```

Each project is one entry in `js/data.js` (images, text, facts). The grid, carousel, menu, and project page all read from that array, so adding or editing a project only requires touching one file.
