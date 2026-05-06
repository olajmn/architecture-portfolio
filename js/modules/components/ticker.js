/* ============================================================
   5. TICKER — seamless loop
============================================================ */
export function initTicker() {
    const tickerTrack = document.querySelector('.ticker-track');
    if (!tickerTrack) return;
    const spans = tickerTrack.querySelectorAll('span');
    const textW = spans[0].offsetWidth;
    spans[0].style.marginRight = window.innerWidth + 'px';
    const style = document.createElement('style');
    style.textContent = `@keyframes ticker { from { transform: translateX(100vw); } to { transform: translateX(-${textW}px); } }`;
    document.head.appendChild(style);
}