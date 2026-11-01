// Header: the logo, which scrolls to the top on the homepage and goes
// back to the homepage from a project page.

// Contents
//
// 1. Logo Button
//    - initHeader()

// 1. Logo Button

export function initHeader() {
  const btn = document.querySelector('.index-logo-btn');
  if (!btn) return;

  const page = document.body.dataset.page;

  btn.addEventListener('click', () => {
    // Leaving a project page records "from project" itself (projectPage.js, pagehide)
    if (page === 'project') {
      window.location.href = 'index.html';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
