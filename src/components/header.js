// Header: logo (scroll-to-top / back-to-index) + burger menu.
// Both pieces act on the same DOM region and share no state, so they
// live in one file rather than two.

import { getAllProjects, projectUrl } from "../projects.js";
import { setFromProject } from "../state.js";

export function initHeader() {
  initLogo();
  initMenu();
}

function initLogo() {
  const btn = document.querySelector('.index-logo-btn');
  if (!btn) return;

  const page = document.body.dataset.page;

  btn.addEventListener('click', () => {
    if (page === 'project') {
      setFromProject();
      window.location.href = 'index.html';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function initMenu() {
  const burger = document.querySelector('.index-burger');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuClose');
  const menuLinks = document.getElementById('menuLinks');

  if (menuLinks) {
    menuLinks.innerHTML = getAllProjects()
      .map((project) => `<a href="${projectUrl(project)}">${project.title}</a>`)
      .join('');
  }

  if (!burger || !overlay || !closeBtn) return;

  const open = () => {
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
  };
  const close = () => {
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  burger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    if (overlay.classList.contains('open') && !overlay.contains(e.target) && !burger.contains(e.target)) {
      close();
    }
  });
}
