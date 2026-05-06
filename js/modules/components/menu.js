import { projects } from "../../data.js";

export function initBurgerMenu() {
  const burger = document.querySelector('.index-burger');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuClose');
  const menuLinks = document.getElementById('menuLinks');

  if (menuLinks) {
    const page = document.body.dataset.page;
    const base = page === 'project' ? 'projectPage.html' : 'projectPages/projectPage.html';
    menuLinks.innerHTML = projects.map(item =>
      `<a href="${base}?slug=${item.slug}">${item.title}</a>`
    ).join('');
  }

  if (!burger || !overlay || !closeBtn) return;

  burger.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  });

  document.addEventListener('click', (e) => {
    if (overlay.classList.contains('open') && !overlay.contains(e.target) && !burger.contains(e.target)) {
      overlay.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}