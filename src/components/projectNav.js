// Project-to-project navigation: everything that moves the visitor from
// one project page to its neighbours. Markup functions are called by
// render.js where they sit in the page; neighbours come from
// getAdjacentProjects (projects.js). initProjectNav() wires up the
// behaviour once the page is rendered.

import { getNavHintSeen, markNavHintSeen } from "../state.js";

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

export function initProjectNav() {
  showHintOnce();
}

// The edge arrows are hidden until hovered, so on the first project page
// of a session they flash briefly to show that they exist
function showHintOnce() {
  if (getNavHintSeen() || !window.matchMedia("(hover: hover)").matches) return;
  markNavHintSeen();

  document.querySelectorAll(".project-nav").forEach((arrow) => {
    arrow.classList.add("hint");
    arrow.addEventListener("animationend", () => arrow.classList.remove("hint"), { once: true });
  });
}
