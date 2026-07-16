/* ============================================================
   5. TICKER — seamless loop
============================================================ */
import { getTickerStart, setTickerStart, setTickerWidth } from "../../appState.js";

export function initTicker() {
    const tickerTrack = document.querySelector('.ticker-track');
    if (!tickerTrack) return;
    const spans = tickerTrack.querySelectorAll('span');
    const textW = spans[0].offsetWidth;
    tickerTrack.style.setProperty('--ticker-end', `-${textW}px`);
    setTickerWidth(textW);

    const durationSec = parseFloat(getComputedStyle(tickerTrack).animationDuration) || 50;
    let start = getTickerStart();
    if (!start) {
        start = Date.now();
        setTickerStart(start);
    }
    const elapsed = ((Date.now() - start) / 1000) % durationSec;
    tickerTrack.style.setProperty('--ticker-delay', `-${elapsed}s`);
}