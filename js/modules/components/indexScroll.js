/* ============================================================
   3. LOGO — skalerer fra 160px (topp) til 40px (ved tickeren)
   TICKER — festes under headeren når den treffer toppen
============================================================ */
export function initIndexScroll() {
  const logo = document.querySelector('.index-logo');
  const carousel = document.getElementById('carousel');
  const tickerEl = document.querySelector('.ticker');

  if (!logo || !carousel || !tickerEl) return;

  const fromProject  = sessionStorage.getItem('fromProject')  === '1';
  const introPlaying = sessionStorage.getItem('introPlaying') === '1';

  if (fromProject)  sessionStorage.removeItem('fromProject');
  if (introPlaying) sessionStorage.removeItem('introPlaying');

  // Only override scroll restoration when we're deliberately jumping somewhere.
  // On a plain refresh we want the browser to put the user back where they were.
  history.scrollRestoration = (fromProject || introPlaying) ? 'manual' : 'auto';

  let tickerFixed = false;
  let tickerSpacer = null;

  function applyLogoSize(size) {
    logo.style.height = size + 'px';
    carousel.style.marginTop = (size + 40) + 'px';
  }

  function updateTicker() {
    const headerH = logo.offsetHeight + 40;

    if (!tickerFixed && tickerEl.getBoundingClientRect().top <= headerH) {
      tickerSpacer = document.createElement('div');
      tickerSpacer.style.height = tickerEl.offsetHeight + 'px';
      tickerEl.insertAdjacentElement('afterend', tickerSpacer);
      tickerEl.style.position = 'fixed';
      tickerEl.style.width = 'calc(100% - 12px)';
      tickerEl.style.top = headerH + 'px';
      tickerFixed = true;
    }

    if (tickerFixed) {
      tickerEl.style.top = headerH + 'px';

      if (tickerSpacer && tickerSpacer.getBoundingClientRect().top > headerH + 1) {
        tickerEl.style.position = '';
        tickerEl.style.top = '';
        tickerEl.style.width = '';
        tickerSpacer.remove();
        tickerSpacer = null;
        tickerFixed = false;
      }
    }
  }

  let tickerScrollY = 0;

  if (fromProject) {
    applyLogoSize(40);
    setTimeout(() => {
      tickerEl.scrollIntoView({ behavior: 'instant' });
    }, 0);
  } else if (introPlaying) {
    window.scrollTo(0, 0);
    applyLogoSize(160);
  } else {
    applyLogoSize(160);
  }

  window.addEventListener('scroll', () => {
    const ref = tickerScrollY > 0 ? tickerScrollY : 1;
    const size = Math.max(40, 160 - (window.scrollY / ref) * 120);
    applyLogoSize(size);
    updateTicker();
  });

  setTimeout(() => {
    tickerScrollY = tickerEl.offsetTop - 200;
    if (!fromProject && !introPlaying) {
      const ref  = tickerScrollY > 0 ? tickerScrollY : 1;
      const size = Math.max(40, 160 - (window.scrollY / ref) * 120);
      applyLogoSize(size);
      updateTicker();
    }
  }, 0);
}
