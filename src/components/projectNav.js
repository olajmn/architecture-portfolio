// Project-to-project navigation: everything that moves the visitor from
// one project page to its neighbours. Markup functions are called by
// render.js where they sit in the page; neighbours come from
// getAdjacentProjects (projects.js). initProjectNav() wires up the
// behaviour once the page is rendered.

import { getThumbnailImage, imageUrl } from "../projects.js";
import { getNavHintSeen, markNavHintSeen } from "../state.js";

// Chevron pointing left; the "next" arrow is the same shape mirrored in CSS
const CHEVRON_SVG = `
  <svg viewBox="0 0 40 120" aria-hidden="true">
    <path d="M32 8 L8 60 L32 112" />
  </svg>`;

const projectUrl = (project) => `project.html?slug=${project.slug}`;

function edgeArrowHTML(project, direction, label) {
  return `
    <a class="project-nav project-nav-${direction}" href="${projectUrl(project)}"
       aria-label="${label} project: ${project.title}">
      ${CHEVRON_SVG}
    </a>`;
}

// Prev/next arrows fixed at the screen edges
export function edgeArrowsHTML({ prev, next }) {
  return edgeArrowHTML(prev, "prev", "Previous") + edgeArrowHTML(next, "next", "Next");
}

// Invitation to the next project at the bottom of the page: label, title
// and a cropped strip of its thumbnail. The image is decorative — the
// link text already names the project.
export function nextProjectHTML(next) {
  const image = getThumbnailImage(next);
  return `
    <a class="project-next" href="${projectUrl(next)}">
      <span class="project-next-label">Next project</span>
      <span class="project-next-title">${next.title}</span>
      <img class="project-next-img" src="${imageUrl(next, image)}" alt=""
           ${image.focalPoint ? `style="object-position: ${image.focalPoint}"` : ""} />
    </a>`;
}

export function initProjectNav(adjacent) {
  showHintOnce();
  listenForArrowKeys(adjacent);
}

// ← / → go to the previous / next project. Left alone when a modifier is
// held (browser shortcuts such as Alt+← for "back"), while typing in a
// field, or while the menu overlay is open.
function listenForArrowKeys({ prev, next }) {
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;
    if (document.body.classList.contains("menu-open")) return;

    if (e.key === "ArrowLeft")  window.location.href = projectUrl(prev);
    if (e.key === "ArrowRight") window.location.href = projectUrl(next);
  });
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
