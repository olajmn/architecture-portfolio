/* ============================================================
   3. LOGO — skalerer fra 160px (topp) til 32px (ved tickeren)

   tickerScrollY beregnes etter layout og brukes som referansepunkt
   slik at logoen beveger seg jevnt gjennom hele karusellområdet.
============================================================ */
export function initIndexScroll() {
  const logo = document.querySelector('.index-logo');
  const carousel = document.getElementById('carousel');
  const tickerEl = document.querySelector('.ticker');

  if (!logo || !carousel || !tickerEl) return;

  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);


  function applyLogoSize(size) {
    logo.style.height = size + 'px';
    carousel.style.marginTop = (size + 40) + 'px';
  }

  let tickerScrollY = 0;

  applyLogoSize(160);

  window.addEventListener('scroll', () => {
    const ref = tickerScrollY > 0 ? tickerScrollY : 1;
    const size = Math.max(32, 160 - (window.scrollY / ref) * 128);
    applyLogoSize(size);
  });

  setTimeout(() => {
    tickerScrollY = tickerEl.offsetTop - 200;
  }, 0);
}