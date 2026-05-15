export function initIntro() {
  const overlay     = document.getElementById('introOverlay');
  const overlayLogo = document.getElementById('introLogo');
  const realLogo    = document.querySelector('.index-logo');
  const header      = document.querySelector('.index-hero');

  if (!overlay || !overlayLogo || !realLogo) return;

  if (sessionStorage.getItem('fromProject') === '1' || sessionStorage.getItem('introSeen') === '1') {
    overlay.remove();
    overlayLogo.remove();
    return;
  }

  sessionStorage.setItem('introSeen',    '1');
  sessionStorage.setItem('introPlaying', '1');

  realLogo.style.opacity = '0';

  const logoDuration    = 700;
  const curtainDuration = 1700;
  const logoEasing      = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const curtainEasing   = 'cubic-bezier(0.16, 1, 0.3, 1)';

  setTimeout(() => {
    // FLIP: big logo → header position
    const startRect = overlayLogo.getBoundingClientRect();
    const finalRect = realLogo.getBoundingClientRect();

    overlayLogo.style.top             = finalRect.top + 'px';
    overlayLogo.style.left            = finalRect.left + 'px';
    overlayLogo.style.width           = finalRect.width + 'px';
    overlayLogo.style.height          = finalRect.height + 'px';
    overlayLogo.style.transformOrigin = 'top left';
    overlayLogo.style.zIndex          = '1002'; // above header (1001) and overlay (999)

    const dx    = startRect.left - finalRect.left;
    const dy    = startRect.top  - finalRect.top;
    const scale = startRect.width / finalRect.width;
    overlayLogo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    overlayLogo.offsetHeight;

    // Lift header above overlay — it becomes part of the animation, not a "reveal"
    if (header) header.style.zIndex = '1001';

    overlayLogo.style.transition = `transform ${logoDuration}ms ${logoEasing}`;
    overlayLogo.style.transform  = 'none';

    overlay.style.transition = `transform ${curtainDuration}ms ${curtainEasing}`;
    overlay.style.transform  = 'translateY(-100%)';

    // Logo lands: show real logo instantly, then remove overlay logo next frame
    setTimeout(() => {
      realLogo.style.opacity = '1';
      requestAnimationFrame(() => overlayLogo.remove());
    }, logoDuration);

    // Curtain done: clean up
    setTimeout(() => {
      overlay.remove();
      if (header) header.style.zIndex = '';
      realLogo.style.opacity = '';
    }, curtainDuration + 50);
  }, 700);
}
