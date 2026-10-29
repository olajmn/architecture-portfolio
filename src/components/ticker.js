// Homepage ticker — seamless scrolling text loop that resumes its
// position correctly after a reload (timing state lives in state.js).

import { getTickerStart, setTickerStart, setTickerWidth } from "../state.js";

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
