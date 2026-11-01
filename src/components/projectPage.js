// Controller for the project page: read the slug, find the project,
// hand it to the (pure) view, wire up page-specific interaction
// (scroll-to-top buttons, ticker color on scroll, project-to-project
// navigation).

// Contents
//
// 1. Page
//    - initProjectPage()
//
// 2. Scrolling
//    - listenForScrollTop()
//    - trackScrollDirection()

import { getProjectBySlug, getAdjacentProjects } from "../projects.js";
import { renderProject } from "./render.js";
import { initProjectNav } from "./projectNav.js";
import { setFromProject } from "../state.js";

// 1. Page

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

  listenForScrollTop();
  trackScrollDirection();
}

// 2. Scrolling

// Buttons marked `data-scroll-top` by render.js (the ticker title and "Top")
function listenForScrollTop() {
  document.querySelectorAll('[data-scroll-top]').forEach((btn) => {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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
