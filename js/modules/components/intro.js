export function initIntro() {
  const overlay     = document.getElementById('introOverlay');
  const overlayLogo = document.getElementById('introLogo');
  const realLogo    = document.querySelector('.index-logo');

  if (!overlay || !overlayLogo || !realLogo) return;

  if (sessionStorage.getItem('fromProject') === '1') {
    overlay.remove();
    return;
  }

  realLogo.style.opacity = '0';
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    // FLIP: record where the big logo is, and where it needs to end up
    const startRect = overlayLogo.getBoundingClientRect();
    const finalRect = realLogo.getBoundingClientRect();

    // Move overlay logo to final position at natural size
    overlayLogo.style.position      = 'fixed';
    overlayLogo.style.zIndex        = '1000';
    overlayLogo.style.margin        = '0';
    overlayLogo.style.top           = finalRect.top + 'px';
    overlayLogo.style.left          = finalRect.left + 'px';
    overlayLogo.style.width         = finalRect.width + 'px';
    overlayLogo.style.height        = finalRect.height + 'px';
    overlayLogo.style.transformOrigin = 'top left';

    // Invert: push it back visually to where it started
    const dx    = startRect.left - finalRect.left;
    const dy    = startRect.top  - finalRect.top;
    const scale = startRect.width / finalRect.width;
    overlayLogo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    overlayLogo.offsetHeight; // force reflow

    // Play: animate logo to header
    overlayLogo.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
    overlayLogo.style.transform  = 'none';

    // After logo lands: show real logo, fade out overlay
    setTimeout(() => {
      realLogo.style.transition = 'opacity 0.15s ease';
      realLogo.style.opacity    = '1';
      overlay.style.opacity     = '0';

      setTimeout(() => {
        overlay.remove();
        realLogo.style.opacity    = '';
        realLogo.style.transition = '';
        document.body.style.overflow = '';
      }, 400);
    }, 880);
  }, 700);
}
