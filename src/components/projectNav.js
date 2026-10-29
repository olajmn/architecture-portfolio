// Project-to-project navigation: everything that moves the visitor from
// one project page to its neighbours. Markup functions are called by
// render.js where they sit in the page; neighbours come from
// getAdjacentProjects (projects.js).

// Chevron pointing left; the "next" arrow is the same shape mirrored in CSS
const CHEVRON_SVG = `
  <svg viewBox="0 0 40 120" aria-hidden="true">
    <path d="M32 8 L8 60 L32 112" />
  </svg>`;

function edgeArrowHTML(project, direction, label) {
  return `
    <a class="project-nav project-nav-${direction}" href="project.html?slug=${project.slug}"
       aria-label="${label} project: ${project.title}">
      ${CHEVRON_SVG}
    </a>`;
}

// Prev/next arrows fixed at the screen edges
export function edgeArrowsHTML({ prev, next }) {
  return edgeArrowHTML(prev, "prev", "Previous") + edgeArrowHTML(next, "next", "Next");
}
