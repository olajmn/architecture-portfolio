/* ============================================================
   4. LOGO-KNAPP — scroll til toppen
============================================================ */
export function initLogo() {
  const btn = document.querySelector('.index-logo-btn');
  if (!btn) return;

  const handlers = {
    index: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    project: () => {
      sessionStorage.setItem('fromProject', '1');
      window.location.href = '../index.html';
    }
  };

  const page = document.body.dataset.page;
  btn.addEventListener('click', handlers[page] || handlers.index);
}