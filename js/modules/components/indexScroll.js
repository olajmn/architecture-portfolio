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
  const savedLogoH   = parseFloat(sessionStorage.getItem('savedLogoH'));

  if (fromProject)  sessionStorage.removeItem('fromProject');
  if (introPlaying) sessionStorage.removeItem('introPlaying');
  sessionStorage.removeItem('savedLogoH');

  // Save exact logo height just before teardown so refresh can restore it
  // instantly — avoids the 160px flash while the correct size is computed.
  window.addEventListener('pagehide', () => {
    sessionStorage.setItem('savedLogoH', logo.offsetHeight);
  });

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
  } else if (savedLogoH) {
    // Refresh: restore exact logo size from last visit so layout is correct
    // before the browser's own scroll restoration kicks in — no flash.
    applyLogoSize(savedLogoH);
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
    document.getElementById('pre-render-fix')?.remove();
  }, 0);
}
