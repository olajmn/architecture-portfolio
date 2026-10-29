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

  const ticker = document.querySelector('.project-ticker');
  if (ticker) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      ticker.classList.toggle('scrolled', window.scrollY > lastScrollY);
      lastScrollY = window.scrollY;
    });
  }
}
