import { getScrollY, setScrollY } from "../../appState.js";

export function initIndexScroll() {
  const logo = document.querySelector('.index-logo');
  if (!logo) return;

  const y = getScrollY();
  if (y) window.scrollTo({ top: y, behavior: 'instant' });
  document.documentElement.classList.remove('restoring-scroll');

  window.addEventListener('pagehide', () => setScrollY(window.scrollY));
}
