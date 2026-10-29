// Restores the homepage's scroll position after a reload, and reveals
// the page (see the `restoring-scroll` class set by index.html's inline
// <head> script, which hides <body> until this has run).

import { getScrollY, setScrollY } from "../state.js";

export function initIndexScroll() {
  // Homepage only — project pages share the header markup, so checking
  // for an element is not enough to tell the pages apart
  if (document.body.dataset.page !== 'index') return;

  const y = getScrollY();
  if (y) window.scrollTo({ top: y, behavior: 'instant' });
  document.documentElement.classList.remove('restoring-scroll');

  window.addEventListener('pagehide', () => setScrollY(window.scrollY));
}
