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
index.html                 Landing page (grid)
project.html                Shared template for every project page (?slug=...)
data/
  projects.js               The only place project content is authored
src/
  main.js                   Orchestrates page setup
  state.js                  sessionStorage helpers
  projects.js                Data-access: getProjectBySlug, getCoverImage, imageUrl, ...
  components/                One file per UI concern (header, ticker,
                              projectGrid, indexScroll, projectPage, render,
                              projectNav)
css/
  shared/                   Reset, variables, typography, base styles
  components/               Per-component styles (header, menu, ticker, cards,
                              project-nav)
  pages/                    Page-specific styles (project.css)
images/
  <slug>/                   One folder per project, filenames referenced by data/projects.js
```

Each project is one entry in `data/projects.js`: a flat set of fields (`slug`, `title`,
`year`, `type`, `location`, `program`, `description`) plus a single `images` array.
There is no separate list of "display" images — every view (grid card, project page)
derives what it needs from that one array:

- the grid card uses the project's `thumbnail` if set, otherwise its first image (`images[0]`)
- the project page renders the full array (`images[0]` as hero, the rest as gallery)

Adding or editing a project means touching `data/projects.js` and its `images/<slug>/`
folder — nothing else.

## Moving between projects

Project pages link to their neighbours in the order of `data/projects.js`, looping
from the last project back to the first (`getAdjacentProjects` in `src/projects.js`).
Everything else lives in `src/components/projectNav.js` and
`css/components/project-nav.css`:

- **Desktop** (devices that can hover): large chevrons at the left and right screen
  edges, hidden until the mouse reaches that edge. They flash once on the first
  project page of a session so visitors learn they are there. The ← / → keys do
  the same.
- **Touch devices**: a slim bar at the bottom naming the previous and next project,
  shown while scrolling up.
- **Every device**: a "Next project" block at the bottom of the page, with a small
  preview image.
