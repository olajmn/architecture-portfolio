/* ============================================================
   4. LOGO BUTTON — scroll to top
============================================================ */
import { setFromProject } from "../../appState.js";

export function initLogo() {
  const btn = document.querySelector('.index-logo-btn');
  if (!btn) return;

  const handlers = {
    index: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    project: () => {
      setFromProject();
      window.location.href = '../index.html';
    }
  };

  const page = document.body.dataset.page;
  btn.addEventListener('click', handlers[page] || handlers.index);
}