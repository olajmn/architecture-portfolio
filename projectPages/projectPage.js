import { projects } from "../js/data.js";
import { renderProject } from "./projectRender.js";

export function initProjectPage() {
  window.addEventListener('pagehide', () => {
    sessionStorage.setItem('fromProject', '1');
  });

  const slug = new URLSearchParams(window.location.search).get("slug");

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    console.error("Project not found:", slug);
    return;
  }

  renderProject(project);

  const ticker = document.querySelector('.project-ticker');
  if (ticker) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      ticker.classList.toggle('scrolled', window.scrollY > lastScrollY);
      lastScrollY = window.scrollY;
    });
  }
}

