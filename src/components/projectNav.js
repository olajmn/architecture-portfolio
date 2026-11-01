// Project-to-project navigation: everything that moves the visitor from
// one project page to its neighbours. Markup functions are called by
// render.js where they sit in the page; neighbours come from
// getAdjacentProjects (projects.js). initProjectNav() wires up the
// behaviour once the page is rendered.

// Contents
//
// 1. Markup
//    - CHEVRON_SVG
//    - edgeArrowsHTML()
//    - mobileBarHTML()
//    - nextProjectHTML()
//    - edgeArrowHTML()
//
// 2. Behaviour
//    - initProjectNav()
//    - showHintOnce()
//    - keepArrowAfterClick()
//    - listenForArrowKeys()

import { getThumbnailImage, imageUrl, projectUrl } from "../projects.js";
import { getNavHintSeen, markNavHintSeen, setNavArrival, takeNavArrival } from "../state.js";

// 1. Markup

// Chevron pointing left; the "next" arrow is the same shape mirrored in CSS
const CHEVRON_SVG = `
  <svg viewBox="0 0 40 120" aria-hidden="true">
    <path d="M32 8 L8 60 L32 112" />
  </svg>`;

// Prev/next arrows fixed at the screen edges
export function edgeArrowsHTML({ prev, next }) {
  return edgeArrowHTML(prev, "prev", "Previous") + edgeArrowHTML(next, "next", "Next");
}

// Slim bar for touch devices: previous and next project by name. CSS
// shows it only while scrolling up (the `scrolling-up` class that
// projectPage.js sets on <html>).
export function mobileBarHTML({ prev, next }) {
  return `
    <nav class="project-bar" aria-label="Other projects">
      <a href="${projectUrl(prev)}"><span aria-hidden="true">←</span> ${prev.title}</a>
      <a href="${projectUrl(next)}">${next.title} <span aria-hidden="true">→</span></a>
    </nav>`;
}

// Invitation to the next project at the bottom of the page: label, title
// and a small, uncropped preview of its thumbnail. The image is
// decorative — the link text already names the project.
export function nextProjectHTML(next) {
  const image = getThumbnailImage(next);
  return `
    <a class="project-next" href="${projectUrl(next)}">
      <span class="project-next-label">Next project</span>
      <span class="project-next-title">${next.title} <span class="project-next-arrow" aria-hidden="true">→</span></span>
      <img class="project-next-img" src="${imageUrl(next, image)}" alt="" />
    </a>`;
}

function edgeArrowHTML(project, direction, label) {
  return `
    <a class="project-nav project-nav-${direction}" data-direction="${direction}" href="${projectUrl(project)}"
       aria-label="${label} project: ${project.title}">
      ${CHEVRON_SVG}
    </a>`;
}

// 2. Behaviour

export function initProjectNav(adjacent) {
  showHintOnce();
  keepArrowAfterClick();
  listenForArrowKeys(adjacent);
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

// A freshly loaded page has no hover state until the mouse moves, so the
// arrow just clicked would vanish under a still cursor. Remember which
// edge was clicked and keep that arrow shown on the next page until the
// mouse is somewhere else.
function keepArrowAfterClick() {
  document.querySelectorAll(".project-nav").forEach((arrow) => {
    arrow.addEventListener("click", () => setNavArrival(arrow.dataset.direction));
  });

  const direction = takeNavArrival();
  const arrow = direction && document.querySelector(`.project-nav-${direction}`);
  if (!arrow) return;

  arrow.classList.add("arrived");
  const release = (e) => {
    if (arrow.contains(e.target)) return;
    arrow.classList.remove("arrived");
    document.removeEventListener("mousemove", release);
  };
  document.addEventListener("mousemove", release);
}

// ← / → go to the previous / next project. Left alone when a modifier is
// held (browser shortcuts such as Alt+← for "back") or while typing in a
// field.
function listenForArrowKeys({ prev, next }) {
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;

    if (e.key === "ArrowLeft")  window.location.href = projectUrl(prev);
    if (e.key === "ArrowRight") window.location.href = projectUrl(next);
  });
}
