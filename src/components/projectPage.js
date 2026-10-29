// Controller for the project page: read the slug, find the project,
// hand it to the (pure) view, wire up page-specific interaction
// (ticker color on scroll, project-to-project navigation).

import { getProjectBySlug, getAdjacentProjects } from "../projects.js";
import { renderProject } from "./render.js";
import { initProjectNav } from "./projectNav.js";
import { setFromProject } from "../state.js";

export function initProjectPage() {
  window.addEventListener('pagehide', setFromProject);

  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = getProjectBySlug(slug);

  if (!project) {
    console.error("Project not found:", slug);
    return;
  }

  document.title = project.title;
  const adjacent = getAdjacentProjects(project);
  renderProject(project, adjacent);
  initProjectNav(adjacent);

  trackScrollDirection();
  limitPageTransitionToProjects();
}

// The project → project crossfade (css/pages/project.css § PAGE
// TRANSITION) only makes sense when the next page is a project too;
// leaving for the homepage would otherwise start and then abort it.
function limitPageTransitionToProjects() {
  window.addEventListener('pageswap', (e) => {
    if (!e.viewTransition) return;
    const next = e.activation?.entry?.url;
    if (!next || !new URL(next).pathname.endsWith('/project.html')) {
      e.viewTransition.skipTransition();
    }
  });
}

// One shared scroll listener for the page: marks <html> with
// `scrolling-down` or `scrolling-up` so CSS can react — the ticker dims
// while scrolling down, the mobile project bar shows while scrolling up.
function trackScrollDirection() {
  const root = document.documentElement;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y === lastScrollY) return;
    root.classList.toggle('scrolling-down', y > lastScrollY);
    root.classList.toggle('scrolling-up',   y < lastScrollY);
    lastScrollY = y;
  }, { passive: true });
}
